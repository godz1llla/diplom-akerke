-- ══════════════════════════════════════════════════════════════
--  CriticalMinds — Full Database Schema v2
--  Run this in Supabase SQL Editor (replaces previous schema)
-- ══════════════════════════════════════════════════════════════

-- ── 1. User Profiles (extends Supabase Auth) ──────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  class       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Reading Texts ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS texts (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  source      TEXT,
  level       TEXT DEFAULT 'intermediate' CHECK (level IN ('beginner','intermediate','advanced')),
  topic       TEXT,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Quizzes ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  text_id     BIGINT REFERENCES texts(id),
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. Quiz Questions ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id            BIGSERIAL PRIMARY KEY,
  quiz_id       BIGINT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a      TEXT NOT NULL,
  option_b      TEXT NOT NULL,
  option_c      TEXT NOT NULL,
  option_d      TEXT NOT NULL,
  correct       TEXT NOT NULL CHECK (correct IN ('a','b','c','d')),
  explanation   TEXT,
  order_num     INTEGER DEFAULT 0
);

-- ── 5. Quiz Results ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_results (
  id            BIGSERIAL PRIMARY KEY,
  student_id    UUID NOT NULL REFERENCES profiles(id),
  quiz_id       BIGINT NOT NULL REFERENCES quizzes(id),
  score         INTEGER NOT NULL,
  total         INTEGER NOT NULL,
  percentage    NUMERIC(5,2),
  answers       JSONB,
  completed_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. Error Journal Entries ──────────────────────────────────
CREATE TABLE IF NOT EXISTS error_journals (
  id             BIGSERIAL PRIMARY KEY,
  student_id     UUID NOT NULL REFERENCES profiles(id),
  quiz_result_id BIGINT REFERENCES quiz_results(id),
  error_text     TEXT NOT NULL,
  correction     TEXT NOT NULL,
  reason         TEXT,
  what_learned   TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. Projects (student uploads) ────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id             BIGSERIAL PRIMARY KEY,
  student_id     UUID REFERENCES profiles(id),
  title          TEXT NOT NULL,
  project_type   TEXT DEFAULT 'presentation',
  drive_link     TEXT,
  video_link     TEXT,
  description    TEXT,
  feedback       TEXT,
  grade          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 8. Reflections ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reflections (
  id             BIGSERIAL PRIMARY KEY,
  student_id     UUID NOT NULL REFERENCES profiles(id),
  what_learned   TEXT,
  how_improved   TEXT,
  what_difficult TEXT,
  most_useful    TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. Challenge Submissions ──────────────────────────────────
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id             BIGSERIAL PRIMARY KEY,
  student_id     UUID NOT NULL REFERENCES profiles(id),
  topic          TEXT NOT NULL,
  video_link     TEXT,
  description    TEXT,
  week           INTEGER DEFAULT 1 CHECK (week IN (1,2)),
  feedback       TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════

ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE texts                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results          ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_journals        ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections           ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;

-- profiles: users see own profile, admins see all
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow profile creation on signup
CREATE POLICY "Allow profile insert on signup"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- texts: all authenticated users can read
CREATE POLICY "Authenticated users read texts"
  ON texts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage texts"
  ON texts FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- quizzes & questions: all authenticated users can read
CREATE POLICY "Authenticated users read quizzes"
  ON quizzes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage quizzes"
  ON quizzes FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users read questions"
  ON quiz_questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage questions"
  ON quiz_questions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- quiz_results: students see own, admins see all
CREATE POLICY "Students see own results"
  ON quiz_results FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own results"
  ON quiz_results FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins see all results"
  ON quiz_results FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- error_journals
CREATE POLICY "Students manage own journal"
  ON error_journals FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Admins read all journals"
  ON error_journals FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- projects
CREATE POLICY "Students manage own projects"
  ON projects FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Admins manage all projects"
  ON projects FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- reflections
CREATE POLICY "Students manage own reflections"
  ON reflections FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Admins read all reflections"
  ON reflections FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- challenge_submissions
CREATE POLICY "Students manage own challenges"
  ON challenge_submissions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Admins manage all challenges"
  ON challenge_submissions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ══════════════════════════════════════════════════════════════
-- TRIGGER: auto-create profile on auth.users insert
-- ══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ══════════════════════════════════════════════════════════════
-- SEED DATA: Sample texts and quizzes for demo
-- ══════════════════════════════════════════════════════════════

INSERT INTO texts (title, content, source, level, topic) VALUES
(
  'Social Media and Teen Mental Health',
  'Social media platforms have become a central part of teenagers'' daily lives. Studies show that excessive social media use can lead to anxiety, depression, and sleep disorders. However, researchers also find that when used mindfully, social media can help teens build community, access information, and express creativity.

A 2023 study by the American Psychological Association found that teens who spend more than 3 hours daily on social media are twice as likely to report poor mental health. Yet the same study noted that passive scrolling was more harmful than active engagement, such as posting, commenting, or joining interest groups.

Critical thinkers ask: Is the platform itself harmful, or is it how we use it? Many experts argue that digital literacy education — teaching young people to recognize misinformation, manage screen time, and build healthy online habits — is the most effective solution.

Discussion questions:
1. How many hours per day do you spend on social media?
2. Do you think social media makes you feel better or worse about yourself?
3. What rules would you create for healthy social media use in schools?',
  'Adapted from American Psychological Association, 2023',
  'intermediate',
  'Social Media'
),
(
  'Technology in the Classroom: Friend or Foe?',
  'The debate over technology in education has intensified with the rise of AI tools like ChatGPT. Some educators celebrate digital tools for personalizing learning, while others worry they encourage cheating and reduce deep thinking.

Finland, consistently ranked among the world''s top education systems, recently reversed its push toward digital-only classrooms. After studies showed declining reading comprehension and attention spans, Finnish schools reintroduced handwriting and physical books alongside technology.

Meanwhile, schools in South Korea and Singapore use AI-powered platforms to identify struggling students before they fall behind. Teachers receive real-time data on student progress, allowing them to intervene early and provide targeted support.

The question is not whether technology belongs in schools — it clearly does. The real question is: how do we use it to develop thinking, not replace it?

Critical thinking challenge: Compare the Finnish and Asian approaches. Which do you think is more effective for developing critical thinking skills? Why?',
  'Adapted from OECD Education at a Glance, 2024',
  'advanced',
  'Technology in Education'
);

INSERT INTO quizzes (title, description) VALUES
(
  'Social Media & Mental Health Quiz',
  'Test your comprehension and critical thinking after reading the Social Media text.'
),
(
  'Technology in Education Quiz',
  'Analyze the key arguments about technology and education.'
);

-- Questions for Quiz 1
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct, explanation, order_num) VALUES
(1, 'According to the 2023 APA study, teens who spend more than 3 hours on social media daily are how much more likely to report poor mental health?',
 'Three times more likely', 'Twice as likely', 'Five times more likely', 'No difference found',
 'b', 'The text states they are "twice as likely to report poor mental health."', 1),

(1, 'What type of social media use was found to be MORE harmful?',
 'Posting original content', 'Joining interest groups', 'Passive scrolling', 'Commenting on friends'' posts',
 'c', 'The study found passive scrolling was more harmful than active engagement like posting or commenting.', 2),

(1, 'What does the author suggest is the MOST effective solution?',
 'Banning social media for teens', 'Limiting phones to 1 hour per day', 'Digital literacy education', 'Creating age-restricted platforms',
 'c', 'The text says "digital literacy education... is the most effective solution."', 3),

(1, 'The critical thinking question in the text asks us to consider:',
 'Whether all social media should be banned', 'Whether the platform or HOW we use it is the problem', 'Which app is most harmful', 'How parents should monitor their children',
 'b', 'The text frames the key question as: "Is the platform itself harmful, or is it how we use it?"', 4);

-- Questions for Quiz 2
INSERT INTO quiz_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct, explanation, order_num) VALUES
(2, 'Why did Finland reverse its push toward digital-only classrooms?',
 'Budget constraints', 'Teacher resistance', 'Declining reading comprehension and attention spans', 'Student complaints',
 'c', 'The text states Finland reversed course "after studies showed declining reading comprehension and attention spans."', 1),

(2, 'What do South Korean and Singaporean schools use AI platforms for?',
 'Grading essays automatically', 'Identifying struggling students before they fall behind', 'Creating digital textbooks', 'Replacing teachers in some subjects',
 'b', 'The text says AI platforms help "identify struggling students before they fall behind."', 2),

(2, 'According to the author, what is the REAL question about technology in schools?',
 'Whether to use technology at all', 'Which devices are most affordable', 'How to use technology to develop thinking, not replace it', 'How to prevent students from cheating',
 'c', 'The final paragraph states: "The real question is: how do we use it to develop thinking, not replace it?"', 3);
