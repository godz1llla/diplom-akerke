'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './errors.module.css';

export default function ErrorJournalPage() {
  const { user } = useAuth();
  const [entries, setEntries]   = useState([]);
  const [form, setForm]         = useState({ error_text: '', correction: '', reason: '', what_learned: '' });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  async function loadEntries() {
    const { data } = await supabase.from('error_journals').select('*').eq('student_id', user.id).order('created_at', { ascending: false });
    setEntries(data || []);
    setLoading(false);
  }

  useEffect(() => { if (user) loadEntries(); }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.error_text || !form.correction) { toast.error('Please fill in the error and correction fields.'); return; }
    setSaving(true);
    const { error } = await supabase.from('error_journals').insert([{ ...form, student_id: user.id }]);
    if (error) { toast.error('Failed to save. Try again.'); }
    else { toast.success('Entry saved! ✅'); setForm({ error_text: '', correction: '', reason: '', what_learned: '' }); loadEntries(); }
    setSaving(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 style={{ color: '#f0f0ff' }}>🔍 Error Analysis Journal</h1>
        <p style={{ color: 'var(--gray-400)', marginTop: '6px' }}>
          After every quiz, analyze your mistakes here. This develops self-assessment and critical thinking.
        </p>
      </div>

      {/* How to use */}
      <div className={`${styles.howTo} glass-card`}>
        <h4 style={{ color: '#f0f0ff', marginBottom: '14px' }}>📋 How to use this journal</h4>
        <div className={styles.steps}>
          {[['1','❌','Write your mistake','Copy the incorrect sentence or answer.'],
            ['2','✅','Write the correction','Rewrite it correctly.'],
            ['3','💡','Explain why','What rule did you miss? Why did the error happen?'],
            ['4','📚','What I learned','What did this mistake teach you?']]
            .map(([num, icon, title, desc]) => (
            <div key={num} className={styles.step}>
              <span className={styles.stepBubble}>{icon}</span>
              <div><div className={styles.stepTitle}>{title}</div><div className={styles.stepDesc}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Add entry form */}
      <div className={`${styles.formCard} glass-card`}>
        <h4 style={{ color: '#f0f0ff', marginBottom: '20px' }}>➕ Add New Entry</h4>
        <form onSubmit={handleSave} id="error-journal-form">
          <div className={styles.field}>
            <label htmlFor="ej-error">❌ My Mistake *</label>
            <input id="ej-error" value={form.error_text}
              onChange={e => setForm(p => ({ ...p, error_text: e.target.value }))}
              placeholder="e.g. I go to school yesterday." required />
          </div>
          <div className={styles.field}>
            <label htmlFor="ej-correction">✅ Correct Version *</label>
            <input id="ej-correction" value={form.correction}
              onChange={e => setForm(p => ({ ...p, correction: e.target.value }))}
              placeholder="e.g. I went to school yesterday." required />
          </div>
          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label htmlFor="ej-reason">💡 Why did this happen?</label>
              <textarea id="ej-reason" value={form.reason} rows={2}
                onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
                placeholder="I forgot to use Past Simple for past actions." />
            </div>
            <div className={styles.field}>
              <label htmlFor="ej-learned">📚 What I learned</label>
              <textarea id="ej-learned" value={form.what_learned} rows={2}
                onChange={e => setForm(p => ({ ...p, what_learned: e.target.value }))}
                placeholder="Past Simple: verb + -ed or irregular form." />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" id="save-journal-btn" disabled={saving}>
            {saving ? '⏳ Saving...' : '💾 Save Entry'}
          </button>
        </form>
      </div>

      {/* Past entries */}
      <h3 style={{ color: '#f0f0ff' }}>📖 My Journal ({entries.length} entries)</h3>
      {loading ? (
        <div style={{ color: 'var(--gray-400)', textAlign: 'center', padding: '32px' }}>Loading...</div>
      ) : entries.length === 0 ? (
        <div className={`${styles.emptyState} glass-card`}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📝</div>
          <p style={{ color: 'var(--gray-400)' }}>No entries yet. Take a quiz and analyze your mistakes!</p>
        </div>
      ) : (
        <div className={styles.entries}>
          {entries.map((e, i) => (
            <div key={e.id} className={`${styles.entry} glass-card`} id={`entry-${e.id}`}>
              <div className={styles.entryNum}>#{entries.length - i}</div>
              <div className={styles.entryRow}>
                <span className={styles.errorText}>❌ {e.error_text}</span>
              </div>
              <div className={styles.entryRow}>
                <span className={styles.correctionText}>✅ {e.correction}</span>
              </div>
              {e.reason && <div className={styles.reasonText}>💡 <em>{e.reason}</em></div>}
              {e.what_learned && <div className={styles.learnedText}>📚 {e.what_learned}</div>}
              <div className={styles.entryDate}>{new Date(e.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
