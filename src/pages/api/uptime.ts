import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUptimeSummaries, type MonitorSummary } from '../../lib/uptime';

export const prerender = false;

const CACHE_TTL_S = 300;

function edgeCache(): Cache | null {
  return (globalThis as { caches?: { default?: Cache } }).caches?.default ?? null;
}

async function loadAll(db: D1Database, origin: string): Promise<MonitorSummary[]> {
  const cache = edgeCache();
  const key = new Request(`${origin}/api/uptime?__summary`);

  const hit = await cache?.match(key).catch(() => undefined);
  if (hit) return hit.json();

  const all = await getUptimeSummaries(db);
  await cache
    ?.put(
      key,
      Response.json(all, { headers: { 'cache-control': `public, max-age=${CACHE_TTL_S}` } })
    )
    .catch(() => {});
  return all;
}

export const GET: APIRoute = async ({ url }) => {
  const db = env.DB;
  if (!db) return Response.json({ monitors: [] });

  try {
    const all = await loadAll(db, url.origin);
    const wanted = url.searchParams.get('project');
    const monitors = wanted ? all.filter((m) => m.project === wanted) : all;

    return Response.json(
      { monitors },
      {
        headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' },
      }
    );
  } catch {
    return Response.json({ monitors: [] }, { status: 200 });
  }
};
