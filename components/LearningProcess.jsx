'use client';

import styles from './LearningProcess.module.css';

const STEPS = [
  {
    number: '01',
    icon: '📖',
    title: 'Reading & Comprehension',
    subtitle: 'STEP 1 — Reading',
    color: 'primary',
    description:
      'Students engage with authentic texts on Newsela and BBC Learning English. Texts are leveled for comprehension, vocabulary, and critical analysis.',
    tools: ['Newsela', 'BBC Learning English', 'Google Docs'],
    skills: ['Reading comprehension', 'Vocabulary', 'Text analysis'],
  },
  {
    number: '02',
    icon: '🧠',
    title: 'Quiz & Self-Analysis',
    subtitle: 'STEP 2 — Quiz',
    color: 'accent',
    description:
      'Multiple choice, matching, and reflection questions test understanding. After completion, correct answers reveal automatically with explanations.',
    tools: ['Quizlet', 'Google Forms', 'In-platform quiz'],
    skills: ['Critical analysis', 'Self-assessment', 'Metacognition'],
  },
  {
    number: '03',
    icon: '🔍',
    title: 'Error Analysis Journal',
    subtitle: 'STEP 3 — Reflection',
    color: 'amber',
    description:
      'Students open Google Docs and write their Error Analysis Journal — explaining why mistakes happened, how to fix them, and what they learned.',
    tools: ['Google Docs', 'Google Drive', 'Shared Folders'],
    skills: ['Self-reflection', 'Error analysis', 'Meta-learning'],
  },
  {
    number: '04',
    icon: '🎥',
    title: '2-Week Creative Challenge',
    subtitle: 'STEP 4 — Create',
    color: 'rose',
    description:
      'TikTok vlogs, speaking tasks, and creative videos on real-world topics like Technology, Social Media, and Environment.',
    tools: ['TikTok', 'Video editing apps', 'Presentation tools'],
    skills: ['Creative speaking', 'Communication', 'Digital creativity'],
  },
  {
    number: '05',
    icon: '🎨',
    title: 'Creative Projects',
    subtitle: 'STEP 5 — Produce',
    color: 'emerald',
    description:
      'Students transform knowledge into original digital products: posters, infographics, presentations, videos, and digital stories.',
    tools: ['Canva', 'Google Slides', 'Adobe Express'],
    skills: ['Creative thinking', 'Knowledge transformation', 'Digital literacy'],
  },
  {
    number: '06',
    icon: '📤',
    title: 'Upload & Share',
    subtitle: 'STEP 6 — Share',
    color: 'primary',
    description:
      'Students upload their projects to a shared Google Drive folder or submit links directly through the platform for teacher review.',
    tools: ['Google Drive', 'Platform Upload', 'Video Links'],
    skills: ['Collaboration', 'Presentation', 'Sharing'],
  },
  {
    number: '07',
    icon: '📊',
    title: 'Quantitative Feedback',
    subtitle: 'STEP 7 — Feedback',
    color: 'accent',
    description:
      'Progress charts, pre/post-test comparisons, and performance analytics give clear measurable insights into student growth.',
    tools: ['Charts', 'Progress Reports', 'Analytics'],
    skills: ['Data analysis', 'Progress tracking', 'Goal setting'],
  },
  {
    number: '08',
    icon: '✨',
    title: 'Final Reflection',
    subtitle: 'STEP 8 — Reflect',
    color: 'amber',
    description:
      'Students complete a structured final reflection: What did I learn? How did I improve? Which task was most useful?',
    tools: ['Reflection forms', 'Portfolio', 'Peer review'],
    skills: ['Deep reflection', 'Self-awareness', 'Growth mindset'],
  },
];

const COLOR_MAP = {
  primary: 'var(--gradient-primary)',
  accent:  'linear-gradient(135deg, #22d3ee 0%, #6244eb 100%)',
  amber:   'var(--gradient-amber)',
  rose:    'linear-gradient(135deg, #fb7185 0%, #f59e0b 100%)',
  emerald: 'var(--gradient-emerald)',
};

export default function LearningProcess() {
  return (
    <section id="learning" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(98,68,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary section-badge">📚 Learning Journey</div>
          <h2>
            Step-by-Step{' '}
            <span className="gradient-text">Learning Process</span>
          </h2>
          <p>
            A structured 8-stage model that develops both critical thinking and creative skills
            through digital tools and authentic tasks.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`${styles.step} ${index % 2 === 0 ? styles.stepLeft : styles.stepRight}`}
            >
              {/* Connector line */}
              <div className={styles.connector}>
                <div
                  className={styles.dot}
                  style={{ background: COLOR_MAP[step.color] }}
                />
              </div>

              {/* Card */}
              <div className={`${styles.card} glass-card`}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepNum}
                    style={{ background: COLOR_MAP[step.color], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {step.number}
                  </span>
                  <span className={styles.stepIcon}>{step.icon}</span>
                </div>

                <div className={`badge badge-${step.color === 'rose' ? 'primary' : step.color}`}
                  style={{ marginBottom: '10px', fontSize: '0.72rem' }}>
                  {step.subtitle}
                </div>

                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.description}</p>

                <div className={styles.toolsRow}>
                  {step.tools.map((t) => (
                    <span key={t} className={styles.toolChip}>{t}</span>
                  ))}
                </div>

                <div className={styles.skills}>
                  {step.skills.map((s) => (
                    <span key={s} className={styles.skillTag}>✓ {s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
