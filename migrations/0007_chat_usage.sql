-- Per-IP daily message counter for the /api/chat endpoint.
CREATE TABLE IF NOT EXISTS chat_usage (
  day TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, ip_hash)
);
