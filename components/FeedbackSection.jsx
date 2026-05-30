'use client';

import styles from './FeedbackSection.module.css';

// Quantitative data
const PRE_POST = [
  { skill: 'Critical Thinking', pre: 52, post: 84 },
  { skill: 'Creative Speaking', pre: 44, post: 79 },
  { skill: 'Self-Assessment', pre: 38, post: 76 },
  { skill: 'Digital Literacy', pre: 61, post: 91 },
  { skill: 'Participation', pre: 55, post: 88 },
];

const TESTIMONIALS = [
  {
    quote: 'Creating videos helped me speak more confidently. I used to be afraid of speaking in class — now I record TikToks!',
    name: 'Asel M.',
    class: 'Grade 10A',
    emoji: '🎥',
  },
  {
    quote: 'Analyzing my mistakes in the Error Journal made me understand WHY I was making them. My writing improved a lot.',
    name: 'Daniyar K.',
    class: 'Grade 10A',
    emoji: '📝',
  },
  {
    quote: 'Digital tasks made lessons more interactive and fun. I actually wanted to do my homework!',
    name: 'Zarina T.',
    class: 'Grade 10B',
    emoji: '💻',
  },
  {
    quote: 'The creative challenge pushed me to think differently. Making an infographic about climate change changed my perspective.',
    name: 'Temirlan A.',
    class: 'Grade 10B',
    emoji: '🌱',
  },
];

function ProgressBar({ pre, post, label }) {
  return (
    <div className={styles.barGroup}>
      <div className={styles.barLabel}>
        <span>{label}</span>
        <div className={styles.barLegend}>
          <span className={styles.preLabel}>Pre: {pre}%</span>
          <span className={styles.postLabel}>Post: {post}%</span>
        </div>
      </div>
      <div className={styles.barRow}>
        <div className={styles.barTrack}>
          <div className={styles.barPre} style={{ width: `${pre}%` }} />
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barPost} style={{ width: `${post}%` }} />
        </div>
      </div>
      <div className={styles.barGain}>
        <span className={styles.gainBadge}>+{post - pre}%</span> improvement
      </div>
    </div>
  );
}

export default function FeedbackSection() {
  return (
    <section id="feedback" className="section-padding" style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        top: -200, right: -200, borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-emerald section-badge">📊 Feedback & Results</div>
          <h2>
            Quantitative &amp;{' '}
            <span className="gradient-text">Qualitative Feedback</span>
          </h2>
          <p>
            Pre-test and post-test data comparing student performance before and after the
            digital learning intervention.
          </p>
        </div>

        {/* Pre/Post Charts */}
        <div className={`${styles.chartsCard} glass-card`}>
          <div className={styles.chartsHeader}>
            <h3 style={{ color: 'var(--gray-900)' }}>📈 Pre-test vs Post-test Comparison</h3>
            <div className={styles.legendRow}>
              <span className={styles.legendPre} />
              <span style={{ fontSize: '0.82rem', color: 'var(--gray-500)' }}>Pre-test</span>
              <span className={styles.legendPost} />
              <span style={{ fontSize: '0.82rem', color: 'var(--gray-500)' }}>Post-test</span>
            </div>
          </div>

          <div className={styles.barsContainer}>
            {PRE_POST.map((item) => (
              <ProgressBar key={item.skill} label={item.skill} pre={item.pre} post={item.post} />
            ))}
          </div>

          <div className={styles.summaryRow}>
            {[
              { value: '+30%', label: 'Avg. Improvement', icon: '📈' },
              { value: '94%', label: 'Completion Rate', icon: '✅' },
              { value: '4.7/5', label: 'Student Satisfaction', icon: '⭐' },
              { value: '100%', label: 'Would Recommend', icon: '❤️' },
            ].map((stat) => (
              <div key={stat.label} className={styles.summaryCard}>
                <span className={styles.summaryIcon}>{stat.icon}</span>
                <span className={styles.summaryValue}>{stat.value}</span>
                <span className={styles.summaryLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ marginTop: '64px' }}>
          <h3 style={{ textAlign: 'center', color: 'var(--gray-900)', marginBottom: '32px' }}>
            💬 Student Testimonials
          </h3>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={`${styles.testimonialCard} glass-card`}>
                <div className={styles.quoteIcon}>{t.emoji}</div>
                <p className={styles.quoteText}>"{t.quote}"</p>
                <div className={styles.quoteAuthor}>
                  <div className={styles.authorAvatar}>{t.name[0]}</div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorClass}>{t.class}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
