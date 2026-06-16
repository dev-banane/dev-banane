import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import {
  isGithubAuthEnabled,
  signSession,
  setSessionCookie,
  OAUTH_STATE_COOKIE,
  type SessionUser,
} from '../../../../lib/auth';

export const prerender = false;

function page(body: string): Response {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head><body style="font-family:system-ui;background:#0b0b0b;color:#eee;display:grid;place-items:center;height:100vh;margin:0">${body}</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

function errorPage(message: string): Response {
  const safe = message.replace(/</g, '&lt;');
  return page(
    `<div style="text-align:center"><p>${safe}</p><button onclick="window.close()" style="margin-top:1rem;padding:.5rem 1rem;border-radius:8px;border:1px solid #444;background:#1a1a1a;color:#eee;cursor:pointer">Close</button></div>`
  );
}

function successPage(user: SessionUser, origin: string): Response {
  const payload = JSON.stringify({ type: 'gh-auth', user }).replace(/</g, '\\u003c');
  const target = JSON.stringify(origin).replace(/</g, '\\u003c');
  return page(
    `<p>Signed in. You can close this window.</p><script>
      (function () {
        try { if (window.opener) window.opener.postMessage(${payload}, ${target}); } catch (e) {}
        window.close();
        setTimeout(function () { location.replace('/'); }, 400);
      })();
    </script>`
  );
}

export const GET: APIRoute = async ({ url, cookies }) => {
  if (!isGithubAuthEnabled(env)) return errorPage('GitHub login is not configured.');

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = cookies.get(OAUTH_STATE_COOKIE)?.value;
  cookies.delete(OAUTH_STATE_COOKIE, { path: '/' });

  if (!code || !state || !savedState || state !== savedState) {
    return errorPage('Login session expired. Please try again.');
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID!.trim(),
        client_secret: env.GITHUB_CLIENT_SECRET!.trim(),
        code,
        redirect_uri: `${url.origin}/api/auth/github/callback`,
      }),
    });
    const tokenJson = (await tokenRes.json().catch(() => null)) as
      | { access_token?: string }
      | null;
    const accessToken = tokenJson?.access_token;
    if (!accessToken) return errorPage('Could not complete GitHub login.');

    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'dev-banane',
        Accept: 'application/vnd.github+json',
      },
    });
    const gh = (await userRes.json().catch(() => null)) as
      | { id?: number; login?: string; name?: string; avatar_url?: string }
      | null;
    if (!gh?.id) return errorPage('Could not read your GitHub profile.');

    const user: SessionUser = {
      id: String(gh.id),
      login: String(gh.login ?? ''),
      name: String(gh.name ?? gh.login ?? ''),
      avatar: String(gh.avatar_url ?? ''),
      provider: 'github',
    };

    const token = await signSession(user, env.AUTH_SECRET!.trim());
    setSessionCookie(cookies, token, url.protocol === 'https:');

    return successPage(user, url.origin);
  } catch {
    return errorPage('Something went wrong during sign-in. Please try again.');
  }
};
