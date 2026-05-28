'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './quiz.module.css';

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults]   = useState({});
  const [loading, setLoading]   = useState(true);
  const { user } = useAuth();
  const router   = useRouter();

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [qRes, rRes] = await Promise.all([
        supabase.from('quizzes').select('*, quiz_questions(count)').order('created_at'),
        supabase.from('quiz_results').select('quiz_id, score, total, percentage').eq('student_id', user.id),
      ]);
      setQuizzes(qRes.data || []);
      const map = {};
      (rRes.data || []).forEach(r => { if (!map[r.quiz_id] || r.percentage > map[r.quiz_id].percentage) map[r.quiz_id] = r; });
      setResults(map);
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) return <div style={{ textAlign:'center', padding:60, color:'var(--gray-400)' }}>Loading quizzes...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 style={{ color:'#f0f0ff' }}>🧠 Quizzes</h1>
        <p style={{ color:'var(--gray-400)', marginTop:'6px' }}>
          Complete all quizzes. After submitting, you'll see correct answers with explanations — then write in your Error Journal.
        </p>
      </div>

      <div className={styles.quizGrid}>
        {quizzes.map((quiz) => {
          const done = results[quiz.id];
          const pct  = done ? Math.round(done.percentage) : null;
          return (
            <div key={quiz.id} className={`${styles.quizCard} glass-card`} id={`quiz-card-${quiz.id}`}>
              <div className={styles.quizCardTop}>
                <div className={styles.quizIcon}>🧠</div>
                {done && (
                  <div className={styles.scorePill} style={{
                    background: pct >= 75 ? 'rgba(16,185,129,0.15)' : pct >= 50 ? 'rgba(245,158,11,0.15)' : 'rgba(244,63,94,0.15)',
                    color: pct >= 75 ? 'var(--emerald-400)' : pct >= 50 ? 'var(--amber-400)' : 'var(--rose-400)',
                    border: `1px solid ${pct >= 75 ? 'rgba(16,185,129,0.3)' : pct >= 50 ? 'rgba(245,158,11,0.3)' : 'rgba(244,63,94,0.3)'}`,
                  }}>
                    Best: {pct}%
                  </div>
                )}
              </div>

              <h3 className={styles.quizTitle}>{quiz.title}</h3>
              {quiz.description && <p className={styles.quizDesc}>{quiz.description}</p>}

              <div className={styles.quizMeta}>
                <span>❓ {quiz.quiz_questions?.[0]?.count || 0} questions</span>
                <span>{done ? '✅ Completed' : '⏳ Not started'}</span>
              </div>

              {done && (
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
              )}

              <div className={styles.quizActions}>
                <button
                  className={`btn ${done ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  onClick={() => router.push(`/dashboard/student/quiz/${quiz.id}`)}
                  style={{ flex: 1 }}
                  id={`start-quiz-${quiz.id}`}
                >
                  {done ? '🔄 Retake Quiz' : '🚀 Start Quiz'}
                </button>
                {done && (
                  <button className="btn btn-secondary btn-sm"
                    onClick={() => router.push('/dashboard/student/errors')}
                    id={`journal-quiz-${quiz.id}`}>
                    📝 Journal
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
