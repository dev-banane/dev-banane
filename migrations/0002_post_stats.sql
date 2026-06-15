CREATE TABLE IF NOT EXISTS post_stats (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  upvotes INTEGER NOT NULL DEFAULT 0,
  downvotes INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS post_votes (
  slug TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  vote INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (slug, ip_hash)
);

CREATE INDEX IF NOT EXISTS idx_post_votes_slug ON post_votes (slug);
