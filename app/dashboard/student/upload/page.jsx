'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const { user, profile } = useAuth();
  const [form, setForm]   = useState({ title:'', project_type:'presentation', drive_link:'', video_link:'', description:'' });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  async function loadProjects() {
    const { data } = await supabase.from('projects').select('*').eq('student_id', user.id).order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  useEffect(() => { if (user) loadProjects(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Project title is required.'); return; }
    setSaving(true);
    const { error } = await supabase.from('projects').insert([{ ...form, student_id: user.id }]);
    if (error) { toast.error('Upload failed. Try again.'); }
    else { toast.success('Project uploaded! 🎉'); setForm({ title:'', project_type:'presentation', drive_link:'', video_link:'', description:'' }); loadProjects(); }
    setSaving(false);
  };

  const TYPE_ICONS = { presentation:'📊', video:'🎥', infographic:'🎨', essay:'📄', story:'✨', other:'📦' };
  const TYPE_COLORS = { presentation:'#6244eb', video:'#22d3ee', infographic:'#10b981', essay:'#f59e0b', story:'#fb7185', other:'#a49dff' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
      <div>
        <h1 style={{ color:'var(--gray-900)' }}>📤 My Projects</h1>
        <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>Upload your creative projects, videos, and presentations.</p>
      </div>

      {/* Upload form */}
      <div className="glass-card" style={{ padding:'28px', background:'#fff', border:'1px solid var(--gray-200)' }}>
        <h4 style={{ color:'var(--gray-900)', marginBottom:'20px' }}>➕ Upload New Project</h4>
        <form onSubmit={handleSubmit} id="project-upload-form">
          <div style={{ marginBottom:'14px' }}>
            <label htmlFor="proj-title">Project Title *</label>
            <input id="proj-title" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}
              placeholder="e.g. Social Media Infographic" required />
          </div>

          <div style={{ marginBottom:'14px' }}>
            <label htmlFor="proj-type">Project Type</label>
            <select id="proj-type" value={form.project_type} onChange={e=>setForm(p=>({...p,project_type:e.target.value}))}>
              <option value="presentation">📊 Presentation</option>
              <option value="video">🎥 Video / TikTok</option>
              <option value="infographic">🎨 Infographic / Poster</option>
              <option value="essay">📄 Essay / Reflection</option>
              <option value="story">✨ Digital Story</option>
              <option value="other">📦 Other</option>
            </select>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
            <div>
              <label htmlFor="proj-drive">Google Drive Link</label>
              <input id="proj-drive" value={form.drive_link} onChange={e=>setForm(p=>({...p,drive_link:e.target.value}))}
                placeholder="https://drive.google.com/..." />
            </div>
            <div>
              <label htmlFor="proj-video">Video / TikTok Link</label>
              <input id="proj-video" value={form.video_link} onChange={e=>setForm(p=>({...p,video_link:e.target.value}))}
                placeholder="https://tiktok.com/..." />
            </div>
          </div>

          <div style={{ marginBottom:'20px' }}>
            <label htmlFor="proj-desc">Description</label>
            <textarea id="proj-desc" value={form.description} rows={3}
              onChange={e=>setForm(p=>({...p,description:e.target.value}))}
              placeholder="Describe your project and what you learned..." />
          </div>

          <button type="submit" className="btn btn-primary" id="upload-submit-btn" disabled={saving}>
            {saving ? '⏳ Uploading...' : '📤 Upload Project'}
          </button>
        </form>
      </div>

      {/* My projects list */}
      <h3 style={{ color:'var(--gray-900)' }}>📁 My Uploaded Projects ({projects.length})</h3>
      {loading ? (
        <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'32px' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <div className="glass-card" style={{ padding:'48px', textAlign:'center', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'12px' }}>📁</div>
          <p style={{ color:'var(--gray-500)' }}>No projects yet. Upload your first one above!</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'16px' }}>
          {projects.map(p => (
            <div key={p.id} className="glass-card" style={{ padding:'22px', background:'#fff', border:'1px solid var(--gray-200)' }} id={`proj-${p.id}`}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
                <span style={{ fontSize:'2rem', color: TYPE_COLORS[p.project_type] || '#6244eb' }}>
                  {TYPE_ICONS[p.project_type] || '📦'}
                </span>
                <div>
                  <div style={{ fontWeight:700, color:'var(--gray-900)', fontSize:'.95rem' }}>{p.title}</div>
                  <div style={{ fontSize:'.75rem', color:'var(--gray-500)', textTransform:'capitalize' }}>{p.project_type}</div>
                </div>
                {p.grade && (
                  <span style={{ marginLeft:'auto', background:'rgba(245,158,11,.1)', color:'#d97706', border:'1px solid rgba(245,158,11,.2)', padding:'3px 10px', borderRadius:'999px', fontSize:'.82rem', fontWeight:800 }}>
                    {p.grade}
                  </span>
                )}
              </div>
              {p.description && <p style={{ fontSize:'.83rem', color:'var(--gray-600)', lineHeight:1.55, marginBottom:'12px' }}>{p.description}</p>}
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {p.drive_link && <a href={p.drive_link} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm" id={`drive-${p.id}`}>📁 Drive</a>}
                {p.video_link && <a href={p.video_link} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm" id={`video-${p.id}`}>🎥 Video</a>}
              </div>
              {p.feedback && (
                <div style={{ marginTop:'14px', padding:'12px', background:'rgba(98,68,235,.06)', border:'1px solid rgba(98,68,235,.15)', borderRadius:'10px', fontSize:'.84rem', color:'var(--gray-700)' }}>
                  <strong style={{ color:'var(--primary-700)' }}>💬 Teacher Feedback:</strong><br/>{p.feedback}
                </div>
              )}
              <div style={{ fontSize:'.72rem', color:'var(--gray-600)', marginTop:'10px' }}>
                {new Date(p.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
