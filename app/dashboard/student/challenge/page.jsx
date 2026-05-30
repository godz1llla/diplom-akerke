'use client';

import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';
import toast from 'react-hot-toast';

const TOPICS = [
  { id:'social-media',   icon:'📱', title:'Social Media',           color:'#6244eb' },
  { id:'tech-education', icon:'💻', title:'Technology in Education', color:'#22d3ee' },
  { id:'healthy-life',   icon:'🥗', title:'Healthy Lifestyle',       color:'#10b981' },
  { id:'environment',    icon:'🌱', title:'Environmental Problems',   color:'#f59e0b' },
];

export default function ChallengePage() {
  const { user } = useAuth();
  const [week, setWeek]   = useState(1);
  const [topic, setTopic] = useState('');
  const [form, setForm]   = useState({ video_link:'', description:'' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) { toast.error('Please choose a topic!'); return; }
    if (!form.video_link && !form.description) { toast.error('Please add a video link or description.'); return; }
    setSaving(true);
    const { error } = await supabase.from('challenge_submissions').insert([{
      student_id: user.id, topic, week, ...form
    }]);
    if (error) toast.error('Failed to submit. Try again.');
    else { toast.success('Challenge submitted! 🎉'); setForm({ video_link:'', description:'' }); setTopic(''); }
    setSaving(false);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
      <div>
        <h1 style={{ color:'var(--gray-900)' }}>🎥 Creative Video Challenge</h1>
        <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>
          Create a TikTok or vlog about your chosen topic. Phase 1: record. Phase 2: share and discuss.
        </p>
      </div>

      {/* Week selector */}
      <div style={{ display:'flex', gap:12 }}>
        {[1,2].map(w => (
          <button key={w} onClick={()=>setWeek(w)}
            className={`btn ${week===w ? 'btn-primary' : 'btn-secondary'}`}
            id={`week-${w}-btn`}>
            Phase {w} {w===1 ? '🎬 Plan & Record' : '🚀 Share & Discuss'}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="glass-card" style={{ padding:24, background:'#fff', border:'1px solid var(--gray-200)' }}>
        <h4 style={{ color:'var(--gray-900)', marginBottom:14 }}>
          {week===1 ? '🎬 Phase 1 — Plan & Record' : '🚀 Phase 2 — Share & Discuss'}
        </h4>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {(week===1 ? [
            'Choose your topic from the 4 themes',
            'Research and gather information about it',
            'Write a short script (30–60 seconds)',
            'Record your TikTok or Vlog video',
            'Edit and add subtitles',
          ] : [
            'Upload your video to Google Drive or TikTok',
            'Watch your classmates\' videos',
            'Leave comments and give peer feedback',
            'Discuss in class — share your opinions',
            'Write a final reflection about what you learned',
          ]).map((step, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
              <span style={{ width:24, height:24, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.72rem', fontWeight:800, color:'#fff', flexShrink:0 }}>{i+1}</span>
              <span style={{ fontSize:'.9rem', color:'var(--gray-700)' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic selection */}
      <div>
        <h3 style={{ color:'var(--gray-900)', marginBottom:14 }}>📌 Choose Your Topic</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
          {TOPICS.map(t => (
            <button key={t.id} onClick={()=>setTopic(t.id)}
              id={`topic-${t.id}`}
              style={{
                display:'flex', alignItems:'center', gap:14, padding:'16px 20px',
                background: topic===t.id ? `${t.color}12` : '#fff',
                border: `1px solid ${topic===t.id ? t.color : 'var(--gray-200)'}`,
                borderRadius:16, cursor:'pointer', textAlign:'left', transition:'all .2s',
                boxShadow:'var(--shadow-sm)',
              }}>
              <span style={{ fontSize:'1.8rem', color:t.color }}>{t.icon}</span>
              <span style={{ fontWeight:600, color: topic===t.id ? t.color : 'var(--gray-800)' }}>{t.title}</span>
              {topic===t.id && <span style={{ marginLeft:'auto', color:t.color }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Submit form */}
      <div className="glass-card" style={{ padding:24, background:'#fff', border:'1px solid var(--gray-200)' }}>
        <h4 style={{ color:'var(--gray-900)', marginBottom:16 }}>📤 Submit Phase {week} Work</h4>
        <form onSubmit={handleSubmit} id="challenge-form">
          <div style={{ marginBottom:14 }}>
            <label htmlFor="ch-video">🎥 Video / TikTok Link</label>
            <input id="ch-video" value={form.video_link}
              onChange={e=>setForm(p=>({...p,video_link:e.target.value}))}
              placeholder="https://tiktok.com/... or https://drive.google.com/..." />
          </div>
          <div style={{ marginBottom:20 }}>
            <label htmlFor="ch-desc">📝 Description / Reflection</label>
            <textarea id="ch-desc" rows={3} value={form.description}
              onChange={e=>setForm(p=>({...p,description:e.target.value}))}
              placeholder="Briefly describe your video and what you discussed..." />
          </div>
          <button type="submit" className="btn btn-amber" id="challenge-submit"
            disabled={saving || !topic}>
            {saving ? '⏳ Submitting...' : '🚀 Submit Challenge'}
          </button>
        </form>
      </div>
    </div>
  );
}
