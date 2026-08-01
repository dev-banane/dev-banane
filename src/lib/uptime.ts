import { monitors } from '../data/projects';

export const HISTORY_DAYS = 90;

export type UptimeStatus = 'up' | 'degraded' | 'down' | 'unknown';

export type UptimeDay = {
  date: string;
  uptime: number | null;
  avgLatencyMs: number | null;
  checks: number;
};

export type MonitorSummary = {
  slug: string;
  project: string;
  title: string;
  url: string;
  status: UptimeStatus;
  uptime24h: number | null;
  uptime90d: number | null;
  avgLatencyMs: number | null;
  lastCheckedAt: string | null;
  lastStatusCode: number | null;
  days: UptimeDay[];
};

type DayRow = {
  monitor: string;
  day: string;
  checks: number;
  ok_checks: number;
  latency_sum: number;
  latency_count: number;
};

type WindowRow = {
  monitor: string;
  checks: number;
  ok_checks: number;
  latency_sum: number;
  latency_count: number;
};

type LatestRow = {
  monitor: string;
  checked_at: string;
  ok: number;
  status_code: number | null;
};

function pct(ok: number, total: number): number | null {
  if (!total) return null;
  return Math.round((ok / total) * 10000) / 100;
}

function avg(sum: number, count: number): number | null {
  if (!count) return null;
  return Math.round(sum / count);
}

function dayKeys(): string[] {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const keys: string[] = [];
  for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

export async function getUptimeSummaries(db: D1Database): Promise<MonitorSummary[]> {
  const [daily, last24h, latest] = await db.batch<DayRow | WindowRow | LatestRow>([
    db.prepare(
      `SELECT monitor,
              substr(hour, 1, 10) AS day,
              SUM(checks) AS checks,
              SUM(ok_checks) AS ok_checks,
              SUM(latency_sum) AS latency_sum,
              SUM(latency_count) AS latency_count
       FROM uptime_hourly
       WHERE hour >= strftime('%Y-%m-%dT%H', 'now', ?1)
       GROUP BY monitor, day`
    ).bind(`-${HISTORY_DAYS} days`),
    db.prepare(
      `SELECT monitor,
              SUM(checks) AS checks,
              SUM(ok_checks) AS ok_checks,
              SUM(latency_sum) AS latency_sum,
              SUM(latency_count) AS latency_count
       FROM uptime_hourly
       WHERE hour >= strftime('%Y-%m-%dT%H', 'now', '-24 hours')
       GROUP BY monitor`
    ),
    db.prepare(
      `SELECT monitor, checked_at, ok, status_code
       FROM uptime_checks
       WHERE id IN (SELECT MAX(id) FROM uptime_checks GROUP BY monitor)`
    ),
  ]);

  const byDay = new Map<string, DayRow>();
  for (const row of daily.results as DayRow[]) byDay.set(`${row.monitor}:${row.day}`, row);

  const byWindow = new Map<string, WindowRow>();
  for (const row of last24h.results as WindowRow[]) byWindow.set(row.monitor, row);

  const byLatest = new Map<string, LatestRow>();
  for (const row of latest.results as LatestRow[]) byLatest.set(row.monitor, row);

  const keys = dayKeys();

  return monitors.map((monitor) => {
    const days: UptimeDay[] = keys.map((date) => {
      const row = byDay.get(`${monitor.slug}:${date}`);
      if (!row) return { date, uptime: null, avgLatencyMs: null, checks: 0 };
      return {
        date,
        uptime: pct(row.ok_checks, row.checks),
        avgLatencyMs: avg(row.latency_sum, row.latency_count),
        checks: row.checks,
      };
    });

    const totals = days.reduce(
      (acc, d) => {
        if (d.uptime === null) return acc;
        acc.ok += (d.uptime / 100) * d.checks;
        acc.total += d.checks;
        return acc;
      },
      { ok: 0, total: 0 }
    );

    const window = byWindow.get(monitor.slug);
    const last = byLatest.get(monitor.slug);
    const uptime24h = window ? pct(window.ok_checks, window.checks) : null;

    let status: UptimeStatus = 'unknown';
    if (last) {
      if (!last.ok) status = 'down';
      else if (uptime24h !== null && uptime24h < 99.5) status = 'degraded';
      else status = 'up';
    }

    return {
      slug: monitor.slug,
      project: monitor.project,
      title: monitor.label,
      url: monitor.url,
      status,
      uptime24h,
      uptime90d: pct(totals.ok, totals.total),
      avgLatencyMs: window ? avg(window.latency_sum, window.latency_count) : null,
      lastCheckedAt: last?.checked_at ?? null,
      lastStatusCode: last?.status_code ?? null,
      days,
    };
  });
}
