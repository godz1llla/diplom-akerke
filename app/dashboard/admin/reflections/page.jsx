'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';

export default function AdminReflectionsPage() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    supabase.from('reflections')
      .select('*, profiles(full_name, class)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setReflections(data || []); setLoading(false); });
  }, []);

  const filtered = reflections.filter(r =>
    r.profiles?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.profiles?.class?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 style={{ color:'var(--gray-900)' }}>✨ Student Reflections</h1>
        <p style={{ color:'var(--gray-500)', marginTop:6 }}>Read all student final reflections — their learning insights and self-assessment.</p>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Search by student name or class..."
          style={{ maxWidth:400 }} id="ref-search" />
        <span style={{ fontSize:'.82rem', color:'var(--gray-500)' }}>{filtered.length} reflections</span>
      </div>

      {loading ? (
        <p style={{ color:'var(--gray-500)', textAlign:'center', padding:40 }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ padding:48, textAlign:'center', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>✨</div>
          <p style={{ color:'var(--gray-500)' }}>No reflections yet.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {filtered.map(r => (
            <div key={r.id} className="glass-card" style={{ padding:24, background:'#fff', border:'1px solid var(--gray-200)' }} id={`reflection-${r.id}`}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, paddingBottom:14, borderBottom:'1px solid var(--gray-100)' }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#fff', flexShrink:0 }}>
                  {r.profiles?.full_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div style={{ fontWeight:700, color:'var(--gray-900)' }}>{r.profiles?.full_name}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--gray-500)' }}>
                    {r.profiles?.class ? `Class ${r.profiles.class} · ` : ''}{new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
                  </div>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[
                  ['📚', 'What I learned', r.what_learned],
                  ['📈', 'How I improved', r.how_improved],
                  ['🔥', 'What was difficult', r.what_difficult],
                  ['⭐', 'Most useful task', r.most_useful],
                ].map(([icon, label, value]) => value && (
                  <div key={label} style={{ background:'var(--gray-50)', borderRadius:10, padding:'14px 16px', border:'1px solid var(--gray-200)' }}>
                    <div style={{ fontSize:'.75rem', fontWeight:700, color:'var(--gray-500)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>
                      {icon} {label}
                    </div>
                    <p style={{ fontSize:'.88rem', color:'var(--gray-800)', lineHeight:1.6 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
