'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../../../lib/supabase';
import toast from 'react-hot-toast';

const EMPTY_Q = () => ({ question_text:'', option_a:'', option_b:'', option_c:'', option_d:'', correct:'a', explanation:'', isNew: true });

export default function EditQuizPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const [quiz, setQuiz]   = useState({ title:'', description:'' });
  const [questions, setQs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [qzRes, qsRes] = await Promise.all([
        supabase.from('quizzes').select('*').eq('id', id).single(),
        supabase.from('quiz_questions').select('*').eq('quiz_id', id).order('order_num'),
      ]);
      setQuiz(qzRes.data || { title:'', description:'' });
      setQs(qsRes.data || []);
      setLoading(false);
    }
    load();
  }, [id]);

  const updateQ = (i, field, value) => setQs(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: value } : q));
  const addQ    = () => setQs(prev => [...prev, EMPTY_Q()]);
  const removeQ = async (i) => {
    const q = questions[i];
    if (q.id && !q.isNew) await supabase.from('quiz_questions').delete().eq('id', q.id);
    setQs(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!quiz.title.trim()) { toast.error('Title is required.'); return; }
    setSaving(true);

    await supabase.from('quizzes').update({ title: quiz.title, description: quiz.description }).eq('id', id);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const payload = { question_text: q.question_text, option_a: q.option_a, option_b: q.option_b, option_c: q.option_c, option_d: q.option_d, correct: q.correct, explanation: q.explanation, order_num: i, quiz_id: parseInt(id) };
      if (q.isNew || !q.id) await supabase.from('quiz_questions').insert([payload]);
      else await supabase.from('quiz_questions').update(payload).eq('id', q.id);
    }

    toast.success('Quiz saved! ✅');
    setSaving(false);
    router.push('/dashboard/admin/quizzes');
  };

  if (loading) return <div style={{ textAlign:'center', padding:60, color:'var(--gray-500)' }}>Loading...</div>;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <button onClick={() => router.back()} style={{ background:'none', border:'1px solid var(--gray-200)', color:'var(--gray-600)', borderRadius:999, padding:'8px 16px', cursor:'pointer', fontFamily:'var(--font-outfit)', fontSize:'.88rem' }}>← Back</button>
        <h1 style={{ color:'var(--gray-900)' }}>✏️ Edit Quiz</h1>
      </div>

      <form onSubmit={handleSave} id="edit-quiz-form">
        <div className="glass-card" style={{ padding:28, marginBottom:20, background:'#fff', border:'1px solid var(--gray-200)' }}>
          <h3 style={{ color:'var(--gray-900)', marginBottom:16 }}>Quiz Details</h3>
          <div style={{ marginBottom:14 }}>
            <label htmlFor="eq-title">Title *</label>
            <input id="eq-title" value={quiz.title} onChange={e=>setQuiz(p=>({...p,title:e.target.value}))} required />
          </div>
          <div>
            <label htmlFor="eq-desc">Description</label>
            <textarea id="eq-desc" value={quiz.description||''} rows={2} onChange={e=>setQuiz(p=>({...p,description:e.target.value}))} />
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {questions.map((q, i) => (
            <div key={q.id || i} className="glass-card" style={{ padding:22, background:'#fff', border:'1px solid var(--gray-200)' }} id={`eq-q-${i}`}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                <span style={{ fontSize:'.82rem', fontWeight:700, color:'var(--primary-700)', textTransform:'uppercase', letterSpacing:'.06em' }}>Question {i+1}</span>
                <button type="button" onClick={() => removeQ(i)}
                  style={{ background:'rgba(244,63,94,.08)', border:'1px solid rgba(244,63,94,.2)', color:'#e11d48', borderRadius:999, padding:'3px 10px', cursor:'pointer', fontSize:'.75rem', fontFamily:'var(--font-outfit)' }}>
                  🗑️ Remove
                </button>
              </div>
              <div style={{ marginBottom:12 }}>
                <label htmlFor={`eq-qt-${i}`}>Question *</label>
                <textarea id={`eq-qt-${i}`} value={q.question_text} rows={2} onChange={e=>updateQ(i,'question_text',e.target.value)} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                {['a','b','c','d'].map(opt => (
                  <div key={opt}>
                    <label htmlFor={`eq-q${i}-${opt}`}>Option {opt.toUpperCase()}</label>
                    <input id={`eq-q${i}-${opt}`} value={q[`option_${opt}`]} onChange={e=>updateQ(i,`option_${opt}`,e.target.value)} />
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:10 }}>
                <div>
                  <label htmlFor={`eq-corr-${i}`}>Correct Answer</label>
                  <select id={`eq-corr-${i}`} value={q.correct} onChange={e=>updateQ(i,'correct',e.target.value)}>
                    {['a','b','c','d'].map(o=><option key={o} value={o}>{o.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`eq-exp-${i}`}>Explanation</label>
                  <input id={`eq-exp-${i}`} value={q.explanation||''} onChange={e=>updateQ(i,'explanation',e.target.value)} placeholder="Why is this correct?" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:12, marginTop:20 }}>
          <button type="button" onClick={addQ} className="btn btn-secondary" id="eq-add-q">➕ Add Question</button>
          <button type="submit" className="btn btn-primary" id="eq-save" disabled={saving}>
            {saving ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
