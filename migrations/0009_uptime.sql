CREATE TABLE IF NOT EXISTS uptime_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  monitor TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  ok INTEGER NOT NULL,
  status_code INTEGER,
  latency_ms INTEGER,
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_uptime_checks_monitor_time
  ON uptime_checks (monitor, checked_at);

CREATE TABLE IF NOT EXISTS uptime_hourly (
  monitor TEXT NOT NULL,
  hour TEXT NOT NULL,
  checks INTEGER NOT NULL DEFAULT 0,
  ok_checks INTEGER NOT NULL DEFAULT 0,
  latency_sum INTEGER NOT NULL DEFAULT 0,
  latency_count INTEGER NOT NULL DEFAULT 0,
  latency_max INTEGER,
  PRIMARY KEY (monitor, hour)
);

CREATE INDEX IF NOT EXISTS idx_uptime_hourly_hour ON uptime_hourly (hour);
