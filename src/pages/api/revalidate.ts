import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { purgeContentCache } from '../../lib/content-cache';

export const prerender = false;

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const POST: APIRoute = async ({ request }) => {
  const secret = env.REVALIDATE_TOKEN;
  if (!secret) {
    return Response.json(
      { error: 'Revalidation not configured. Set REVALIDATE_TOKEN.' },
      { status: 503 }
    );
  }

  const supplied = (request.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!supplied || !timingSafeEqual(supplied, secret)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const purged = await purgeContentCache();
    return Response.json({ ok: true, purged });
  } catch (err) {
    console.error('[revalidate] purge failed:', err);
    return Response.json({ error: 'Purge failed.' }, { status: 500 });
  }
};
