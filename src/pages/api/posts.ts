import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getCommentsSalt } from '../../lib/salt';
import { getSessionUser, isGithubAuthEnabled, type SessionUser } from '../../lib/auth';

export const prerender = false;

const SLUG_RE = /^[a-z0-9-]{1,64}$/;

type StatsRow = {
  slug: string;
  views: number;
  upvotes: number;
  downvotes: number;
};

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function voterId(
  request: Request,
  user: SessionUser | null,
  salt: string | null
): Promise<string | null> {
  if (user) return `gh:${user.id}`;
  if (isGithubAuthEnabled(env)) return null;
  if (!salt) return null;
  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
  return `ip:${await hashIp(ip, salt)}`;
}

async function readStats(db: D1Database, slug: string): Promise<StatsRow> {
  const row = await db
    .prepare(`SELECT slug, views, upvotes, downvotes FROM post_stats WHERE slug = ?1`)
    .bind(slug)
    .first<StatsRow>();
  return row ?? { slug, views: 0, upvotes: 0, downvotes: 0 };
}

export const GET: APIRoute = async ({ request, url, cookies }) => {
  const db = env.DB;
  const slug = url.searchParams.get('slug') ?? '';
  const authEnabled = isGithubAuthEnabled(env);
  if (!db || !SLUG_RE.test(slug)) {
    return Response.json({
      views: 0,
      upvotes: 0,
      downvotes: 0,
      myVote: 0,
      signedIn: false,
      authEnabled,
    });
  }

  const salt = getCommentsSalt(env);
  if (!salt) {
    return Response.json(
      { error: 'Service not configured. Set COMMENTS_SALT.' },
      { status: 503 }
    );
  }

  try {
    const user = await getSessionUser(cookies, env);

    // View counting stays anonymous + IP-deduped (no sign-in required).
    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    const ipHash = await hashIp(ip, salt);
    const seen = await db
      .prepare(`SELECT 1 FROM post_votes WHERE slug = ?1 AND ip_hash = ?2`)
      .bind(`view:${slug}`, ipHash)
      .first();

    if (!seen) {
      await db.batch([
        db
          .prepare(
            `INSERT INTO post_stats (slug, views) VALUES (?1, 1)
             ON CONFLICT(slug) DO UPDATE SET views = views + 1`
          )
          .bind(slug),
        db
          .prepare(`INSERT OR IGNORE INTO post_votes (slug, ip_hash, vote) VALUES (?1, ?2, 0)`)
          .bind(`view:${slug}`, ipHash),
      ]);
    }

    const stats = await readStats(db, slug);

    let myVote = 0;
    const voter = await voterId(request, user, salt);
    if (voter) {
      const myVoteRow = await db
        .prepare(`SELECT vote FROM votes WHERE slug = ?1 AND voter = ?2`)
        .bind(slug, voter)
        .first<{ vote: number }>();
      myVote = myVoteRow?.vote ?? 0;
    }

    return Response.json({ ...stats, myVote, signedIn: !!user, authEnabled });
  } catch {
    return Response.json({
      views: 0,
      upvotes: 0,
      downvotes: 0,
      myVote: 0,
      signedIn: false,
      authEnabled,
    });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const db = env.DB;
  if (!db) {
    return Response.json({ error: 'Voting not configured.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const slug = String(body.slug ?? '');
    const vote = Number(body.vote);

    if (!SLUG_RE.test(slug)) {
      return Response.json({ error: 'Invalid post.' }, { status: 400 });
    }
    if (![1, -1, 0].includes(vote)) {
      return Response.json({ error: 'Invalid vote.' }, { status: 400 });
    }

    const user = await getSessionUser(cookies, env);
    if (isGithubAuthEnabled(env) && !user) {
      return Response.json(
        { error: 'Sign in to vote.', code: 'auth' },
        { status: 401 }
      );
    }

    const salt = getCommentsSalt(env);
    if (!salt) {
      return Response.json(
        { error: 'Service not configured. Set COMMENTS_SALT.' },
        { status: 503 }
      );
    }
    const voter = await voterId(request, user, salt);
    if (!voter) {
      return Response.json({ error: 'Voting not configured.' }, { status: 503 });
    }

    const voteStatement =
      vote === 0
        ? db
            .prepare(`DELETE FROM votes WHERE slug = ?1 AND voter = ?2`)
            .bind(slug, voter)
        : db
            .prepare(
              `INSERT INTO votes (slug, voter, vote) VALUES (?1, ?2, ?3)
               ON CONFLICT(slug, voter) DO UPDATE SET vote = ?3`
            )
            .bind(slug, voter, vote);

    await db.batch([
      db
        .prepare(`INSERT INTO post_stats (slug) VALUES (?1) ON CONFLICT(slug) DO NOTHING`)
        .bind(slug),
      voteStatement,
      db
        .prepare(
          `UPDATE post_stats SET
             upvotes = (SELECT COUNT(*) FROM votes WHERE slug = ?1 AND vote = 1),
             downvotes = (SELECT COUNT(*) FROM votes WHERE slug = ?1 AND vote = -1)
           WHERE slug = ?1`
        )
        .bind(slug),
    ]);

    const stats = await readStats(db, slug);
    return Response.json({ ok: true, ...stats, myVote: vote, signedIn: !!user });
  } catch {
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
};
