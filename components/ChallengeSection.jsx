'use client';

import styles from './ChallengeSection.module.css';

const TOPICS = [
  { icon: '📱', title: 'Social Media', desc: 'How does social media affect teenage mental health and communication?', color: '#6244eb' },
  { icon: '💻', title: 'Technology in Education', desc: 'Should AI replace teachers? What are the benefits and risks?', color: '#22d3ee' },
  { icon: '🥗', title: 'Healthy Lifestyle', desc: 'What daily habits can improve both physical and mental health?', color: '#10b981' },
  { icon: '🌱', title: 'Environmental Problems', desc: 'What actions can students take to fight climate change in their community?', color: '#f59e0b' },
];

const SKILLS = [
  { icon: '🎤', label: 'Creative Speaking' },
  { icon: '💬', label: 'Communication Skills' },
  { icon: '🦁', label: 'Confidence' },
  { icon: '📲', label: 'Digital Creativity' },
  { icon: '🧠', label: 'Critical Thinking' },
  { icon: '🌍', label: 'Global Awareness' },
];

export default function ChallengeSection() {
  return (
    <section id="challenge" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative orb */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
        top: '-200px', right: '-200px', borderRadius: '50%', filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-amber section-badge">🔥 2-Week Challenge</div>
          <h2>
            2-Week{' '}
            <span className="gradient-text-amber">Creative Thinking</span>
            {' '}Challenge
          </h2>
          <p>
            Students create TikToks, vlogs, and speaking videos — expressing opinions, proposing solutions,
            and demonstrating mastery of unit topics.
          </p>
        </div>

        {/* Challenge Timeline */}
        <div className={styles.challengeGrid}>
          {/* Week 1 */}
          <div className={`${styles.weekCard} glass-card`}>
            <div className={styles.weekHeader}>
              <span className={styles.weekNum}>Week 1</span>
              <span className={styles.weekTitle}>🎬 Plan & Record</span>
            </div>
            <div className={styles.weekSteps}>
              {[
                'Choose your topic from the 4 themes',
                'Research and gather information',
                'Write a short script (30–60 sec)',
                'Record your TikTok or Vlog',
                'Add subtitles and edit the video',
              ].map((step, i) => (
                <div key={i} className={styles.weekStep}>
                  <span className={styles.weekStepNum}>{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.arrowCenter}>
            <div className={styles.arrow}>→</div>
          </div>

          {/* Week 2 */}
          <div className={`${styles.weekCard} glass-card`}>
            <div className={styles.weekHeader}>
              <span className={styles.weekNum}>Week 2</span>
              <span className={styles.weekTitle}>🚀 Share & Discuss</span>
            </div>
            <div className={styles.weekSteps}>
              {[
                'Upload to Google Drive or share link',
                'Watch classmates\' videos',
                'Comment and give peer feedback',
                'Discuss in class — debate and share opinions',
                'Write final reflection in your journal',
              ].map((step, i) => (
                <div key={i} className={styles.weekStep}>
                  <span className={styles.weekStepNum}>{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Cards */}
        <h3 style={{ textAlign: 'center', marginBottom: '28px', color: '#f0f0ff', marginTop: '64px' }}>
          Challenge Topics
        </h3>
        <div className={styles.topicsGrid}>
          {TOPICS.map((topic) => (
            <div key={topic.title} className={`${styles.topicCard} glass-card`}>
              <div className={styles.topicIcon} style={{ color: topic.color }}>{topic.icon}</div>
              <h4 className={styles.topicTitle} style={{ color: topic.color }}>{topic.title}</h4>
              <p className={styles.topicDesc}>{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* Skills developed */}
        <div className={styles.skillsRow}>
          <h4 style={{ color: 'var(--gray-400)', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Skills Developed
          </h4>
          <div className={styles.skillsGrid}>
            {SKILLS.map((skill) => (
              <div key={skill.label} className={styles.skillChip}>
                <span>{skill.icon}</span>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
