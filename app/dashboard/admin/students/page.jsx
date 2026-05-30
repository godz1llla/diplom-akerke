'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const MOCK_STUDENTS = [
  {
    email: 'elnara@criticalminds.edu',
    fullName: 'Абдинур Эльнара',
    class: '10A',
    quizzes: [
      { quiz_id: 1, score: 4, total: 4 },
      { quiz_id: 2, score: 3, total: 3 }
    ],
    projects: [
      {
        title: 'Critical Thinking Mindmap: Unit 1',
        project_type: 'infographic',
        drive_link: '/img-video/3.jpeg',
        description: 'A detailed mindmap highlighting key arguments from family relationships and digital interactions.',
        feedback: 'Excellent visual structure and logical flow.',
        grade: 'A'
      }
    ],
    reflections: [
      {
        what_learned: 'I learned to analyze peer reviews and structure my arguments logically.',
        how_improved: 'My speaking confidence improved significantly after recording.',
        what_difficult: 'Explaining grammar mistakes in detail was challenging.',
        most_useful: 'The Error Journal was extremely useful.'
      }
    ]
  },
  {
    email: 'adina@criticalminds.edu',
    fullName: 'Алиева Адина',
    class: '10A',
    quizzes: [
      { quiz_id: 1, score: 3, total: 4 },
      { quiz_id: 2, score: 2, total: 3 }
    ],
    errors: [
      {
        error_text: "I didn't went to school yesterday.",
        correction: "I didn't go to school yesterday.",
        reason: "I used past tense after auxiliary didn't instead of base form.",
        what_learned: "Always use infinitive without to after did/didn't."
      }
    ],
    projects: [
      {
        title: 'Healthy Food vs Junk Food Video Analysis',
        project_type: 'video',
        video_link: '/img-video/5.mp4',
        description: 'A spoken explanation with dynamic slides exploring the nutritional science of fast foods.',
        feedback: 'Great energy and pronunciation. Good slide visuals.',
        grade: 'A+'
      }
    ],
    reflections: [
      {
        what_learned: 'Learned about food labels and healthy nutrition ratios.',
        how_improved: 'Improved my presentation structure.',
        what_difficult: 'Editing the audio was hard.',
        most_useful: 'Video tasks helped me express my thoughts.'
      }
    ]
  },
  {
    email: 'nursultan@criticalminds.edu',
    fullName: 'Асанбек Нурсултан',
    class: '10A',
    quizzes: [
      { quiz_id: 1, score: 4, total: 4 }
    ],
    projects: [
      {
        title: 'Speaking Assessment: Peer Pressure Discussion',
        project_type: 'video',
        video_link: '/img-video/6.mp4',
        description: 'A recorded conversation presenting arguments for resisting negative social influences.',
        feedback: 'Great vocabulary choice and fluent delivery.',
        grade: 'A'
      }
    ],
    reflections: [
      {
        what_learned: 'I learned how to resist group pressure and stand up for my ideas.',
        how_improved: 'My critical reasoning skills grew.',
        what_difficult: 'Finding facts in the texts was hard.',
        most_useful: 'The debate exercises.'
      }
    ]
  },
  {
    email: 'bibihadisha@criticalminds.edu',
    fullName: 'Аскаркызы Бибихадиша',
    class: '10A',
    quizzes: [
      { quiz_id: 1, score: 3, total: 4 }
    ],
    errors: [
      {
        error_text: "She is more tall than me.",
        correction: "She is taller than me.",
        reason: "Incorrect comparative form of short adjective.",
        what_learned: "Use -er suffix for single syllable adjectives."
      }
    ],
    projects: [
      {
        title: 'Family Relationships Infographic',
        project_type: 'infographic',
        drive_link: '/img-video/WhatsApp Image 2026-05-29 at 16.19.32.jpeg',
        description: 'Visualizing conflict resolution steps and healthy communication patterns inside the home.',
        feedback: 'Nicely organized layout and clean text.',
        grade: 'A+'
      }
    ]
  },
  {
    email: 'shahmardan@criticalminds.edu',
    fullName: 'Ахан Шахмардан',
    class: '10A',
    quizzes: [
      { quiz_id: 1, score: 4, total: 4 }
    ],
    projects: [
      {
        title: 'Digital Literacy & Screen Time Concept Map',
        project_type: 'infographic',
        drive_link: '/img-video/WhatsApp Image 2026-05-29 at 219.32.jpeg',
        description: 'Analyzing the effects of excessive technology use on reading comprehension and focus.',
        feedback: 'Clear connections between nodes. Good critical analysis.',
        grade: 'A'
      }
    ]
  },
  {
    email: 'kassiyet@criticalminds.edu',
    fullName: 'Әбдібек Қасиет',
    class: '10B',
    quizzes: [
      { quiz_id: 1, score: 3, total: 4 }
    ],
    errors: [
      {
        error_text: "I am student.",
        correction: "I am a student.",
        reason: "Omitted indefinite article before singular countable noun.",
        what_learned: "Always use a/an before singular countable professions."
      }
    ]
  },
  {
    email: 'assyl@criticalminds.edu',
    fullName: 'Әлжаппарова Асыл',
    class: '10B',
    quizzes: [
      { quiz_id: 1, score: 4, total: 4 }
    ]
  },
  {
    email: 'bibarys@criticalminds.edu',
    fullName: 'Әшірбек Бибарыс',
    class: '10B',
    quizzes: [
      { quiz_id: 2, score: 3, total: 3 }
    ]
  },
  {
    email: 'gaukhar@criticalminds.edu',
    fullName: 'Базарбай Гаухар',
    class: '10B',
    quizzes: [
      { quiz_id: 1, score: 3, total: 4 }
    ],
    errors: [
      {
        error_text: "We discussed about the problem.",
        correction: "We discussed the problem.",
        reason: "Used preposition 'about' after transitive verb discuss.",
        what_learned: "Discuss takes a direct object without preposition."
      }
    ]
  },
  {
    email: 'abdirazaq@criticalminds.edu',
    fullName: 'Ділман Әбдіразақ',
    class: '10B',
    quizzes: [
      { quiz_id: 1, score: 4, total: 4 }
    ]
  },
  {
    email: 'mustafa@criticalminds.edu',
    fullName: 'Ермурат Мустафа',
    class: '10B',
    quizzes: [
      { quiz_id: 2, score: 2, total: 3 }
    ]
  }
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [seeding, setSeeding]   = useState(false);
  const [seedStatus, setSeedStatus] = useState('');
  const router = useRouter();

  const loadStudents = async () => {
    setLoading(true);
    const { data } = await supabase.from('profiles').select('*, quiz_results(count), projects(count)').eq('role', 'student').order('created_at', { ascending: false });
    setStudents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSeedDemo = async () => {
    if (!confirm('This will register and seed data for 11 students with password "demo1234". Proceed?')) return;
    setSeeding(true);

    try {
      // Create non-persisted supabase client
      const tempClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          }
        }
      );

      for (let i = 0; i < MOCK_STUDENTS.length; i++) {
        const student = MOCK_STUDENTS[i];
        setSeedStatus(`⚙️ [${i+1}/${MOCK_STUDENTS.length}] Processing ${student.fullName}...`);

        // 1. Try signing in
        let { data: authData, error: signInError } = await tempClient.auth.signInWithPassword({
          email: student.email,
          password: 'demo1234'
        });

        // 2. If login fails, register them
        if (signInError) {
          const { data: signUpData, error: signUpError } = await tempClient.auth.signUp({
            email: student.email,
            password: 'demo1234',
            options: {
              data: {
                full_name: student.fullName,
                role: 'student',
                class: student.class
              }
            }
          });

          if (signUpError) {
            throw new Error(`Sign up failed for ${student.email}: ${signUpError.message}`);
          }

          // Sign in to get student token
          const { data: secondSignIn, error: secondSignInError } = await tempClient.auth.signInWithPassword({
            email: student.email,
            password: 'demo1234'
          });
          if (secondSignInError) {
            throw new Error(`Sign in failed after registration: ${secondSignInError.message}`);
          }
          authData = secondSignIn;
        }

        const studentId = authData.user.id;

        // 3. Clean existing student data (as student via RLS)
        await Promise.all([
          tempClient.from('quiz_results').delete().eq('student_id', studentId),
          tempClient.from('error_journals').delete().eq('student_id', studentId),
          tempClient.from('projects').delete().eq('student_id', studentId),
          tempClient.from('reflections').delete().eq('student_id', studentId),
          tempClient.from('challenge_submissions').delete().eq('student_id', studentId)
        ]);

        // 4. Force check profile metadata update
        await tempClient.from('profiles').update({ class: student.class, full_name: student.fullName }).eq('id', studentId);

        // 5. Seed Quizzes
        if (student.quizzes) {
          const quizData = student.quizzes.map(q => ({
            student_id: studentId,
            quiz_id: q.quiz_id,
            score: q.score,
            total: q.total,
            percentage: parseFloat(((q.score / q.total) * 100).toFixed(2))
          }));
          await tempClient.from('quiz_results').insert(quizData);
        }

        // 6. Seed Errors
        if (student.errors) {
          const errorData = student.errors.map(err => ({
            student_id: studentId,
            error_text: err.error_text,
            correction: err.correction,
            reason: err.reason,
            what_learned: err.what_learned
          }));
          await tempClient.from('error_journals').insert(errorData);
        }

        // 7. Seed Projects
        if (student.projects) {
          const projectData = student.projects.map(p => ({
            student_id: studentId,
            title: p.title,
            project_type: p.project_type,
            drive_link: p.drive_link || null,
            video_link: p.video_link || null,
            description: p.description,
            feedback: p.feedback,
            grade: p.grade
          }));
          await tempClient.from('projects').insert(projectData);
        }

        // 8. Seed Reflections
        if (student.reflections) {
          const reflectionData = student.reflections.map(r => ({
            student_id: studentId,
            what_learned: r.what_learned,
            how_improved: r.how_improved,
            what_difficult: r.what_difficult,
            most_useful: r.most_useful
          }));
          await tempClient.from('reflections').insert(reflectionData);
        }
      }

      toast.success('All 11 student accounts and mock reports successfully seeded! 🎉');
      loadStudents();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Seeding failed');
    } finally {
      setSeeding(false);
      setSeedStatus('');
    }
  };

  const filtered = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.class?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <h1 style={{ color:'var(--gray-900)' }}>👥 Students</h1>
          <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>All registered students and their activity summary.</p>
        </div>
        
        <button 
          onClick={handleSeedDemo} 
          disabled={seeding}
          className="btn btn-primary"
          style={{ background: seeding ? 'var(--gray-400)' : 'linear-gradient(135deg, #6244eb, #22d3ee)', border: 'none' }}
        >
          {seeding ? seedStatus : '⚡ Seed 11 Demo Students'}
        </button>
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="🔍 Search by name or class..." style={{ maxWidth:400 }} id="student-search" />

      {loading ? (
        <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'32px' }}>Loading students...</p>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ padding:'48px', textAlign:'center', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'12px' }}>👥</div>
          <p style={{ color:'var(--gray-500)' }}>No students found.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow:'hidden', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--gray-200)' }}>
                {['Student','Class','Quizzes','Projects','Joined','Actions'].map(h => (
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:'.78rem', fontWeight:700, color:'var(--gray-500)', textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} id={`student-row-${s.id}`}
                  style={{ borderBottom: '1px solid var(--gray-100)', transition:'background .2s', cursor:'pointer' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(98,68,235,.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                  onClick={() => router.push(`/dashboard/admin/students/${s.id}`)}>
                  <td style={{ padding:'14px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#fff', fontSize:'.88rem', flexShrink:0 }}>
                        {s.full_name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight:600, color:'var(--gray-900)', fontSize:'.9rem' }}>{s.full_name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'14px 20px', fontSize:'.85rem', color:'var(--gray-600)' }}>{s.class || '—'}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.9rem', fontWeight:600, color:'var(--primary-700)' }}>{s.quiz_results?.[0]?.count || 0}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.9rem', fontWeight:600, color:'var(--accent-700)' }}>{s.projects?.[0]?.count || 0}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.78rem', color:'var(--gray-500)' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td style={{ padding:'14px 20px' }}>
                    <span style={{ fontSize:'.78rem', color:'var(--primary-700)', fontWeight:600 }}>View Details →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
