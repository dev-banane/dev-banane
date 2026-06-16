import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSessionUser, isGithubAuthEnabled } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const enabled = isGithubAuthEnabled(env);
  const user = enabled ? await getSessionUser(cookies, env) : null;
  return Response.json(
    { enabled, user },
    { headers: { 'Cache-Control': 'no-store' } }
  );
};
