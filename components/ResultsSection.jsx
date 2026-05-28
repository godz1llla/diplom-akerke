'use client';

import styles from './ResultsSection.module.css';

const RESULTS = [
  {
    metric: 'Critical Thinking',
    experimental: 84,
    control: 61,
    icon: '🧠',
    color: '#6244eb',
    description: 'Experimental group showed 23% higher scores in critical thinking assessments.',
  },
  {
    metric: 'Creative Expression',
    experimental: 79,
    control: 58,
    icon: '🎨',
    color: '#22d3ee',
    description: 'Students who created digital products scored 21% higher on creativity measures.',
  },
  {
    metric: 'Speaking Confidence',
    experimental: 88,
    control: 64,
    icon: '🎤',
    color: '#10b981',
    description: 'TikTok and vlog tasks led to a 24% improvement in speaking fluency and confidence.',
  },
  {
    metric: 'Class Participation',
    experimental: 91,
    control: 67,
    icon: '✋',
    color: '#f59e0b',
    description: 'Digital engagement increased active participation by 24% in the experimental group.',
  },
];

const CONCLUSIONS = [
  { icon: '✅', text: 'Students did NOT just read texts — they analyzed, evaluated, and transformed information.' },
  { icon: '✅', text: 'Error Analysis Journals improved metacognitive awareness and self-correction skills.' },
  { icon: '✅', text: 'TikTok and creative tasks built authentic communication and digital confidence.' },
  { icon: '✅', text: 'Project uploads demonstrated knowledge transformation and creative thinking.' },
  { icon: '✅', text: 'Digital tools increased motivation, engagement, and learning outcomes significantly.' },
];

export default function ResultsSection() {
  return (
    <section id="results" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(98,68,235,0.12) 0%, transparent 70%)',
        bottom: -300, left: '50%', transform: 'translateX(-50%)',
        borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary section-badge">📈 Research Results</div>
          <h2>
            Experimental{' '}
            <span className="gradient-text">Results</span>
          </h2>
          <p>
            Comparing the experimental group (digital learning tools) with the control group
            (traditional teaching methods) across key metrics.
          </p>
        </div>

        {/* Comparison cards */}
        <div className={styles.resultsGrid}>
          {RESULTS.map((r) => (
            <div key={r.metric} className={`${styles.resultCard} glass-card`}>
              <div className={styles.resultIcon} style={{ color: r.color }}>{r.icon}</div>
              <h4 className={styles.resultMetric}>{r.metric}</h4>
              <p className={styles.resultDesc}>{r.description}</p>

              <div className={styles.comparison}>
                <div className={styles.compareItem}>
                  <span className={styles.compareLabel}>Experimental</span>
                  <div className={styles.compareBar}>
                    <div className={styles.compareFill}
                      style={{ width: `${r.experimental}%`, background: `linear-gradient(90deg, ${r.color}88, ${r.color})` }} />
                  </div>
                  <span className={styles.compareValue} style={{ color: r.color }}>{r.experimental}%</span>
                </div>
                <div className={styles.compareItem}>
                  <span className={styles.compareLabel}>Control</span>
                  <div className={styles.compareBar}>
                    <div className={styles.compareFill}
                      style={{ width: `${r.control}%`, background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                  <span className={styles.compareValue} style={{ color: 'var(--gray-400)' }}>{r.control}%</span>
                </div>
              </div>

              <div className={styles.diffBadge} style={{ borderColor: `${r.color}44`, color: r.color }}>
                +{r.experimental - r.control}% advantage
              </div>
            </div>
          ))}
        </div>

        {/* Conclusions */}
        <div className={`${styles.conclusionsCard} glass-card`} style={{ marginTop: '64px' }}>
          <h3 style={{ color: '#f0f0ff', marginBottom: '24px', textAlign: 'center' }}>
            🔬 What This Research Proves
          </h3>
          <div className={styles.conclusionsList}>
            {CONCLUSIONS.map((c, i) => (
              <div key={i} className={styles.conclusionItem}>
                <span className={styles.conclusionIcon}>{c.icon}</span>
                <span className={styles.conclusionText}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
