import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { isValidAvatarKey } from '../../../lib/avatar';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const raw = params.path;
  const key = Array.isArray(raw) ? raw.join('/') : raw ?? '';
  if (!isValidAvatarKey(key)) {
    return new Response('Not found', { status: 404 });
  }

  const bucket = env.MEDIA;
  if (!bucket) {
    return new Response('Not configured', { status: 503 });
  }

  const object = await bucket.get(key);
  if (!object) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
};
