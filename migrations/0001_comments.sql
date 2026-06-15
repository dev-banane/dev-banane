CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  ip_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_comments_status_id ON comments (status, id DESC);
CREATE INDEX IF NOT EXISTS idx_comments_ip_created ON comments (ip_hash, created_at);
