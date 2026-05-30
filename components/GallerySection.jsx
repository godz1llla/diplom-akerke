'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './GallerySection.module.css';

const STATIC_PROJECTS = [
  {
    id: 'static-1',
    type: 'Infographic',
    title: 'Social Media & Teen Mental Health',
    student: 'Asel M.',
    tags: ['Design', 'Research', 'Critical Thinking'],
    emoji: '📊',
    color: '#6244eb',
    grade: 'A',
  },
  {
    id: 'static-2',
    type: 'Video / TikTok',
    title: 'Why AI Cannot Replace Teachers',
    student: 'Daniyar K.',
    tags: ['Speaking', 'Argument', 'Video'],
    emoji: '🎥',
    color: '#22d3ee',
    grade: 'A+',
  },
  {
    id: 'static-3',
    type: 'Presentation',
    title: 'Climate Action: What Can WE Do?',
    student: 'Zarina T.',
    tags: ['Environment', 'Creativity', 'Slides'],
    emoji: '🌱',
    color: '#10b981',
    grade: 'A',
  },
];

const TYPE_CONFIGS = {
  presentation: { emoji: '📊', color: '#22d3ee' },
  video: { emoji: '🎥', color: '#6244eb' },
  infographic: { emoji: '🎨', color: '#10b981' },
  essay: { emoji: '📄', color: '#f59e0b' },
  story: { emoji: '✨', color: '#fb7185' },
  other: { emoji: '📦', color: '#a49dff' },
};

export default function GallerySection() {
  const [dbProjects, setDbProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, profiles(full_name, class)')
          .order('created_at', { ascending: false });
        if (!error && data) {
          setDbProjects(data);
        }
      } catch (err) {
        console.error('Error fetching gallery projects:', err);
      }
    }
    loadProjects();
  }, []);

  // Map Supabase projects to standard gallery format
  const mappedDbProjects = dbProjects.map((p) => {
    const typeLower = (p.project_type || 'other').toLowerCase();
    const config = TYPE_CONFIGS[typeLower] || TYPE_CONFIGS.other;
    return {
      id: `db-${p.id}`,
      type: p.project_type || 'Project',
      title: p.title,
      student: p.profiles?.full_name || 'Student',
      tags: [p.project_type, 'Student Work'].filter(Boolean),
      emoji: config.emoji,
      color: config.color,
      grade: p.grade || 'A',
      videoUrl: p.video_link,
      imageUrl: p.drive_link,
    };
  });

  // Combine DB projects first, then static ones
  const allProjects = [...mappedDbProjects, ...STATIC_PROJECTS];

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
          {allProjects.map((project) => {
            // Check if we have media (image/video)
            const hasVideo = project.videoUrl && (project.videoUrl.endsWith('.mp4') || project.videoUrl.includes('/img-video/'));
            const hasImage = project.imageUrl && (project.imageUrl.endsWith('.jpeg') || project.imageUrl.endsWith('.jpg') || project.imageUrl.endsWith('.png') || project.imageUrl.includes('/img-video/'));

            return (
              <div key={project.id} className={`${styles.card} glass-card`} id={`project-${project.id}`}>
                {/* Preview area */}
                <div className={styles.preview} style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.color}30 0%, transparent 70%)`,
                  borderBottom: `2px solid ${project.color}30`,
                }}>
                  {hasVideo ? (
                    <video src={project.videoUrl} muted loop autoPlay playsInline className={styles.previewVideo} />
                  ) : hasImage ? (
                    <img src={project.imageUrl} alt={project.title} className={styles.previewImg} />
                  ) : (
                    <span className={styles.previewEmoji}>{project.emoji}</span>
                  )}
                  <span className={styles.projectType}
                    style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44`, zIndex: 1 }}>
                    {project.type}
                  </span>
                  <span className={styles.gradeTag} style={{ zIndex: 1 }}>{project.grade}</span>
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
            );
          })}
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
