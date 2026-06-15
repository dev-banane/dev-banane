ALTER TABLE comments ADD COLUMN fp_hash TEXT;
CREATE INDEX IF NOT EXISTS idx_comments_fp ON comments (fp_hash);
CREATE INDEX IF NOT EXISTS idx_comments_ip_all ON comments (ip_hash);
