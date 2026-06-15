const AVATAR_PREFIX = 'portfolio-avatars/';
const AVATAR_KEY_RE =
  /^portfolio-avatars\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpe?g|png|webp|gif)$/i;

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

export function avatarPublicUrl(mediaBase: string, key: string): string {
  return `${mediaBase.replace(/\/$/, '')}/${key}`;
}

export function avatarServeUrl(key: string): string {
  return `/api/avatar/${key}`;
}

export function resolveAvatarUrl(stored: string | null | undefined, mediaBase: string): string {
  if (!stored) return '';
  if (stored.startsWith('/api/avatar/')) return stored;

  const fromBase = avatarKeyFromUrl(mediaBase, stored);
  if (fromBase) return avatarServeUrl(fromBase);

  const match = stored.match(/portfolio-avatars\/[0-9a-f-]{36}\.[a-z0-9]+/i);
  if (match) return avatarServeUrl(match[0]);

  return stored;
}

export function isValidAvatarKey(key: string): boolean {
  return AVATAR_KEY_RE.test(key);
}

export function avatarKeyFromUrl(mediaBase: string, url: string): string {
  const base = mediaBase.replace(/\/$/, '');
  if (!url.startsWith(`${base}/`)) return '';
  const key = url.slice(base.length + 1);
  return isValidAvatarKey(key) ? key : '';
}

type R2Bucket = {
  put(key: string, value: ArrayBuffer | ReadableStream, options?: { httpMetadata?: { contentType: string } }): Promise<unknown>;
};

export async function uploadAvatar(
  bucket: R2Bucket,
  file: File
): Promise<{ key: string; url: string; mediaBase: string } | { error: string }> {
  const mediaBase = (
    import.meta.env.PUBLIC_MEDIA_URL ?? 'https://media.devjakob.com'
  ).replace(/\/$/, '');

  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: 'Use a JPEG, PNG, WebP, or GIF image.' };
  }
  if (file.size > MAX_BYTES) {
    return { error: 'Image must be 2 MB or smaller.' };
  }

  const ext = ALLOWED_TYPES.get(file.type)!;
  const key = `${AVATAR_PREFIX}${crypto.randomUUID()}.${ext}`;
  const bytes = await file.arrayBuffer();

  await bucket.put(key, bytes, {
    httpMetadata: { contentType: file.type },
  });

  return { key, url: avatarServeUrl(key), mediaBase };
}
