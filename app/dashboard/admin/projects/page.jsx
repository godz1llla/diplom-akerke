'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [feedback, setFeedback] = useState({});
  const [grades, setGrades]     = useState({});

  useEffect(() => {
    supabase.from('projects').select('*, profiles(full_name, class)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setProjects(data || []); setLoading(false); });
  }, []);

  const handleSaveFeedback = async (id) => {
    const { error } = await supabase.from('projects').update({
      feedback: feedback[id] || '',
      grade: grades[id] || null,
    }).eq('id', id);
    if (error) toast.error('Failed to save.'); else toast.success('Feedback saved! ✅');
    setProjects(prev => prev.map(p => p.id === id ? { ...p, feedback: feedback[id], grade: grades[id] } : p));
  };

  const TYPE_ICONS = { presentation:'📊', video:'🎥', infographic:'🎨', essay:'📄', story:'✨', other:'📦' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
      <div>
        <h1 style={{ color:'var(--gray-900)' }}>📁 Student Projects</h1>
        <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>Review and give feedback on all submitted projects.</p>
      </div>

      {loading ? (
        <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'32px' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <div className="glass-card" style={{ padding:'48px', textAlign:'center', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'12px' }}>📁</div>
          <p style={{ color:'var(--gray-500)' }}>No projects submitted yet.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {projects.map(p => (
            <div key={p.id} className="glass-card" style={{ padding:'24px', background:'#fff', border:'1px solid var(--gray-200)' }} id={`admin-proj-${p.id}`}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'16px', marginBottom:'16px' }}>
                <span style={{ fontSize:'2rem' }}>{TYPE_ICONS[p.project_type] || '📦'}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:'var(--gray-900)', fontSize:'1rem', marginBottom:'4px' }}>{p.title}</div>
                  <div style={{ fontSize:'.8rem', color:'var(--gray-500)' }}>
                    👤 {p.profiles?.full_name} {p.profiles?.class ? `· ${p.profiles.class}` : ''} · {new Date(p.created_at).toLocaleDateString()} · <em>{p.project_type}</em>
                  </div>
                  {p.description && <p style={{ fontSize:'.84rem', color:'var(--gray-700)', marginTop:'8px', lineHeight:1.55 }}>{p.description}</p>}
                </div>
              </div>

              <div style={{ display:'flex', gap:'10px', marginBottom:'16px', flexWrap:'wrap' }}>
                {p.drive_link && <a href={p.drive_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" id={`view-drive-${p.id}`}>📁 View Drive</a>}
                {p.video_link && <a href={p.video_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" id={`view-video-${p.id}`}>🎥 Watch Video</a>}
              </div>

              {/* Feedback form */}
              <div style={{ borderTop:'1px solid var(--gray-200)', paddingTop:'16px', display:'grid', gridTemplateColumns:'1fr auto', gap:'12px', alignItems:'end' }}>
                <div>
                  <label htmlFor={`grade-${p.id}`} style={{ fontSize:'.78rem', marginBottom:'4px', display:'block', color:'var(--gray-600)' }}>Grade</label>
                  <select id={`grade-${p.id}`}
                    defaultValue={p.grade || ''}
                    onChange={e=>setGrades(prev=>({...prev,[p.id]:e.target.value}))}
                    style={{ width:120 }}>
                    <option value="">—</option>
                    {['A+','A','A-','B+','B','B-','C+','C'].map(g=><option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div style={{ flex:1, gridColumn:'1 / -1' }}>
                  <label htmlFor={`fb-${p.id}`} style={{ fontSize:'.78rem', marginBottom:'4px', display:'block', color:'var(--gray-600)' }}>Teacher Feedback</label>
                  <div style={{ display:'flex', gap:'10px' }}>
                    <textarea id={`fb-${p.id}`} rows={2} defaultValue={p.feedback || ''}
                      onChange={e=>setFeedback(prev=>({...prev,[p.id]:e.target.value}))}
                      placeholder="Leave feedback for the student..." style={{ flex:1 }} />
                    <button onClick={()=>handleSaveFeedback(p.id)} className="btn btn-primary btn-sm"
                      id={`save-fb-${p.id}`} style={{ alignSelf:'flex-end' }}>💾 Save</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
