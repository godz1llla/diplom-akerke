'use client';

import styles from './ErrorAnalysis.module.css';

const EXAMPLES = [
  {
    error: 'I go to school yesterday.',
    correction: 'I went to school yesterday.',
    reason: 'The sentence describes a past action, so the verb must be in Past Simple form.',
    type: 'Grammar',
    color: '#6244eb',
  },
  {
    error: 'She is more tall than her sister.',
    correction: 'She is taller than her sister.',
    reason: 'Single-syllable adjectives form comparatives with "-er", not "more".',
    type: 'Grammar',
    color: '#22d3ee',
  },
  {
    error: 'I didn\'t understood the text.',
    correction: 'I didn\'t understand the text.',
    reason: 'After auxiliary "did" the main verb stays in its base form, not past tense.',
    type: 'Syntax',
    color: '#f59e0b',
  },
];

const JOURNAL_STEPS = [
  { step: '1', icon: '📝', title: 'Write the mistake', desc: 'Copy the exact sentence where the error occurred.' },
  { step: '2', icon: '✏️', title: 'Write the correction', desc: 'Rewrite the sentence correctly.' },
  { step: '3', icon: '🔍', title: 'Explain the reason', desc: 'Why did this error happen? What rule did you miss?' },
  { step: '4', icon: '💡', title: 'What I learned', desc: 'What grammar rule or vocabulary did you learn from this mistake?' },
];

export default function ErrorAnalysisSection() {
  return (
    <section id="errors" className="section-padding" style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(251,113,133,0.1) 0%, transparent 70%)',
        top: -200, left: -200, borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary section-badge">🔍 Error Analysis</div>
          <h2>
            Error Analysis{' '}
            <span className="gradient-text">Journal</span>
          </h2>
          <p>
            After every quiz, students open their Google Doc journal and analyze mistakes —
            developing self-correction skills and critical awareness.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Left: How it works */}
          <div className={styles.leftCol}>
            <div className={`${styles.howCard} glass-card`}>
              <h4 style={{ color: '#f0f0ff', marginBottom: '24px' }}>📋 How It Works</h4>
              <div className={styles.steps}>
                {JOURNAL_STEPS.map((s) => (
                  <div key={s.step} className={styles.journalStep}>
                    <div className={styles.stepBubble}>
                      <span className={styles.stepEmoji}>{s.icon}</span>
                      <span className={styles.stepNum}>{s.step}</span>
                    </div>
                    <div>
                      <div className={styles.stepTitle}>{s.title}</div>
                      <div className={styles.stepDesc}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.driveCard} glass-card`}>
              <div className={styles.driveTop}>
                <span style={{ fontSize: '2rem' }}>📁</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#f0f0ff', fontSize: '0.95rem' }}>Google Drive Folder</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Shared with all students</div>
                </div>
              </div>
              <div className={styles.driveFiles}>
                {['Error_Journal_Asel.docx', 'Error_Journal_Daniyar.docx', 'Error_Journal_Zarina.docx', '+ 17 more files...'].map((f) => (
                  <div key={f} className={styles.driveFile}>
                    <span>📄</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Example journal entries */}
          <div className={styles.rightCol}>
            <h4 style={{ color: '#f0f0ff', marginBottom: '20px' }}>
              📖 Sample Journal Entries
            </h4>
            <div className={styles.entries}>
              {EXAMPLES.map((ex, i) => (
                <div key={i} className={`${styles.entry} glass-card`}
                  style={{ borderLeft: `3px solid ${ex.color}` }}>
                  <div className={styles.entryHeader}>
                    <span className={`badge`}
                      style={{
                        background: `${ex.color}18`,
                        border: `1px solid ${ex.color}44`,
                        color: ex.color,
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>
                      {ex.type} Error
                    </span>
                  </div>

                  <div className={styles.errorRow}>
                    <div className={styles.errorLabel}>❌ Mistake</div>
                    <div className={styles.errorText}>{ex.error}</div>
                  </div>

                  <div className={styles.correctionRow}>
                    <div className={styles.correctionLabel}>✅ Correction</div>
                    <div className={styles.correctionText}>{ex.correction}</div>
                  </div>

                  <div className={styles.reasonRow}>
                    <div className={styles.reasonLabel}>💡 Why it happened</div>
                    <div className={styles.reasonText}>{ex.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* What this develops */}
            <div className={`${styles.developsCard} glass-card`} style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#f0f0ff', marginBottom: '14px', fontSize: '1rem' }}>
                🧠 This Develops:
              </h4>
              <div className={styles.developsGrid}>
                {[
                  ['🔬', 'Self-Assessment'],
                  ['🎯', 'Critical Thinking'],
                  ['📈', 'Metacognition'],
                  ['🔁', 'Self-Correction'],
                  ['💪', 'Independence'],
                  ['📚', 'Rule Awareness'],
                ].map(([icon, label]) => (
                  <div key={label} className={styles.developChip}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
