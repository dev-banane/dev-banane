CREATE TABLE IF NOT EXISTS votes (
    slug TEXT NOT NULL,
    voter TEXT NOT NULL,
    vote INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (slug, voter)
);

CREATE INDEX IF NOT EXISTS idx_votes_slug ON votes (slug);

INSERT OR IGNORE INTO
    votes (slug, voter, vote, created_at)
SELECT slug, 'ip:' || ip_hash, vote, created_at
FROM post_votes
WHERE
    vote IN (1, -1)
    AND slug NOT LIKE 'view:%';