/* Deployed separately from the main site (see ../../../wrangler.jsonc). Probes
 * every endpoint declared in src/data/projects.ts and records the result in D1,
 * which /api/uptime then reads. Runs once per cron trigger (every minute).
 */
import { monitors } from '../../../src/data/projects'

interface UptimeEnv {
	DB: D1Database
}

const TIMEOUT_MS = 10_000
const RAW_RETENTION_HOURS = 48
const HOURLY_RETENTION_DAYS = 90

type ProbeResult = {
	monitor: string
	ok: boolean
	statusCode: number | null
	latencyMs: number
	error: string | null
}

async function probe(monitor: string, url: string): Promise<ProbeResult> {
	const started = Date.now()
	try {
		const res = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			signal: AbortSignal.timeout(TIMEOUT_MS),
			headers: {
				'user-agent': 'devjakob-uptime/1.0 (+https://devjakob.com/uptime)',
				accept: 'text/html,*/*',
			},
			cf: { cacheTtl: 0 },
		})
		return {
			monitor,
			ok: res.status < 400,
			statusCode: res.status,
			latencyMs: Date.now() - started,
			error: res.status < 400 ? null : `HTTP ${res.status}`,
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		return {
			monitor,
			ok: false,
			statusCode: null,
			latencyMs: Date.now() - started,
			error: message.slice(0, 200),
		}
	}
}

function statements(env: UptimeEnv, results: ProbeResult[], at: Date) {
	const checkedAt = at.toISOString()
	const hour = checkedAt.slice(0, 13)

	const insert = env.DB.prepare(
		`INSERT INTO uptime_checks (monitor, checked_at, ok, status_code, latency_ms, error)
		 VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
	)

	const rollup = env.DB.prepare(
		`INSERT INTO uptime_hourly (monitor, hour, checks, ok_checks, latency_sum, latency_count, latency_max)
		 VALUES (?1, ?2, 1, ?3, ?4, ?5, ?6)
		 ON CONFLICT(monitor, hour) DO UPDATE SET
		   checks = checks + 1,
		   ok_checks = ok_checks + excluded.ok_checks,
		   latency_sum = latency_sum + excluded.latency_sum,
		   latency_count = latency_count + excluded.latency_count,
		   latency_max = MAX(COALESCE(uptime_hourly.latency_max, 0), COALESCE(excluded.latency_max, 0))`
	)

	return results.flatMap((r) => {
		const okInt = r.ok ? 1 : 0
		const latency = r.ok ? r.latencyMs : null
		return [
			insert.bind(r.monitor, checkedAt, okInt, r.statusCode, r.latencyMs, r.error),
			rollup.bind(r.monitor, hour, okInt, latency ?? 0, latency === null ? 0 : 1, latency),
		]
	})
}

async function runPass(env: UptimeEnv): Promise<void> {
	const results = await Promise.all(monitors.map((m) => probe(m.slug, m.url)))
	await env.DB.batch(statements(env, results, new Date()))

	const down = results.filter((r) => !r.ok)
	if (down.length) {
		console.warn(`[uptime] down: ${down.map((r) => `${r.monitor} (${r.error})`).join(', ')}`)
	}
}

async function prune(env: UptimeEnv): Promise<void> {
	await env.DB.batch([
		env.DB.prepare(`DELETE FROM uptime_checks WHERE checked_at < datetime('now', ?1)`).bind(
			`-${RAW_RETENTION_HOURS} hours`
		),
		env.DB.prepare(`DELETE FROM uptime_hourly WHERE hour < strftime('%Y-%m-%dT%H', 'now', ?1)`).bind(
			`-${HOURLY_RETENTION_DAYS} days`
		),
	])
}

async function tick(env: UptimeEnv): Promise<void> {
	await runPass(env)

	if (new Date().getUTCMinutes() < 1) await prune(env)
}

export default {
	async scheduled(
		_event: unknown,
		env: UptimeEnv,
		ctx: { waitUntil(promise: Promise<unknown>): void }
	) {
		ctx.waitUntil(tick(env))
	},
}
