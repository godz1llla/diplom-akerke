'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function load() {
    const { data } = await supabase
      .from('quizzes')
      .select('*, quiz_questions(count), quiz_results(count)')
      .order('created_at', { ascending: false });
    setQuizzes(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this quiz and all its questions?')) return;
    await supabase.from('quiz_questions').delete().eq('quiz_id', id);
    await supabase.from('quizzes').delete().eq('id', id);
    toast.success('Quiz deleted.');
    load();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: 'var(--gray-900)' }}>🧠 Manage Quizzes</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 6 }}>Create and manage quizzes for students.</p>
        </div>
        <Link href="/dashboard/admin/quizzes/create" className="btn btn-primary" id="create-quiz-btn">
          ➕ Create New Quiz
        </Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: 40 }}>Loading...</p>
      ) : quizzes.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center', background: '#fff', border: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🧠</div>
          <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>No quizzes yet. Create your first one!</p>
          <Link href="/dashboard/admin/quizzes/create" className="btn btn-primary" id="first-quiz-btn">
            ➕ Create Quiz
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {quizzes.map(q => (
            <div key={q.id} className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: '1px solid var(--gray-200)' }} id={`quiz-${q.id}`}>
              <span style={{ fontSize: '1.8rem' }}>🧠</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '.98rem', marginBottom: 4 }}>{q.title}</div>
                {q.description && <div style={{ fontSize: '.8rem', color: 'var(--gray-500)' }}>{q.description}</div>}
                <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: '.78rem', color: 'var(--gray-500)' }}>
                  <span>❓ {q.quiz_questions?.[0]?.count || 0} questions</span>
                  <span>📊 {q.quiz_results?.[0]?.count || 0} attempts</span>
                  <span>📅 {new Date(q.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link href={`/dashboard/admin/quizzes/${q.id}/edit`} className="btn btn-secondary btn-sm" id={`edit-quiz-${q.id}`}>
                  ✏️ Edit
                </Link>
                <button onClick={() => handleDelete(q.id)} className="btn btn-sm" id={`delete-quiz-${q.id}`}
                  style={{ background: 'rgba(244,63,94,.08)', border: '1px solid rgba(244,63,94,.2)', color: '#e11d48', cursor: 'pointer', borderRadius: 999, padding: '8px 16px', fontFamily: 'var(--font-outfit)', fontSize: '.85rem' }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
