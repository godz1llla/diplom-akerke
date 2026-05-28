'use client';

import styles from './HeroSection.module.css';

const STATS = [
  { value: '8', label: 'Learning Stages', icon: '📚' },
  { value: '94%', label: 'Student Engagement', icon: '🎯' },
  { value: '2 Weeks', label: 'Creative Challenge', icon: '🏆' },
  { value: '↑32%', label: 'Critical Thinking Growth', icon: '🧠' },
];

export default function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Grid pattern */}
      <div className={styles.grid} />

      <div className="container">
        <div className={styles.content}>
          {/* Badge */}
          <div className={`badge badge-primary ${styles.badge}`}>
            <span>✦</span>
            Diploma Research Project · 2024
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>
            Developing{' '}
            <span className="gradient-text">Critical &amp; Creative</span>
            <br />
            Thinking in Students
          </h1>

          {/* Sub-heading */}
          <p className={styles.subtitle}>
            Through <strong style={{ color: 'var(--accent-400)' }}>digital linguistic tools</strong> and{' '}
            <strong style={{ color: 'var(--primary-300)' }}>online learning platforms</strong> — a comprehensive
            framework for modern high school education.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <a href="#learning" className="btn btn-primary btn-lg" id="hero-start-btn">
              🚀 Start Learning
            </a>
            <a href="#results" className="btn btn-secondary btn-lg" id="hero-results-btn">
              📊 View Results
            </a>
          </div>

          {/* Platform logos */}
          <div className={styles.platforms}>
            <span className={styles.platformsLabel}>Powered by:</span>
            <div className={styles.platformList}>
              {['Newsela', 'BBC Learning', 'Google Docs', 'TikTok EDU', 'Supabase'].map((p) => (
                <span key={p} className={styles.platformChip}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
