'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminTextsPage() {
  const { user } = useAuth();
  const router   = useRouter();
  const [texts, setTexts]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editText, setEditText]   = useState(null);
  const [form, setForm] = useState({ title:'', content:'', source:'', level:'intermediate', topic:'' });
  const [saving, setSaving]       = useState(false);

  async function load() {
    const { data } = await supabase.from('texts').select('*').order('created_at', { ascending: false });
    setTexts(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditText(null); setForm({ title:'', content:'', source:'', level:'intermediate', topic:'' }); setShowForm(true); };
  const openEdit   = (t) => { setEditText(t); setForm({ title:t.title, content:t.content, source:t.source||'', level:t.level, topic:t.topic||'' }); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Title and content are required.'); return; }
    setSaving(true);
    if (editText) {
      await supabase.from('texts').update({ ...form }).eq('id', editText.id);
      toast.success('Text updated! ✅');
    } else {
      await supabase.from('texts').insert([{ ...form, created_by: user.id }]);
      toast.success('Text created! ✅');
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this text?')) return;
    await supabase.from('texts').delete().eq('id', id);
    toast.success('Deleted.');
    load();
  };

  const LEVEL_COLORS = { beginner:'#10b981', intermediate:'#6244eb', advanced:'#fb7185' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ color:'#f0f0ff' }}>📖 Reading Texts</h1>
          <p style={{ color:'var(--gray-400)', marginTop:6 }}>Create and manage reading texts for students.</p>
        </div>
        <button onClick={openCreate} className="btn btn-primary" id="create-text-btn">➕ Add New Text</button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="glass-card" style={{ padding:28 }}>
          <h3 style={{ color:'#f0f0ff', marginBottom:20 }}>{editText ? '✏️ Edit Text' : '➕ Create Text'}</h3>
          <form onSubmit={handleSave} id="text-form">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <div>
                <label htmlFor="tf-title">Title *</label>
                <input id="tf-title" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Text title" required />
              </div>
              <div>
                <label htmlFor="tf-topic">Topic</label>
                <input id="tf-topic" value={form.topic} onChange={e=>setForm(p=>({...p,topic:e.target.value}))} placeholder="e.g. Social Media" />
              </div>
              <div>
                <label htmlFor="tf-level">Level</label>
                <select id="tf-level" value={form.level} onChange={e=>setForm(p=>({...p,level:e.target.value}))}>
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🔵 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
              </div>
              <div>
                <label htmlFor="tf-source">Source</label>
                <input id="tf-source" value={form.source} onChange={e=>setForm(p=>({...p,source:e.target.value}))} placeholder="e.g. BBC Learning English, 2026" />
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label htmlFor="tf-content">Content *</label>
              <textarea id="tf-content" value={form.content} rows={10}
                onChange={e=>setForm(p=>({...p,content:e.target.value}))}
                placeholder="Paste the full text here. Use blank lines between paragraphs." required />
              <div style={{ fontSize:'.75rem', color:'var(--gray-500)', marginTop:4 }}>
                💡 Tip: Use blank lines between paragraphs. Write discussion questions at the end.
              </div>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button type="submit" className="btn btn-primary" id="tf-save" disabled={saving}>
                {saving ? '⏳ Saving...' : '💾 Save Text'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} id="tf-cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Texts list */}
      {loading ? (
        <p style={{ color:'var(--gray-400)', textAlign:'center', padding:40 }}>Loading...</p>
      ) : texts.length === 0 && !showForm ? (
        <div className="glass-card" style={{ padding:48, textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>📖</div>
          <p style={{ color:'var(--gray-400)' }}>No texts yet. Create your first reading text!</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {texts.map(t => (
            <div key={t.id} className="glass-card" style={{ padding:'18px 22px', display:'flex', alignItems:'flex-start', gap:16 }} id={`text-item-${t.id}`}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:'.72rem', fontWeight:700, padding:'2px 8px', borderRadius:999, background:`${LEVEL_COLORS[t.level]}18`, color:LEVEL_COLORS[t.level], border:`1px solid ${LEVEL_COLORS[t.level]}33`, textTransform:'uppercase' }}>
                    {t.level}
                  </span>
                  {t.topic && <span style={{ fontSize:'.78rem', color:'var(--gray-500)' }}>📌 {t.topic}</span>}
                </div>
                <div style={{ fontWeight:700, color:'#f0f0ff', marginBottom:4 }}>{t.title}</div>
                <div style={{ fontSize:'.8rem', color:'var(--gray-500)' }}>
                  {t.content.slice(0, 100)}... · {t.content.length} chars · {new Date(t.created_at).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                <button onClick={() => openEdit(t)} className="btn btn-secondary btn-sm" id={`edit-text-${t.id}`}>✏️ Edit</button>
                <button onClick={() => handleDelete(t.id)} className="btn btn-sm" id={`del-text-${t.id}`}
                  style={{ background:'rgba(244,63,94,.1)', border:'1px solid rgba(244,63,94,.3)', color:'var(--rose-400)', cursor:'pointer', borderRadius:999, padding:'8px 14px', fontFamily:'var(--font-outfit)', fontSize:'.82rem' }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
