-- =====================================================================
-- Seed 11 Student Accounts & Mock Data (Bcrypt Safe Version)
-- Run this in the Supabase SQL Editor to populate the database
-- =====================================================================

DO $$
DECLARE
  target_pass TEXT;
BEGIN
  -- 1. Use the verified bcrypt hash of 'demo1234' (cost factor 10)
  target_pass := '$2a$10$.CfnVLuaRJSchfgGd2pc0OUuNlB1vf5SmkGky5QJgWbf9V7Qd1R6i';

  -- 2. Force reset password for default admin and student to ensure they work too
  UPDATE auth.users
  SET encrypted_password = target_pass
  WHERE email IN ('admin@criticalminds.edu', 'student@criticalminds.edu');

  -- 3. Clean old seeded student references first to avoid foreign key errors
  DELETE FROM public.quiz_results WHERE student_id IN (
    SELECT id FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu')
  );
  DELETE FROM public.error_journals WHERE student_id IN (
    SELECT id FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu')
  );
  DELETE FROM public.projects WHERE student_id IN (
    SELECT id FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu')
  );
  DELETE FROM public.reflections WHERE student_id IN (
    SELECT id FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu')
  );
  DELETE FROM public.challenge_submissions WHERE student_id IN (
    SELECT id FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu')
  );

  -- 4. Clear old seeded students
  DELETE FROM auth.users WHERE email LIKE '%@criticalminds.edu' AND email NOT IN ('admin@criticalminds.edu', 'student@criticalminds.edu');

  -- 5. Insert into auth.users (Trigger will automatically create corresponding profiles)
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    is_sso_user
  ) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'elnara@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Абдинур Эльнара","role":"student","class":"10A"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'adina@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Алиева Адина","role":"student","class":"10A"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'nursultan@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Асанбек Нурсултан","role":"student","class":"10A"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bibihadisha@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Аскаркызы Бибихадиша","role":"student","class":"10A"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'shahmardan@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Ахан Шахмардан","role":"student","class":"10A"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'kassiyet@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Әбдібек Қасиет","role":"student","class":"10B"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'assyl@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Әлжаппарова Асыл","role":"student","class":"10B"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bibarys@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Әшірбек Бибарыс","role":"student","class":"10B"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'gaukhar@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Базарбай Гаухар","role":"student","class":"10B"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'abdirazaq@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Ділман Әбдіразақ","role":"student","class":"10B"}'::jsonb, now(), now(), false),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'mustafa@criticalminds.edu', target_pass, now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"full_name":"Ермурат Мустафа","role":"student","class":"10B"}'::jsonb, now(), now(), false);

END $$;

-- 6. Update profiles table with corresponding class metadata
UPDATE public.profiles SET class = '10A' WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000005'
);
UPDATE public.profiles SET class = '10B' WHERE id IN (
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000011'
);

-- 7. Insert fake Quiz Results
INSERT INTO public.quiz_results (student_id, quiz_id, score, total, percentage, completed_at) VALUES
('00000000-0000-0000-0000-000000000001', 1, 4, 4, 100.00, now() - interval '3 days'),
('00000000-0000-0000-0000-000000000001', 2, 3, 3, 100.00, now() - interval '2 days'),
('00000000-0000-0000-0000-000000000002', 1, 3, 4, 75.00, now() - interval '4 days'),
('00000000-0000-0000-0000-000000000002', 2, 2, 3, 66.67, now() - interval '3 days'),
('00000000-0000-0000-0000-000000000003', 1, 4, 4, 100.00, now() - interval '1 day'),
('00000000-0000-0000-0000-000000000004', 1, 3, 4, 75.00, now() - interval '5 days'),
('00000000-0000-0000-0000-000000000005', 1, 4, 4, 100.00, now() - interval '2 days'),
('00000000-0000-0000-0000-000000000006', 1, 3, 4, 75.00, now() - interval '4 days'),
('00000000-0000-0000-0000-000000000007', 1, 4, 4, 100.00, now() - interval '2 days'),
('00000000-0000-0000-0000-000000000008', 2, 3, 3, 100.00, now() - interval '1 day'),
('00000000-0000-0000-0000-000000000009', 1, 3, 4, 75.00, now() - interval '3 days'),
('00000000-0000-0000-0000-000000000010', 1, 4, 4, 100.00, now() - interval '2 days'),
('00000000-0000-0000-0000-000000000011', 2, 2, 3, 66.67, now() - interval '2 days');

-- 8. Insert Error Journal Entries
INSERT INTO public.error_journals (student_id, error_text, correction, reason, what_learned, created_at) VALUES
('00000000-0000-0000-0000-000000000002', 'I didn''t went to school yesterday.', 'I didn''t go to school yesterday.', 'I used past tense after auxiliary didn''t instead of base form.', 'Always use infinitive without to after did/didn''t.', now() - interval '4 days'),
('00000000-0000-0000-0000-000000000004', 'She is more tall than me.', 'She is taller than me.', 'Incorrect comparative form of short adjective.', 'Use -er suffix for single syllable adjectives.', now() - interval '5 days'),
('00000000-0000-0000-0000-000000000006', 'I am student.', 'I am a student.', 'Omitted indefinite article before singular countable noun.', 'Always use a/an before singular countable professions.', now() - interval '4 days'),
('00000000-0000-0000-0000-000000000009', 'We discussed about the problem.', 'We discussed the problem.', 'Used preposition ''about'' after transitive verb discuss.', 'Discuss takes a direct object without preposition.', now() - interval '3 days');

-- 9. Insert Projects (Referencing the copied media files in public/img-video/)
INSERT INTO public.projects (student_id, title, project_type, drive_link, video_link, description, feedback, grade, created_at) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Critical Thinking Mindmap: Unit 1',
  'infographic',
  '/img-video/3.jpeg',
  NULL,
  'A detailed mindmap highlighting key arguments from family relationships and digital interactions.',
  'Excellent visual structure and logical flow.',
  'A',
  now() - interval '3 days'
),
(
  '00000000-0000-0000-0000-000000000002',
  'Healthy Food vs Junk Food Video Analysis',
  'video',
  NULL,
  '/img-video/5.mp4',
  'A spoken explanation with dynamic slides exploring the nutritional science of fast foods.',
  'Great energy and pronunciation. Good slide visuals.',
  'A+',
  now() - interval '2 days'
),
(
  '00000000-0000-0000-0000-000000000003',
  'Speaking Assessment: Peer Pressure Discussion',
  'video',
  NULL,
  '/img-video/6.mp4',
  'A recorded conversation presenting arguments for resisting negative social influences.',
  'Great vocabulary choice and fluent delivery.',
  'A',
  now() - interval '1 day'
),
(
  '00000000-0000-0000-0000-000000000004',
  'Family Relationships Infographic',
  'infographic',
  '/img-video/WhatsApp Image 2026-05-29 at 16.19.32.jpeg',
  NULL,
  'Visualizing conflict resolution steps and healthy communication patterns inside the home.',
  'Nicely organized layout and clean text.',
  'A+',
  now() - interval '5 days'
),
(
  '00000000-0000-0000-0000-000000000005',
  'Digital Literacy & Screen Time Concept Map',
  'infographic',
  '/img-video/WhatsApp Image 2026-05-29 at 219.32.jpeg',
  NULL,
  'Analyzing the effects of excessive technology use on reading comprehension and focus.',
  'Clear connections between nodes. Good critical analysis.',
  'A',
  now() - interval '2 days'
);

-- 10. Insert Reflections
INSERT INTO public.reflections (student_id, what_learned, how_improved, what_difficult, most_useful, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'I learned to analyze peer reviews and structure my arguments logically.', 'My speaking confidence improved significantly after recording.', 'Explaining grammar mistakes in detail was challenging.', 'The Error Journal was extremely useful.', now() - interval '3 days'),
('00000000-0000-0000-0000-000000000002', 'Learned about food labels and healthy nutrition ratios.', 'Improved my presentation structure.', 'Editing the audio was hard.', 'Video tasks helped me express my thoughts.', now() - interval '2 days'),
('00000000-0000-0000-0000-000000000003', 'I learned how to resist group pressure and stand up for my ideas.', 'My critical reasoning skills grew.', 'Finding facts in the texts was hard.', 'The debate exercises.', now() - interval '1 day');
