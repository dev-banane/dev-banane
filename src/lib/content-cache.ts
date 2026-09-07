import { env } from 'cloudflare:workers';

type KVNamespace = {
  get(key: string, options?: { cacheTtl?: number }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; cursor?: string }): Promise<{
    keys: { name: string }[];
    list_complete: boolean;
    cursor?: string;
  }>;
};

const NAMESPACE = 'content:v1';
const MEMO_TTL_MS = 15_000;
const HIT_TTL_S = 300;
const MISS_TTL_S = 60;

type Envelope<T> = { v: T | null };

const memo = new Map<string, { at: number; value: unknown }>();
const inflight = new Map<string, Promise<unknown>>();

function kv(): KVNamespace | undefined {
  return (env as { CONTENT_CACHE?: KVNamespace }).CONTENT_CACHE;
}

export async function readThrough<T>(key: string, load: () => Promise<T | null>): Promise<T | null> {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < MEMO_TTL_MS) return hit.value as T | null;

  const pending = inflight.get(key);
  if (pending) return (await pending) as T | null;

  const work = resolve(key, load);
  inflight.set(key, work);
  try {
    return await work;
  } finally {
    inflight.delete(key);
  }
}

async function resolve<T>(key: string, load: () => Promise<T | null>): Promise<T | null> {
  const store = kv();
  const kvKey = `${NAMESPACE}:${key}`;

  if (store) {
    try {
      const raw = await store.get(kvKey, { cacheTtl: HIT_TTL_S });
      if (raw !== null) {
        const value = (JSON.parse(raw) as Envelope<T>).v;
        memo.set(key, { at: Date.now(), value });
        return value;
      }
    } catch (err) {
      console.error('[content-cache] KV read failed:', key, err);
    }
  }

  const value = await load();
  memo.set(key, { at: Date.now(), value });

  if (store) {
    const envelope: Envelope<T> = { v: value };
    store
      .put(kvKey, JSON.stringify(envelope), {
        expirationTtl: value === null ? MISS_TTL_S : HIT_TTL_S,
      })
      .catch((err: unknown) => console.error('[content-cache] KV write failed:', key, err));
  }

  return value;
}

export async function purgeContentCache(): Promise<number> {
  memo.clear();

  const store = kv();
  if (!store) return 0;

  let purged = 0;
  let cursor: string | undefined;

  do {
    const listed = await store.list({ prefix: `${NAMESPACE}:`, cursor });
    await Promise.all(listed.keys.map((entry) => store.delete(entry.name)));
    purged += listed.keys.length;
    cursor = listed.list_complete ? undefined : listed.cursor;
  } while (cursor);

  return purged;
}
