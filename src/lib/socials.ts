const GITHUB_USER_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
const TWITTER_USER_RE = /^[A-Za-z0-9_]{1,15}$/;

export function normalizeGithub(value: string): string {
  const raw = value.trim();
  if (!raw) return '';

  const fromUrl = raw.match(/github\.com\/([A-Za-z0-9-]+)/i);
  const user = (fromUrl?.[1] ?? raw.replace(/^@/, '')).trim();
  return GITHUB_USER_RE.test(user) ? user : '';
}

export function normalizeTwitter(value: string): string {
  const raw = value.trim();
  if (!raw) return '';

  const fromUrl = raw.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)/i);
  const user = (fromUrl?.[1] ?? raw.replace(/^@/, '')).trim();
  return TWITTER_USER_RE.test(user) ? user : '';
}

export function githubUrl(username: string): string {
  return `https://github.com/${username}`;
}

export function twitterUrl(username: string): string {
  return `https://x.com/${username}`;
}
