'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './UploadSection.module.css';

export default function UploadSection() {
  const [form, setForm] = useState({
    name: '',
    class: '',
    projectTitle: '',
    type: 'presentation',
    driveLink: '',
    videoLink: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.projectTitle) {
      setError('Please fill in your name and project title.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error: dbError } = await supabase.from('projects').insert([{
        student_name: form.name,
        class: form.class,
        project_title: form.projectTitle,
        project_type: form.type,
        drive_link: form.driveLink,
        video_link: form.videoLink,
        description: form.description,
        created_at: new Date().toISOString(),
      }]);
      if (dbError) throw dbError;
      setSuccess(true);
      setForm({ name: '', class: '', projectTitle: '', type: 'presentation', driveLink: '', videoLink: '', description: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
        bottom: -200, left: -200, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="section-header">
          <div className="badge badge-accent section-badge">📤 Upload</div>
          <h2>
            Upload Your{' '}
            <span className="gradient-text">Project</span>
          </h2>
          <p>
            Share your creative work with the class. Upload a Google Drive link,
            video URL, or describe your project below.
          </p>
        </div>

        <div className={styles.uploadWrapper}>
          {/* Info cards */}
          <div className={styles.infoSide}>
            <div className={`${styles.infoCard} glass-card`}>
              <h4 style={{ color: '#f0f0ff', marginBottom: '16px' }}>📁 What to Upload</h4>
              {[
                ['📄', 'Essays & Reflections', 'Google Docs link'],
                ['🎨', 'Posters & Infographics', 'Canva or Drive link'],
                ['📊', 'Presentations', 'Google Slides link'],
                ['🎥', 'Videos & TikToks', 'YouTube or TikTok link'],
                ['🖼️', 'Digital Stories', 'Any shareable link'],
              ].map(([icon, title, sub]) => (
                <div key={title} className={styles.uploadType}>
                  <span className={styles.uploadTypeIcon}>{icon}</span>
                  <div>
                    <div className={styles.uploadTypeName}>{title}</div>
                    <div className={styles.uploadTypeSub}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.driveCard} glass-card`}>
              <h4 style={{ color: '#f0f0ff', marginBottom: '8px' }}>🗂️ Shared Google Drive</h4>
              <p style={{ color: 'var(--gray-400)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
                All class submissions are collected in a shared folder.
                Make sure your Drive link is set to "Anyone with the link can view".
              </p>
              <div className={styles.driveInfo}>
                <span className={styles.driveIcon}>📂</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-400)', fontWeight: 600 }}>
                  Class 10A — Digital Projects 2026
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formCard} glass-card`}>
            <h4 style={{ color: '#f0f0ff', marginBottom: '24px' }}>Submit Your Project</h4>

            {success ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>🎉</div>
                <h3 style={{ color: '#f0f0ff' }}>Project Submitted!</h3>
                <p style={{ color: 'var(--gray-400)' }}>
                  Your project has been received. Your teacher will review it and provide feedback.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setSuccess(false)} id="upload-another-btn">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="upload-form">
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="upload-name">Your Name *</label>
                    <input id="upload-name" name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Asel Mukanova" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="upload-class">Class</label>
                    <input id="upload-class" name="class" value={form.class} onChange={handleChange}
                      placeholder="e.g. 10A" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="upload-title">Project Title *</label>
                  <input id="upload-title" name="projectTitle" value={form.projectTitle} onChange={handleChange}
                    placeholder="e.g. Social Media & Mental Health Infographic" required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="upload-type">Project Type</label>
                  <select id="upload-type" name="type" value={form.type} onChange={handleChange}>
                    <option value="presentation">📊 Presentation</option>
                    <option value="video">🎥 Video / TikTok</option>
                    <option value="infographic">🎨 Infographic / Poster</option>
                    <option value="essay">📄 Essay / Reflection</option>
                    <option value="story">✨ Digital Story</option>
                    <option value="other">📦 Other</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="upload-drive">Google Drive Link</label>
                  <input id="upload-drive" name="driveLink" value={form.driveLink} onChange={handleChange}
                    placeholder="https://drive.google.com/..." />
                </div>

                <div className={styles.field}>
                  <label htmlFor="upload-video">Video / TikTok Link</label>
                  <input id="upload-video" name="videoLink" value={form.videoLink} onChange={handleChange}
                    placeholder="https://tiktok.com/... or https://youtube.com/..." />
                </div>

                <div className={styles.field}>
                  <label htmlFor="upload-desc">Short Description</label>
                  <textarea id="upload-desc" name="description" value={form.description} onChange={handleChange}
                    placeholder="Briefly describe your project and what you learned..."
                    rows={3} />
                </div>

                {error && <div className={styles.errorMsg}>{error}</div>}

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}
                  id="upload-submit-btn" disabled={loading}>
                  {loading ? '⏳ Submitting...' : '📤 Submit Project'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
