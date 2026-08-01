import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUptimeSummaries } from '../../lib/uptime';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const db = env.DB;
  if (!db) return Response.json({ monitors: [] });

  try {
    const all = await getUptimeSummaries(db);
    const wanted = url.searchParams.get('project');
    const monitors = wanted ? all.filter((m) => m.project === wanted) : all;

    return Response.json(
      { monitors },
      {
        headers: { 'cache-control': 'public, max-age=15, stale-while-revalidate=60' },
      }
    );
  } catch {
    return Response.json({ monitors: [] }, { status: 200 });
  }
};
