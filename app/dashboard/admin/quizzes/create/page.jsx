'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import { useAuth } from '../../../../../context/AuthContext';
import toast from 'react-hot-toast';

const EMPTY_QUESTION = () => ({
  question_text: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  correct: 'a',
  explanation: '',
});

export default function CreateQuizPage() {
  const { user } = useAuth();
  const router   = useRouter();
  const [title, setTitle]       = useState('');
  const [description, setDesc]  = useState('');
  const [questions, setQs]      = useState([EMPTY_QUESTION()]);
  const [saving, setSaving]     = useState(false);

  const addQuestion = () => setQs(prev => [...prev, EMPTY_QUESTION()]);
  const removeQuestion = (i) => setQs(prev => prev.filter((_, idx) => idx !== i));
  const updateQ = (i, field, value) => setQs(prev => prev.map((q, idx) => idx === i ? { ...q, [field]: value } : q));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('Quiz title is required.'); return; }
    if (questions.some(q => !q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d)) {
      toast.error('Please fill in all question fields.'); return;
    }
    setSaving(true);

    // Insert quiz
    const { data: quiz, error: qErr } = await supabase.from('quizzes').insert([{
      title, description, created_by: user.id
    }]).select().single();

    if (qErr) { toast.error('Failed to create quiz.'); setSaving(false); return; }

    // Insert questions
    const questionsToInsert = questions.map((q, i) => ({
      quiz_id: quiz.id,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct: q.correct,
      explanation: q.explanation,
      order_num: i,
    }));

    const { error: qqErr } = await supabase.from('quiz_questions').insert(questionsToInsert);
    if (qqErr) { toast.error('Failed to save questions.'); setSaving(false); return; }

    toast.success('Quiz created successfully! 🎉');
    router.push('/dashboard/admin/quizzes');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid var(--bg-border)', color: 'var(--gray-400)', borderRadius: 999, padding: '8px 16px', cursor: 'pointer', fontFamily: 'var(--font-outfit)', fontSize: '.88rem' }}>
          ← Back
        </button>
        <h1 style={{ color: '#f0f0ff' }}>➕ Create New Quiz</h1>
      </div>

      <form onSubmit={handleSave} id="create-quiz-form">
        {/* Quiz info */}
        <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ color: '#f0f0ff', marginBottom: 20 }}>Quiz Details</h3>
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="quiz-title">Quiz Title *</label>
            <input id="quiz-title" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Social Media & Mental Health Quiz" required />
          </div>
          <div>
            <label htmlFor="quiz-desc">Description</label>
            <textarea id="quiz-desc" value={description} onChange={e => setDesc(e.target.value)} rows={2}
              placeholder="Briefly describe what this quiz tests..." />
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map((q, i) => (
            <div key={i} className="glass-card" style={{ padding: 24 }} id={`question-block-${i}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ color: 'var(--primary-300)', fontSize: '.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Question {i + 1}
                </h4>
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(i)}
                    style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.25)', color: 'var(--rose-400)', borderRadius: 999, padding: '4px 12px', cursor: 'pointer', fontSize: '.78rem', fontFamily: 'var(--font-outfit)' }}>
                    🗑️ Remove
                  </button>
                )}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label htmlFor={`qt-${i}`}>Question Text *</label>
                <textarea id={`qt-${i}`} value={q.question_text} rows={2}
                  onChange={e => updateQ(i, 'question_text', e.target.value)}
                  placeholder="Write your question here..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {['a','b','c','d'].map(opt => (
                  <div key={opt}>
                    <label htmlFor={`q${i}-opt${opt}`}>
                      Option {opt.toUpperCase()} {q.correct === opt && <span style={{ color: 'var(--emerald-400)', fontSize: '.75rem' }}>✓ Correct</span>}
                    </label>
                    <input id={`q${i}-opt${opt}`} value={q[`option_${opt}`]}
                      onChange={e => updateQ(i, `option_${opt}`, e.target.value)}
                      placeholder={`Option ${opt.toUpperCase()}...`} />
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <div>
                  <label htmlFor={`q${i}-correct`}>Correct Answer *</label>
                  <select id={`q${i}-correct`} value={q.correct} onChange={e => updateQ(i, 'correct', e.target.value)}>
                    <option value="a">A — {q.option_a || 'Option A'}</option>
                    <option value="b">B — {q.option_b || 'Option B'}</option>
                    <option value="c">C — {q.option_c || 'Option C'}</option>
                    <option value="d">D — {q.option_d || 'Option D'}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`q${i}-exp`}>Explanation (shown after answer)</label>
                  <input id={`q${i}-exp`} value={q.explanation}
                    onChange={e => updateQ(i, 'explanation', e.target.value)}
                    placeholder="Why is this the correct answer?" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button type="button" onClick={addQuestion} className="btn btn-secondary" id="add-question-btn">
            ➕ Add Question
          </button>
          <button type="submit" className="btn btn-primary" id="save-quiz-btn" disabled={saving}>
            {saving ? '⏳ Saving...' : `💾 Save Quiz (${questions.length} questions)`}
          </button>
        </div>
      </form>
    </div>
  );
}
