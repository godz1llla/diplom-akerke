'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import { useAuth } from '../../../../../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './quizdetail.module.css';

export default function QuizDetailPage() {
  const { id }   = useParams();
  const { user } = useAuth();
  const router   = useRouter();

  const [quiz, setQuiz]         = useState(null);
  const [questions, setQs]      = useState([]);
  const [answers, setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      const [qzRes, qsRes] = await Promise.all([
        supabase.from('quizzes').select('*').eq('id', id).single(),
        supabase.from('quiz_questions').select('*').eq('quiz_id', id).order('order_num'),
      ]);
      setQuiz(qzRes.data);
      setQs(qsRes.data || []);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSelect = (qId, opt) => {
    if (submitted) return;
    setAnswers(p => ({ ...p, [qId]: opt }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error('Please answer all questions first!');
      return;
    }
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct) correct++; });
    const pct = (correct / questions.length) * 100;

    const { data: saved } = await supabase.from('quiz_results').insert([{
      student_id:  user.id,
      quiz_id:     parseInt(id),
      score:       correct,
      total:       questions.length,
      percentage:  pct,
      answers,
      completed_at: new Date().toISOString(),
    }]).select().single();

    setResult({ score: correct, total: questions.length, pct: Math.round(pct), resultId: saved?.id });
    setSubmitted(true);

    if (pct >= 75) toast.success(`🎉 Great score: ${Math.round(pct)}%!`);
    else if (pct >= 50) toast('Good effort! Check the explanations below.', { icon: '📚' });
    else toast('Review the explanations and write in your Error Journal!', { icon: '📝' });
  };

  if (loading) return <div style={{ textAlign:'center', padding:60, color:'var(--gray-400)' }}>Loading quiz...</div>;
  if (!quiz)   return <div style={{ textAlign:'center', padding:60, color:'var(--rose-400)' }}>Quiz not found.</div>;

  const OPTION_KEYS = ['a','b','c','d'];
  const OPTION_LABELS = { a:'Option A', b:'Option B', c:'Option C', d:'Option D' };

  return (
    <div className={styles.page}>
      {/* Back */}
      <button onClick={() => router.push('/dashboard/student/quiz')} className={styles.backBtn} id="back-to-quizzes">
        ← Back to Quizzes
      </button>

      {/* Quiz header */}
      <div className={`${styles.quizHeader} glass-card`}>
        <h1 className={styles.quizTitle}>{quiz.title}</h1>
        {quiz.description && <p className={styles.quizDesc}>{quiz.description}</p>}
        <div className={styles.quizMeta}>
          <span>❓ {questions.length} questions</span>
          <span>📊 Auto-graded with explanations</span>
        </div>
      </div>

      {/* Score banner */}
      {submitted && result && (
        <div className={`${styles.scoreBanner} glass-card`} id="score-banner">
          <div className={styles.scoreCircle}>
            <svg viewBox="0 0 80 80" width="100" height="100">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(124,106,245,0.15)" strokeWidth="8" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="url(#sg)" strokeWidth="8"
                strokeDasharray={`${2*Math.PI*34}`}
                strokeDashoffset={`${2*Math.PI*34*(1-result.pct/100)}`}
                strokeLinecap="round" transform="rotate(-90 40 40)" />
              <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6244eb" /><stop offset="100%" stopColor="#22d3ee" />
              </linearGradient></defs>
            </svg>
            <div className={styles.scoreNum}>{result.pct}%</div>
          </div>
          <div>
            <h2 style={{ color:'#f0f0ff', marginBottom:6 }}>
              {result.pct >= 75 ? '🎉 Excellent!' : result.pct >= 50 ? '📚 Good effort!' : '🔍 Keep learning!'}
            </h2>
            <p style={{ color:'var(--gray-400)', marginBottom:16 }}>
              You got <strong style={{ color:'var(--primary-300)' }}>{result.score}/{result.total}</strong> correct.
              Review the explanations below, then open your Error Journal.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => router.push('/dashboard/student/errors')} id="go-error-journal">
                📝 Open Error Journal
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setSubmitted(false); setAnswers({}); setResult(null); }} id="retake-quiz">
                🔄 Retake Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className={styles.questions}>
        {questions.map((q, qi) => {
          const sel = answers[q.id];
          return (
            <div key={q.id} className={`${styles.qCard} glass-card`} id={`question-${q.id}`}>
              <div className={styles.qNum}>Question {qi + 1} / {questions.length}</div>
              <h3 className={styles.qText}>{q.question_text}</h3>

              <div className={styles.options}>
                {OPTION_KEYS.map((key) => {
                  const text = q[`option_${key}`];
                  let cls = styles.opt;
                  if (submitted) {
                    if (key === q.correct) cls += ` ${styles.optCorrect}`;
                    else if (key === sel && sel !== q.correct) cls += ` ${styles.optWrong}`;
                  } else if (sel === key) {
                    cls += ` ${styles.optSelected}`;
                  }
                  return (
                    <button key={key} className={cls}
                      onClick={() => handleSelect(q.id, key)}
                      id={`q${q.id}-${key}`}>
                      <span className={styles.optKey}>{key.toUpperCase()}</span>
                      <span>{text}</span>
                      {submitted && key === q.correct && <span className={styles.optMark}>✓</span>}
                      {submitted && key === sel && sel !== q.correct && <span className={styles.optMark}>✗</span>}
                    </button>
                  );
                })}
              </div>

              {submitted && q.explanation && (
                <div className={`${styles.explanation} ${sel === q.correct ? styles.expCorrect : styles.expWrong}`}>
                  <strong>{sel === q.correct ? '✅ Correct!' : '❌ Incorrect.'}</strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div style={{ textAlign:'center', marginTop:8 }}>
          <button className="btn btn-primary btn-lg" onClick={handleSubmit} id="submit-quiz-btn"
            disabled={Object.keys(answers).length < questions.length}
            style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>
            ✅ Submit Answers ({Object.keys(answers).length}/{questions.length})
          </button>
        </div>
      )}
    </div>
  );
}
