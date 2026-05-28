-- ══════════════════════════════════════════════════════
--  CriticalMinds — Supabase Database Schema
--  Run this SQL in your Supabase SQL Editor
-- ══════════════════════════════════════════════════════

-- ── 1. Projects table (for student project uploads) ──
CREATE TABLE IF NOT EXISTS projects (
  id              BIGSERIAL PRIMARY KEY,
  student_name    TEXT NOT NULL,
  class           TEXT,
  project_title   TEXT NOT NULL,
  project_type    TEXT DEFAULT 'presentation',
  drive_link      TEXT,
  video_link      TEXT,
  description     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Reflections table (for final reflection forms) ──
CREATE TABLE IF NOT EXISTS reflections (
  id              BIGSERIAL PRIMARY KEY,
  student_name    TEXT NOT NULL,
  class           TEXT,
  what_learned    TEXT,
  how_improved    TEXT,
  what_difficult  TEXT,
  most_useful     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Quiz results table (optional — to save quiz scores) ──
CREATE TABLE IF NOT EXISTS quiz_results (
  id              BIGSERIAL PRIMARY KEY,
  student_name    TEXT,
  class           TEXT,
  score           INTEGER,
  total           INTEGER,
  percentage      NUMERIC(5,2),
  answers         JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. Enable Row Level Security ──
ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- ── 5. Allow anyone to INSERT (students submit without login) ──
CREATE POLICY "Allow public insert on projects"
  ON projects FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on reflections"
  ON reflections FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on quiz_results"
  ON quiz_results FOR INSERT
  TO anon
  WITH CHECK (true);

-- ── 6. Allow anyone to SELECT (read the gallery) ──
CREATE POLICY "Allow public select on projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public select on reflections"
  ON reflections FOR SELECT
  TO anon
  USING (true);

-- ══════════════════════════════════════════════════════
--  DONE! Your tables are ready.
--  Go to Supabase Dashboard → Table Editor to verify.
-- ══════════════════════════════════════════════════════
