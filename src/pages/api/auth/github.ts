import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { isGithubAuthEnabled, randomToken, OAUTH_STATE_COOKIE } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies }) => {
  if (!isGithubAuthEnabled(env)) {
    return new Response('GitHub login is not configured.', { status: 503 });
  }

  const secure = url.protocol === 'https:';
  const state = randomToken();
  cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID!.trim());
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/auth/github/callback`);
  authorize.searchParams.set('scope', 'read:user');
  authorize.searchParams.set('state', state);
  authorize.searchParams.set('allow_signup', 'true');

  return new Response(null, { status: 302, headers: { Location: authorize.toString() } });
};
