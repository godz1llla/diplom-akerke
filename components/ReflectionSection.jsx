'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './ReflectionSection.module.css';

const QUESTIONS = [
  { id: 'learned', icon: '📚', label: 'What did I learn?', placeholder: 'Describe the most important thing you learned during this unit...' },
  { id: 'improved', icon: '📈', label: 'How did I improve?', placeholder: 'What skills improved the most? Give specific examples...' },
  { id: 'difficult', icon: '🔥', label: 'What was difficult?', placeholder: 'What challenges did you face? How did you overcome them?...' },
  { id: 'useful', icon: '⭐', label: 'Which task was most useful?', placeholder: 'Which activity helped you the most and why?...' },
];

export default function ReflectionSection() {
  const [form, setForm] = useState({ name: '', class: '', learned: '', improved: '', difficult: '', useful: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.learned) {
      setError('Please fill in your name and at least the first question.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error: dbError } = await supabase.from('reflections').insert([{
        student_name: form.name,
        class: form.class,
        what_learned: form.learned,
        how_improved: form.improved,
        what_difficult: form.difficult,
        most_useful: form.useful,
        created_at: new Date().toISOString(),
      }]);
      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reflection" className="section-padding" style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
        bottom: -200, right: -200, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-amber section-badge">✨ Final Reflection</div>
          <h2>
            My Learning{' '}
            <span className="gradient-text-amber">Reflection</span>
          </h2>
          <p>
            Complete your final reflection to close the learning cycle.
            This demonstrates deep metacognitive awareness and growth.
          </p>
        </div>

        <div className={styles.wrapper}>
          {/* Why it matters */}
          <div className={styles.sidebar}>
            <div className={`${styles.whyCard} glass-card`}>
              <h4 style={{ color: 'var(--gray-900)', marginBottom: '16px' }}>🧠 Why Reflect?</h4>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '20px' }}>
                Reflection is a core critical thinking skill. When students articulate
                what they learned and how they improved, they consolidate knowledge
                and develop metacognitive awareness.
              </p>
              <div className={styles.reflectionBenefits}>
                {[
                  ['🔍', 'Identifies knowledge gaps'],
                  ['🎯', 'Clarifies learning goals'],
                  ['🧩', 'Connects ideas to real life'],
                  ['🚀', 'Motivates continued growth'],
                  ['❤️', 'Builds self-awareness'],
                ].map(([icon, text]) => (
                  <div key={text} className={styles.benefit}>
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.quoteCard} glass-card`}>
              <div className={styles.quoteMarks}>"</div>
              <p className={styles.quoteBody}>
                Reflection is not just looking back — it is looking forward with clarity.
              </p>
              <p className={styles.quoteSource}>— John Dewey, Philosophy of Education</p>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formCard} glass-card`}>
            {success ? (
              <div className={styles.successState}>
                <div className={styles.successEmoji}>🌟</div>
                <h3 style={{ color: 'var(--gray-900)' }}>Reflection Submitted!</h3>
                <p style={{ color: 'var(--gray-600)', maxWidth: 380, textAlign: 'center', lineHeight: 1.6 }}>
                  Your final reflection has been saved. Congratulations on completing
                  the full learning cycle — from reading to creating to reflecting!
                </p>
                <div className={styles.completedBadge}>
                  🏆 Learning Cycle Complete
                </div>
                <button className="btn btn-secondary btn-sm"
                  onClick={() => { setSuccess(false); setForm({ name: '', class: '', learned: '', improved: '', difficult: '', useful: '' }); }}
                  id="reflection-new-btn">
                  Write Another Reflection
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="reflection-form">
                <h4 style={{ color: 'var(--gray-900)', marginBottom: '24px' }}>Final Reflection Form</h4>

                <div className={styles.nameRow}>
                  <div className={styles.field}>
                    <label htmlFor="ref-name">Your Name *</label>
                    <input id="ref-name" name="name" value={form.name}
                      onChange={handleChange} placeholder="Full name" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="ref-class">Class</label>
                    <input id="ref-class" name="class" value={form.class}
                      onChange={handleChange} placeholder="e.g. 10A" />
                  </div>
                </div>

                {QUESTIONS.map((q) => (
                  <div key={q.id} className={styles.field}>
                    <label htmlFor={`ref-${q.id}`}>
                      <span className={styles.qIcon}>{q.icon}</span> {q.label}
                    </label>
                    <textarea
                      id={`ref-${q.id}`}
                      name={q.id}
                      value={form[q.id]}
                      onChange={handleChange}
                      placeholder={q.placeholder}
                      rows={3}
                    />
                  </div>
                ))}

                {error && <div className={styles.errorMsg}>{error}</div>}

                <button type="submit" className="btn btn-amber" style={{ width: '100%' }}
                  id="reflection-submit-btn" disabled={loading}>
                  {loading ? '⏳ Saving...' : '✨ Submit My Reflection'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
