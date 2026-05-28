'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabase';
import toast from 'react-hot-toast';

export default function StudentDetailPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const [profile,    setProfile]    = useState(null);
  const [results,    setResults]    = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [journals,   setJournals]   = useState([]);
  const [reflections, setReflections] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState('overview');

  useEffect(() => {
    async function load() {
      const [pRes, rRes, prRes, jRes, rfRes, chRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        supabase.from('quiz_results').select('*, quizzes(title)').eq('student_id', id).order('completed_at', { ascending: false }),
        supabase.from('projects').select('*').eq('student_id', id).order('created_at', { ascending: false }),
        supabase.from('error_journals').select('*').eq('student_id', id).order('created_at', { ascending: false }),
        supabase.from('reflections').select('*').eq('student_id', id).order('created_at', { ascending: false }),
        supabase.from('challenge_submissions').select('*').eq('student_id', id).order('created_at', { ascending: false }),
      ]);
      setProfile(pRes.data);
      setResults(rRes.data || []);
      setProjects(prRes.data || []);
      setJournals(jRes.data || []);
      setReflections(rfRes.data || []);
      setChallenges(chRes.data || []);
      setLoading(false);
    }
    load();
  }, [id]);

  const avgScore = results.length ? Math.round(results.reduce((a,r) => a + (r.percentage||0), 0) / results.length) : 0;

  const saveFeedback = async (projId, feedback, grade) => {
    await supabase.from('projects').update({ feedback, grade }).eq('id', projId);
    toast.success('Feedback saved!');
    setProjects(prev => prev.map(p => p.id === projId ? { ...p, feedback, grade } : p));
  };

  const TABS = [
    { id:'overview',    label:'📊 Overview' },
    { id:'quizzes',     label:'🧠 Quizzes' },
    { id:'projects',    label:'📁 Projects' },
    { id:'journal',     label:'🔍 Error Journal' },
    { id:'challenges',  label:'🎥 Challenges' },
    { id:'reflections', label:'✨ Reflections' },
  ];

  if (loading) return <div style={{ textAlign:'center', padding:60, color:'var(--gray-400)' }}>Loading student data...</div>;
  if (!profile) return <div style={{ textAlign:'center', padding:60, color:'var(--rose-400)' }}>Student not found.</div>;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <button onClick={() => router.back()} style={{ background:'none', border:'1px solid var(--bg-border)', color:'var(--gray-400)', borderRadius:999, padding:'8px 16px', cursor:'pointer', fontFamily:'var(--font-outfit)', fontSize:'.88rem' }}>← Back</button>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:50, height:50, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color:'#fff', fontSize:'1.3rem' }}>
            {profile.full_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ color:'#f0f0ff', fontSize:'1.6rem' }}>{profile.full_name}</h1>
            <div style={{ fontSize:'.85rem', color:'var(--gray-400)' }}>
              🎓 Student {profile.class ? `· Class ${profile.class}` : ''} · Joined {new Date(profile.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
        {[
          { icon:'🧠', value:results.length,     label:'Quizzes',    color:'#6244eb' },
          { icon:'📊', value:`${avgScore}%`,      label:'Avg Score',  color:'#22d3ee' },
          { icon:'📁', value:projects.length,     label:'Projects',   color:'#10b981' },
          { icon:'📝', value:journals.length,     label:'Journal',    color:'#f59e0b' },
          { icon:'✨', value:reflections.length,  label:'Reflections',color:'#fb7185' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding:18, textAlign:'center' }}>
            <div style={{ fontSize:'1.6rem', marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:'1.6rem', fontWeight:800, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'.72rem', color:'var(--gray-400)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="glass-card" style={{ padding:22 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:'.88rem' }}>
          <span style={{ color:'var(--gray-300)', fontWeight:600 }}>Overall Learning Progress</span>
          <span style={{ color:'var(--primary-300)', fontWeight:700 }}>{avgScore}% avg quiz score</span>
        </div>
        <div style={{ height:10, background:'rgba(255,255,255,.05)', borderRadius:999, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${avgScore}%`, background:'var(--gradient-primary)', borderRadius:999, transition:'width 1.5s ease' }} />
        </div>
        <div style={{ display:'flex', gap:20, marginTop:12, fontSize:'.78rem', color:'var(--gray-500)' }}>
          {[results.length > 0 && '✅ Started quizzes', projects.length > 0 && '✅ Uploaded projects', journals.length > 0 && '✅ Wrote journal', reflections.length > 0 && '✅ Final reflection done'].filter(Boolean).map(s => <span key={s}>{s}</span>)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', borderBottom:'1px solid var(--bg-border)', paddingBottom:4 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} id={`tab-${t.id}`}
            style={{ background: tab===t.id ? 'rgba(98,68,235,.2)' : 'none', border:`1px solid ${tab===t.id ? 'rgba(98,68,235,.5)' : 'transparent'}`, color: tab===t.id ? 'var(--primary-200)' : 'var(--gray-400)', borderRadius:999, padding:'7px 16px', cursor:'pointer', fontFamily:'var(--font-outfit)', fontSize:'.84rem', fontWeight: tab===t.id ? 700 : 400, transition:'all .2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {/* Quiz history */}
          <div className="glass-card" style={{ padding:22 }}>
            <h4 style={{ color:'#f0f0ff', marginBottom:14, fontSize:'1rem' }}>🧠 Quiz Results</h4>
            {results.length === 0 ? <p style={{ color:'var(--gray-500)', fontSize:'.85rem' }}>No quizzes taken yet.</p> : results.slice(0,5).map(r => {
              const pct = Math.round(r.percentage||0);
              return (
                <div key={r.id} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <span style={{ fontSize:'.8rem', color:'var(--gray-400)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.quizzes?.title}</span>
                  <span style={{ fontWeight:700, fontSize:'.88rem', color: pct>=75?'var(--emerald-400)':pct>=50?'var(--amber-400)':'var(--rose-400)', flexShrink:0 }}>{pct}%</span>
                </div>
              );
            })}
          </div>
          {/* Projects */}
          <div className="glass-card" style={{ padding:22 }}>
            <h4 style={{ color:'#f0f0ff', marginBottom:14, fontSize:'1rem' }}>📁 Projects</h4>
            {projects.length === 0 ? <p style={{ color:'var(--gray-500)', fontSize:'.85rem' }}>No projects uploaded yet.</p> : projects.slice(0,5).map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <span style={{ fontSize:'.8rem', color:'var(--gray-300)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</span>
                {p.grade && <span style={{ fontWeight:700, fontSize:'.82rem', color:'var(--amber-400)', flexShrink:0 }}>{p.grade}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'quizzes' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {results.length === 0 ? <div className="glass-card" style={{ padding:40, textAlign:'center' }}><p style={{ color:'var(--gray-400)' }}>No quiz results yet.</p></div> : results.map(r => {
            const pct = Math.round(r.percentage||0);
            return (
              <div key={r.id} className="glass-card" style={{ padding:'16px 22px', display:'flex', alignItems:'center', gap:16 }}>
                <span style={{ fontSize:'1.3rem' }}>{pct>=75?'🎉':pct>=50?'📚':'🔍'}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, color:'#f0f0ff', fontSize:'.9rem', marginBottom:4 }}>{r.quizzes?.title}</div>
                  <div style={{ fontSize:'.75rem', color:'var(--gray-500)' }}>{new Date(r.completed_at).toLocaleDateString()} · {r.score}/{r.total} correct</div>
                </div>
                <span style={{ fontWeight:800, fontSize:'1.2rem', color: pct>=75?'var(--emerald-400)':pct>=50?'var(--amber-400)':'var(--rose-400)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'projects' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {projects.length === 0 ? <div className="glass-card" style={{ padding:40, textAlign:'center' }}><p style={{ color:'var(--gray-400)' }}>No projects yet.</p></div> : projects.map(p => (
            <div key={p.id} className="glass-card" style={{ padding:22 }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:14 }}>
                <div>
                  <div style={{ fontWeight:700, color:'#f0f0ff', marginBottom:4 }}>{p.title}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--gray-500)' }}>{p.project_type} · {new Date(p.created_at).toLocaleDateString()}</div>
                  {p.description && <p style={{ fontSize:'.83rem', color:'var(--gray-400)', marginTop:8, lineHeight:1.55 }}>{p.description}</p>}
                  <div style={{ display:'flex', gap:8, marginTop:10 }}>
                    {p.drive_link && <a href={p.drive_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">📁 Drive</a>}
                    {p.video_link && <a href={p.video_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">🎥 Video</a>}
                  </div>
                </div>
              </div>
              {/* Feedback form */}
              <div style={{ borderTop:'1px solid var(--bg-border)', paddingTop:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:12, alignItems:'end' }}>
                  <div>
                    <label style={{ fontSize:'.75rem' }}>Grade</label>
                    <select defaultValue={p.grade||''} id={`grade-sel-${p.id}`}
                      style={{ width:90 }}
                      onChange={e => setProjects(prev => prev.map(pr => pr.id === p.id ? { ...pr, grade: e.target.value } : pr))}>
                      <option value="">—</option>
                      {['A+','A','A-','B+','B','B-','C+','C'].map(g=><option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:'.75rem' }}>Feedback</label>
                    <input defaultValue={p.feedback||''} id={`fb-input-${p.id}`}
                      placeholder="Leave feedback..." style={{ width:'100%' }} />
                  </div>
                  <button className="btn btn-primary btn-sm" id={`save-fb-${p.id}`}
                    onClick={() => {
                      const fb = document.getElementById(`fb-input-${p.id}`)?.value || '';
                      const gr = document.getElementById(`grade-sel-${p.id}`)?.value || '';
                      saveFeedback(p.id, fb, gr);
                    }}>
                    💾 Save
                  </button>
                </div>
                {p.feedback && <div style={{ marginTop:10, padding:10, background:'rgba(98,68,235,.08)', borderRadius:8, fontSize:'.82rem', color:'var(--gray-300)' }}>💬 {p.feedback}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'journal' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {journals.length === 0 ? <div className="glass-card" style={{ padding:40, textAlign:'center' }}><p style={{ color:'var(--gray-400)' }}>No journal entries yet.</p></div> : journals.map((j, i) => (
            <div key={j.id} className="glass-card" style={{ padding:'18px 22px', borderLeft:'3px solid var(--primary-500)' }}>
              <div style={{ fontSize:'.72rem', color:'var(--gray-500)', marginBottom:8 }}>Entry #{journals.length - i} · {new Date(j.created_at).toLocaleDateString()}</div>
              <div style={{ fontSize:'.88rem', color:'var(--rose-400)', background:'rgba(244,63,94,.06)', padding:'6px 10px', borderRadius:6, fontFamily:'monospace', marginBottom:6 }}>❌ {j.error_text}</div>
              <div style={{ fontSize:'.88rem', color:'var(--emerald-400)', background:'rgba(16,185,129,.06)', padding:'6px 10px', borderRadius:6, fontFamily:'monospace', marginBottom:8 }}>✅ {j.correction}</div>
              {j.reason && <div style={{ fontSize:'.82rem', color:'var(--gray-400)' }}>💡 {j.reason}</div>}
              {j.what_learned && <div style={{ fontSize:'.82rem', color:'var(--primary-300)', marginTop:4 }}>📚 {j.what_learned}</div>}
            </div>
          ))}
        </div>
      )}

      {tab === 'challenges' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {challenges.length === 0 ? <div className="glass-card" style={{ padding:40, textAlign:'center' }}><p style={{ color:'var(--gray-400)' }}>No challenge submissions yet.</p></div> : challenges.map(c => (
            <div key={c.id} className="glass-card" style={{ padding:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontWeight:700, color:'#f0f0ff' }}>📌 {c.topic.replace(/-/g,' ')}</span>
                <span style={{ fontSize:'.78rem', color:'var(--gray-500)' }}>Week {c.week} · {new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              {c.description && <p style={{ fontSize:'.85rem', color:'var(--gray-400)', lineHeight:1.55, marginBottom:10 }}>{c.description}</p>}
              {c.video_link && <a href={c.video_link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">🎥 Watch Video</a>}
            </div>
          ))}
        </div>
      )}

      {tab === 'reflections' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {reflections.length === 0 ? <div className="glass-card" style={{ padding:40, textAlign:'center' }}><p style={{ color:'var(--gray-400)' }}>No reflections yet.</p></div> : reflections.map(r => (
            <div key={r.id} className="glass-card" style={{ padding:24 }}>
              <div style={{ fontSize:'.78rem', color:'var(--gray-500)', marginBottom:14 }}>{new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[['📚','What I learned',r.what_learned],['📈','How I improved',r.how_improved],['🔥','What was difficult',r.what_difficult],['⭐','Most useful task',r.most_useful]].map(([icon,label,val]) => val && (
                  <div key={label} style={{ background:'rgba(255,255,255,.03)', padding:'12px 14px', borderRadius:10 }}>
                    <div style={{ fontSize:'.72rem', fontWeight:700, color:'var(--gray-500)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>{icon} {label}</div>
                    <p style={{ fontSize:'.86rem', color:'var(--gray-300)', lineHeight:1.6 }}>{val}</p>
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
