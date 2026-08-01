import { resolveAvatarUrl } from './avatar';

const SLUG_RE = /^[a-z0-9-]{1,64}$/;

export const MEDIA_BASE = (
  import.meta.env.PUBLIC_MEDIA_URL ?? 'https://media.devjakob.com'
).replace(/\/$/, '');

export const INITIAL_COMMENT_LIMIT = 3;

export type CommentRow = {
  id: number;
  name: string;
  body: string;
  created_at: string;
  avatar_url: string | null;
  github: string | null;
  twitter: string | null;
  ip_hash: string | null;
};

export type Comment = {
  id: number;
  name: string;
  body: string;
  createdAt: string;
  avatarUrl: string;
  github: string;
  twitter: string;
  canDelete: boolean;
};

export function isValidSlug(slug: string): boolean {
  return slug === '' || SLUG_RE.test(slug);
}

export function mapComment(row: CommentRow, viewerKey: string | null): Comment {
  return {
    id: row.id,
    name: row.name,
    body: row.body,
    createdAt: row.created_at.replace(' ', 'T') + 'Z',
    avatarUrl: resolveAvatarUrl(row.avatar_url, MEDIA_BASE),
    github: row.github ?? '',
    twitter: row.twitter ?? '',
    canDelete: viewerKey !== null && row.ip_hash === viewerKey,
  };
}

export async function fetchCommentRows(
  db: D1Database | undefined,
  slug: string
): Promise<CommentRow[]> {
  if (!db || !isValidSlug(slug)) return [];
  try {
    const { results } = await db
      .prepare(
        `SELECT id, name, body, created_at, avatar_url, github, twitter, ip_hash
         FROM comments
         WHERE status = 'approved' AND slug = ?1
         ORDER BY id DESC LIMIT 50`
      )
      .bind(slug)
      .all<CommentRow>();
    return results;
  } catch {
    return [];
  }
}

export async function fetchComments(
  db: D1Database | undefined,
  slug: string,
  viewerKey: string | null = null
): Promise<Comment[]> {
  const rows = await fetchCommentRows(db, slug);
  return rows.map((row) => mapComment(row, viewerKey));
}

export function timeAgo(iso: string, now = Date.now()): string {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return '';
  const mins = Math.floor(Math.max(0, now - d) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function initials(name: string): string {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join('');
}
