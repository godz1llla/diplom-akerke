'use client';

import styles from './GallerySection.module.css';

const PROJECTS = [
  {
    id: 1,
    type: 'Infographic',
    title: 'Social Media & Teen Mental Health',
    student: 'Asel M.',
    tags: ['Design', 'Research', 'Critical Thinking'],
    emoji: '📊',
    color: '#6244eb',
    grade: 'A',
  },
  {
    id: 2,
    type: 'Video / TikTok',
    title: 'Why AI Cannot Replace Teachers',
    student: 'Daniyar K.',
    tags: ['Speaking', 'Argument', 'Video'],
    emoji: '🎥',
    color: '#22d3ee',
    grade: 'A+',
  },
  {
    id: 3,
    type: 'Presentation',
    title: 'Climate Action: What Can WE Do?',
    student: 'Zarina T.',
    tags: ['Environment', 'Creativity', 'Slides'],
    emoji: '🌱',
    color: '#10b981',
    grade: 'A',
  },
  {
    id: 4,
    type: 'Essay + Visuals',
    title: 'Healthy Lifestyle in the Digital Age',
    student: 'Temirlan A.',
    tags: ['Writing', 'Analysis', 'Design'],
    emoji: '🥗',
    color: '#f59e0b',
    grade: 'B+',
  },
  {
    id: 5,
    type: 'Digital Story',
    title: 'My Journey with English Learning',
    student: 'Aliya N.',
    tags: ['Storytelling', 'Reflection', 'Creative'],
    emoji: '✨',
    color: '#fb7185',
    grade: 'A',
  },
  {
    id: 6,
    type: 'Poster',
    title: 'Screen Time: Friend or Foe?',
    student: 'Bekzat S.',
    tags: ['Design', 'Research', 'Critical'],
    emoji: '🖼️',
    color: '#a49dff',
    grade: 'A+',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-surface)', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-emerald section-badge">🎨 Project Gallery</div>
          <h2>
            Student{' '}
            <span className="gradient-text">Project Gallery</span>
          </h2>
          <p>
            Students transform knowledge into original digital products —
            demonstrating understanding, analysis, and creative transformation.
          </p>
        </div>

        <div className={styles.gallery}>
          {PROJECTS.map((project) => (
            <div key={project.id} className={`${styles.card} glass-card`} id={`project-${project.id}`}>
              {/* Preview area */}
              <div className={styles.preview} style={{
                background: `radial-gradient(circle at 30% 30%, ${project.color}30 0%, transparent 70%)`,
                borderBottom: `2px solid ${project.color}30`,
              }}>
                <span className={styles.previewEmoji}>{project.emoji}</span>
                <span className={styles.projectType}
                  style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}>
                  {project.type}
                </span>
                <span className={styles.gradeTag}>{project.grade}</span>
              </div>

              <div className={styles.cardBody}>
                <h4 className={styles.projectTitle}>{project.title}</h4>
                <p className={styles.studentName}>👤 {project.student}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--gray-400)', marginBottom: '20px', fontSize: '0.95rem' }}>
            Want to add your project to the gallery?
          </p>
          <a href="#upload" className="btn btn-primary" id="gallery-upload-btn">
            📤 Upload Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
