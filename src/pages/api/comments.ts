import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { verifyTurnstileToken } from '../../lib/turnstile';
import { isTurnstileEnabled, isTruthyFlag } from '../../lib/turnstile-config';
import { moderateText } from '../../lib/moderation';
import { avatarServeUrl, isValidAvatarKey, resolveAvatarUrl } from '../../lib/avatar';
import { normalizeGithub, normalizeTwitter } from '../../lib/socials';
import { getCommentsSalt } from '../../lib/salt';

export const prerender = false;

const MAX_NAME = 40;
const MAX_BODY = 280;
const MEDIA_BASE = (
  import.meta.env.PUBLIC_MEDIA_URL ?? 'https://media.devjakob.com'
).replace(/\/$/, '');

type CommentRow = {
  id: number;
  name: string;
  body: string;
  created_at: string;
  avatar_url: string | null;
  github: string | null;
  twitter: string | null;
};

async function sha256hex(value: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function mapComment(row: CommentRow) {
  return {
    id: row.id,
    name: row.name,
    body: row.body,
    createdAt: row.created_at,
    avatarUrl: resolveAvatarUrl(row.avatar_url, MEDIA_BASE),
    github: row.github ?? '',
    twitter: row.twitter ?? '',
  };
}

export const GET: APIRoute = async () => {
  const db = env.DB;
  if (!db) return Response.json({ comments: [] });

  try {
    const { results } = await db
      .prepare(
        `SELECT id, name, body, created_at, avatar_url, github, twitter
         FROM comments
         WHERE status = 'approved'
         ORDER BY id DESC LIMIT 50`
      )
      .all<CommentRow>();

    return Response.json({
      comments: results.map(mapComment),
    });
  } catch {
    return Response.json({ comments: [] });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = env.DB;
    if (!db) return Response.json({ error: 'Comments not configured.' }, { status: 503 });

    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const note = String(body.body ?? '').trim();
    const turnstileToken = String(body.turnstileToken ?? '');
    const rawFp = String(body.fingerprint ?? '').trim().slice(0, 128);
    const avatarKey = String(body.avatarKey ?? '').trim();
    const github = normalizeGithub(String(body.github ?? ''));
    const twitter = normalizeTwitter(String(body.twitter ?? ''));

    if (!name || !note) {
      return Response.json({ error: 'Name and note are required.' }, { status: 400 });
    }
    if (name.length > MAX_NAME) {
      return Response.json({ error: 'Name is too long.' }, { status: 400 });
    }
    if (note.length > MAX_BODY) {
      return Response.json({ error: 'Note is too long.' }, { status: 400 });
    }
    if (avatarKey && !isValidAvatarKey(avatarKey)) {
      return Response.json({ error: 'Invalid avatar.' }, { status: 400 });
    }
    if (String(body.github ?? '').trim() && !github) {
      return Response.json({ error: 'Invalid GitHub username.' }, { status: 400 });
    }
    if (String(body.twitter ?? '').trim() && !twitter) {
      return Response.json({ error: 'Invalid Twitter / X username.' }, { status: 400 });
    }

    const avatarUrl = avatarKey ? avatarServeUrl(avatarKey) : '';

    const devMode = isTruthyFlag(env.DISABLE_TURNSTILE);

    const cookieHeader = request.headers.get('Cookie') ?? '';
    if (!devMode && cookieHeader.includes('site_commented=1')) {
      return Response.json({ error: 'You\'ve already left a comment — thanks!' }, { status: 429 });
    }

    const salt = getCommentsSalt(env);
    if (!salt) {
      return Response.json({ error: 'Comments not configured.' }, { status: 503 });
    }
    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    const ipHash = await sha256hex(ip, salt);

    if (isTurnstileEnabled(env)) {
      if (!turnstileToken) {
        return Response.json({ error: 'Verification required.' }, { status: 400 });
      }
      const v = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
      if (!v.success) {
        return Response.json({ error: 'Verification failed. Try again.' }, { status: 403 });
      }
    }

    if (!devMode) {
      const ipSeen = await db
        .prepare(`SELECT 1 FROM comments WHERE ip_hash = ?1 LIMIT 1`)
        .bind(ipHash)
        .first();
      if (ipSeen) {
        return Response.json({ error: 'You\'ve already left a comment — thanks!' }, { status: 429 });
      }
    }

    let fpHash = '';
    if (!devMode && rawFp) {
      fpHash = await sha256hex(rawFp, salt);
      const fpSeen = await db
        .prepare(`SELECT 1 FROM comments WHERE fp_hash = ?1 LIMIT 1`)
        .bind(fpHash)
        .first();
      if (fpSeen) {
        return Response.json({ error: 'You\'ve already left a comment — thanks!' }, { status: 429 });
      }
    }

    if (!devMode) {
      const moderation = await moderateText(
        { accountId: env.CLOUDFLARE_ACCOUNT_ID, apiToken: env.CLOUDFLARE_AI_TOKEN },
        note
      );
      if (!moderation.allowed) {
        return Response.json(
          { error: 'Your note was flagged as inappropriate and was not posted.' },
          { status: 422 }
        );
      }
    }

    const inserted = await db
      .prepare(
        `INSERT INTO comments (name, body, status, ip_hash, fp_hash, avatar_url, github, twitter)
         VALUES (?1, ?2, 'approved', ?3, ?4, ?5, ?6, ?7)
         RETURNING id, name, body, created_at, avatar_url, github, twitter`
      )
      .bind(
        name,
        note,
        ipHash,
        fpHash || null,
        avatarUrl || null,
        github || null,
        twitter || null
      )
      .first<CommentRow>();

    if (!inserted) {
      return Response.json({ error: 'Could not save your note.' }, { status: 500 });
    }

    const headers: Record<string, string> = {};
    if (!devMode) {
      headers['Set-Cookie'] = [
        'site_commented=1',
        'HttpOnly',
        'SameSite=Strict',
        'Max-Age=31536000',
        'Path=/',
      ].join('; ');
    }

    return Response.json(
      {
        ok: true,
        comment: mapComment(inserted),
      },
      { headers }
    );
  } catch (err) {
    console.error('[comments] POST failed:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
};
