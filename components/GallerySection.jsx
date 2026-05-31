'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './GallerySection.module.css';

const STATIC_PROJECTS = [
  // 1. Абдинур Эльнара
  {
    id: 'static-elnara',
    type: 'Video / Speaking',
    title: 'Speaking Reflection Task',
    student: 'Абдинур Эльнара',
    tags: ['Speaking', 'Reflection', 'Unit 2'],
    emoji: '🎥',
    color: '#6244eb',
    grade: 'A',
    videoUrl: '/img-video/Абдинур_Эльнара_vd2.MOV', // 36MB
  },

  // 2. Алиева Адина
  {
    id: 'static-adina',
    type: 'Presentation',
    title: 'Digital Literacy Research',
    student: 'Алиева Адина',
    tags: ['Research', 'Presentation', 'PDF'],
    emoji: '📊',
    color: '#22d3ee',
    grade: 'A',
    pdfUrl: '/img-video/Алиева_Адина_pr1.pdf', // 9.9MB
  },

  // 3. Асанбек Нурсултан
  {
    id: 'static-nursultan',
    type: 'Video / Speaking',
    title: 'Peer Pressure Discussion Task',
    student: 'Асанбек Нурсултан',
    tags: ['Speaking', 'Peer Pressure', 'Video'],
    emoji: '🎥',
    color: '#10b981',
    grade: 'A+',
    videoUrl: '/img-video/Асанбек_Нұрсұлтан_vd1.mp4', // 12.4MB
  },

  // 4. Аскаркызы Бибихадиша
  {
    id: 'static-bibihadisha',
    type: 'Infographic',
    title: 'Conflict Resolution Concept Map',
    student: 'Аскаркызы Бибихадиша',
    tags: ['Infographic', 'Design', 'Image'],
    emoji: '🎨',
    color: '#f59e0b',
    grade: 'A+',
    imageUrl: '/img-video/Асханкызы_Бибіхадиша_pr1.jpeg', // 0.2MB
  },

  // 5. Ахан Шахмардан
  {
    id: 'static-shahmardan',
    type: 'Presentation',
    title: 'Active Citizenship roadmap',
    student: 'Ахан Шахмардан',
    tags: ['Citizenship', 'Research', 'PDF'],
    emoji: '📊',
    color: '#fb7185',
    grade: 'A',
    pdfUrl: '/img-video/Ахан_Шахмардан_pr1.pdf', // 1.6MB
  },

  // 6. Әбдібек Қасиет
  {
    id: 'static-kassiyet',
    type: 'Video / Discussion',
    title: 'Unit 1 Oral Discussion Assessment',
    student: 'Әбдібек Қасиет',
    tags: ['Speaking', 'Discussion', 'Video'],
    emoji: '🎥',
    color: '#a49dff',
    grade: 'A',
    videoUrl: '/img-video/Әбдібек_Қасиет_vd1.MOV', // 9.7MB
  },

  // 7. Әлжаппарова Асыл
  {
    id: 'static-assyl',
    type: 'Video / Critique',
    title: 'Digital Tools & E-Learning Critique',
    student: 'Әлжаппарова Асыл',
    tags: ['Critique', 'E-Learning', 'Video'],
    emoji: '🎥',
    color: '#38bdf8',
    grade: 'A+',
    videoUrl: '/img-video/Әлжаппарова_Асыл_vd1.MOV', // 16.9MB
  },

  // 8. Әшірбек Бибарыс
  {
    id: 'static-bibarys',
    type: 'Presentation',
    title: 'Environmental Protection Action Slides',
    student: 'Әшірбек Бибарыс',
    tags: ['Environment', 'Presentation', 'PDF'],
    emoji: '📊',
    color: '#10b981',
    grade: 'A',
    pdfUrl: '/img-video/Әшірбек_Бибарыс_pr1.pdf', // 3.1MB
  }
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
            const videoUrlLower = (project.videoUrl || '').toLowerCase();
            const imageUrlLower = (project.imageUrl || '').toLowerCase();
            const pdfUrlLower = (project.pdfUrl || '').toLowerCase();

            const isPdf = !!project.pdfUrl || pdfUrlLower.endsWith('.pdf');
            const hasVideo = !!project.videoUrl && (videoUrlLower.endsWith('.mp4') || videoUrlLower.endsWith('.mov') || videoUrlLower.endsWith('.webm'));
            const hasImage = !!project.imageUrl && (imageUrlLower.endsWith('.jpeg') || imageUrlLower.endsWith('.jpg') || imageUrlLower.endsWith('.png'));

            const cardClickUrl = project.videoUrl || project.imageUrl || project.pdfUrl;

            return (
              <div 
                key={project.id} 
                className={`${styles.card} glass-card`} 
                id={`project-${project.id}`}
                onClick={() => cardClickUrl && window.open(cardClickUrl, '_blank')}
                title="Click to view full project file"
              >
                {/* Preview area */}
                <div className={styles.preview} style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.color}30 0%, transparent 70%)`,
                  borderBottom: `2px solid ${project.color}30`,
                }}>
                  {hasVideo ? (
                    <video src={project.videoUrl} muted loop autoPlay playsInline className={styles.previewVideo} />
                  ) : hasImage ? (
                    <img src={project.imageUrl} alt={project.title} className={styles.previewImg} />
                  ) : isPdf ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 1, width: '100%', height: '100%' }}>
                      <span style={{ fontSize: '3.2rem' }}>📄</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-600)', background: 'rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Open PDF Presentation
                      </span>
                    </div>
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
