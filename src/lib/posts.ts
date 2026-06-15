import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

const MEDIA_BASE = (
  import.meta.env.PUBLIC_MEDIA_URL ?? 'https://media.devjakob.com'
).replace(/\/$/, '');
const POSTS_PATH = (
  import.meta.env.PUBLIC_POSTS_PATH ?? 'posts'
).replace(/^\/|\/$/g, '');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

export type PostContent = {
  title?: string;
  date?: string;
  html: string;
};

type R2Bucket = {
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    objects: { key: string }[];
    truncated: boolean;
    cursor?: string;
  }>;
  get(key: string): Promise<{ text(): Promise<string> } | null>;
};

export function resolvePostMediaUrl(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('//')) return trimmed;

  const path = trimmed.replace(/^\.\//, '').replace(/^\//, '');
  if (path.startsWith(`${POSTS_PATH}/`)) return `${MEDIA_BASE}/${path}`;
  return `${MEDIA_BASE}/${POSTS_PATH}/${path}`;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line
      .slice(colon + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    meta[key] = value;
  }

  return { meta, body: match[2] };
}

function preserveExtraBlankLines(body: string): string {
  return body.replace(/\n\n(\n+)/g, (_match, extra: string) => {
    const spacers = '<p class="md-gap" aria-hidden="true">&nbsp;</p>\n\n'.repeat(extra.length);
    return `\n\n${spacers}`;
  });
}

function enhanceImages(html: string): string {
  return html.replace(/<img([^>]*)\ssrc="([^"]+)"([^>]*)>/gi, (_match, before, src, after) => {
    const resolved = resolvePostMediaUrl(src);
    const attrs = `${before} src="${resolved}"${after}`;
    if (/\bloading=/.test(attrs)) return `<img${attrs}>`;
    return `<img${attrs} loading="lazy" decoding="async">`;
  });
}

async function renderMarkdown(body: string): Promise<string> {
  const prepared = preserveExtraBlankLines(body.replace(/^\n+/, ''));
  const html = await marked.parse(prepared);
  return enhanceImages(html);
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function postKey(filename: string): string {
  const name = filename.replace(/\.md$/i, '');
  return `${POSTS_PATH}/${name}.md`;
}

function postFilenameCandidates(
  slug: string,
  opts?: { title?: string }
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of [slug, opts?.title ? slugifyTitle(opts.title) : '']) {
    const name = String(raw ?? '').trim().replace(/\.md$/i, '');
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  return out;
}

function sortPosts(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function metaFromFrontmatter(slug: string, meta: Record<string, string>): PostMeta {
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? '',
  };
}

async function postFromRaw(raw: string): Promise<PostContent> {
  const { meta, body } = parseFrontmatter(raw);
  const html = await renderMarkdown(body);
  return { title: meta.title, date: meta.date, html };
}

export async function fetchPostList(bucket?: R2Bucket): Promise<PostMeta[]> {
  if (!bucket) return [];

  const prefix = `${POSTS_PATH}/`;
  const posts: PostMeta[] = [];
  let cursor: string | undefined;

  try {
    do {
      const listed = await bucket.list({ prefix, cursor });
      for (const obj of listed.objects) {
        if (!obj.key.endsWith('.md')) continue;
        const slug = obj.key.slice(prefix.length).replace(/\.md$/i, '');
        if (!slug || slug.includes('/')) continue;

        const object = await bucket.get(obj.key);
        if (!object) continue;
        const raw = await object.text();
        const { meta } = parseFrontmatter(raw);
        posts.push(metaFromFrontmatter(slug, meta));
      }
      cursor = listed.truncated ? listed.cursor : undefined;
    } while (cursor);
  } catch (err) {
    console.error('[posts] R2 list failed:', err);
    return [];
  }

  return sortPosts(posts);
}

export async function fetchPost(
  slug: string,
  bucket?: R2Bucket,
  opts?: { title?: string }
): Promise<PostContent | null> {
  if (!bucket) return null;

  for (const name of postFilenameCandidates(slug, opts)) {
    const object = await bucket.get(postKey(name));
    if (!object) continue;
    return postFromRaw(await object.text());
  }

  return null;
}
