ALTER TABLE comments ADD COLUMN slug TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments (slug, status, id DESC);
