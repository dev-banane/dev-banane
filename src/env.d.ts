/// <reference types="astro/client" />

interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<unknown>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

interface R2Bucket {
  put(
    key: string,
    value: ArrayBuffer | ReadableStream | string | null | Blob,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  list(options?: { prefix?: string; cursor?: string; limit?: number }): Promise<R2ListResult>;
}

interface R2ListResult {
  objects: { key: string; size?: number }[];
  truncated: boolean;
  cursor?: string;
}

interface R2ObjectBody {
  body: ReadableStream | null;
  httpEtag: string;
  text(): Promise<string>;
  writeHttpMetadata(headers: Headers): void;
}

type Env = {
  DISABLE_TURNSTILE?: string;
  TURNSTILE_SECRET_KEY: string;
  COMMENTS_SALT?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_AI_TOKEN?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  AUTH_SECRET?: string;
  DB: D1Database;
  MEDIA?: R2Bucket;
};

declare module 'cloudflare:workers' {
  export const env: Env;
}

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly PUBLIC_DISABLE_TURNSTILE?: string;
  readonly DISABLE_TURNSTILE?: string;
  readonly PUBLIC_MEDIA_URL?: string;
  readonly PUBLIC_POSTS_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
