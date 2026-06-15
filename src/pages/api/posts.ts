import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getCommentsSalt } from '../../lib/salt';

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

async function readStats(db: D1Database, slug: string): Promise<StatsRow> {
  const row = await db
    .prepare(`SELECT slug, views, upvotes, downvotes FROM post_stats WHERE slug = ?1`)
    .bind(slug)
    .first<StatsRow>();
  return row ?? { slug, views: 0, upvotes: 0, downvotes: 0 };
}

export const GET: APIRoute = async ({ request, url }) => {
  const db = env.DB;
  const slug = url.searchParams.get('slug') ?? '';
  if (!db || !SLUG_RE.test(slug)) {
    return Response.json({ views: 0, upvotes: 0, downvotes: 0, myVote: 0 });
  }

  try {
    const salt = getCommentsSalt(env);
    if (!salt) {
      return Response.json({ views: 0, upvotes: 0, downvotes: 0, myVote: 0 });
    }

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
    const myVoteRow = await db
      .prepare(`SELECT vote FROM post_votes WHERE slug = ?1 AND ip_hash = ?2`)
      .bind(slug, ipHash)
      .first<{ vote: number }>();

    return Response.json({ ...stats, myVote: myVoteRow?.vote ?? 0 });
  } catch {
    return Response.json({ views: 0, upvotes: 0, downvotes: 0, myVote: 0 });
  }
};

export const POST: APIRoute = async ({ request }) => {
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

    const salt = getCommentsSalt(env);
    if (!salt) {
      return Response.json({ error: 'Voting not configured.' }, { status: 503 });
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
    const ipHash = await hashIp(ip, salt);

    const prevRow = await db
      .prepare(`SELECT vote FROM post_votes WHERE slug = ?1 AND ip_hash = ?2`)
      .bind(slug, ipHash)
      .first<{ vote: number }>();
    const prev = prevRow?.vote ?? 0;

    const upDelta = (vote === 1 ? 1 : 0) - (prev === 1 ? 1 : 0);
    const downDelta = (vote === -1 ? 1 : 0) - (prev === -1 ? 1 : 0);

    const statements = [
      db
        .prepare(
          `INSERT INTO post_stats (slug, upvotes, downvotes)
           VALUES (?1, MAX(?2, 0), MAX(?3, 0))
           ON CONFLICT(slug) DO UPDATE SET
             upvotes = MAX(upvotes + ?2, 0),
             downvotes = MAX(downvotes + ?3, 0)`
        )
        .bind(slug, upDelta, downDelta),
    ];

    if (vote === 0) {
      statements.push(
        db.prepare(`DELETE FROM post_votes WHERE slug = ?1 AND ip_hash = ?2`).bind(slug, ipHash)
      );
    } else {
      statements.push(
        db
          .prepare(
            `INSERT INTO post_votes (slug, ip_hash, vote) VALUES (?1, ?2, ?3)
             ON CONFLICT(slug, ip_hash) DO UPDATE SET vote = ?3`
          )
          .bind(slug, ipHash, vote)
      );
    }

    await db.batch(statements);

    const stats = await readStats(db, slug);
    return Response.json({ ok: true, ...stats, myVote: vote });
  } catch {
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
};
