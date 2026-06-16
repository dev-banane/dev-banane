import type { AstroCookies } from 'astro';

export type SessionUser = {
  id: string;
  login: string;
  name: string;
  avatar: string;
  provider: 'github';
};

type AuthEnv = {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  AUTH_SECRET?: string;
};

export const SESSION_COOKIE = 'gh_session';
export const OAUTH_STATE_COOKIE = 'gh_oauth_state';
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Uint8Array {
  const norm = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = norm.length % 4 === 0 ? '' : '='.repeat(4 - (norm.length % 4));
  const bin = atob(norm + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function randomToken(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return b64urlEncode(arr);
}

export function isGithubAuthEnabled(env: AuthEnv): boolean {
  return Boolean(
    env.GITHUB_CLIENT_ID?.trim() &&
      env.GITHUB_CLIENT_SECRET?.trim() &&
      env.AUTH_SECRET?.trim()
  );
}

export async function signSession(user: SessionUser, secret: string): Promise<string> {
  const payload = b64urlEncode(
    new TextEncoder().encode(JSON.stringify({ ...user, iat: Date.now() }))
  );
  const sig = b64urlEncode(await hmac(secret, payload));
  return `${payload}.${sig}`;
}

export async function verifySession(
  token: string,
  secret: string,
  maxAgeMs = SESSION_MAX_AGE_S * 1000
): Promise<SessionUser | null> {
  const dot = token.indexOf('.');
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = b64urlEncode(await hmac(secret, payload));
  if (!safeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    if (typeof data.iat === 'number' && Date.now() - data.iat > maxAgeMs) return null;
    if (!data.id) return null;
    return {
      id: String(data.id),
      login: String(data.login ?? ''),
      name: String(data.name ?? ''),
      avatar: String(data.avatar ?? ''),
      provider: 'github',
    };
  } catch {
    return null;
  }
}

export async function getSessionUser(
  cookies: AstroCookies,
  env: AuthEnv
): Promise<SessionUser | null> {
  const secret = env.AUTH_SECRET?.trim();
  if (!secret) return null;
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token, secret);
}

export function setSessionCookie(
  cookies: AstroCookies,
  token: string,
  secure: boolean
): void {
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_S,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
