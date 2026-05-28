'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../context/AuthContext';

export default function ProgressPage() {
  const { user, profile } = useAuth();
  const [results, setResults] = useState([]);
  const [projects, setProjects] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('quiz_results').select('*, quizzes(title)').eq('student_id', user.id).order('completed_at', { ascending: false }),
      supabase.from('projects').select('*').eq('student_id', user.id).order('created_at', { ascending: false }),
      supabase.from('error_journals').select('id').eq('student_id', user.id),
    ]).then(([rRes, pRes, jRes]) => {
      setResults(rRes.data || []);
      setProjects(pRes.data || []);
      setJournals(jRes.data || []);
      setLoading(false);
    });
  }, [user]);

  const avgScore = results.length ? Math.round(results.reduce((a, r) => a + (r.percentage || 0), 0) / results.length) : 0;
  const passCount = results.filter(r => r.percentage >= 60).length;

  const SKILLS = [
    { label:'Critical Thinking',   pre:52, post: avgScore > 0 ? Math.min(avgScore+20,99) : 52,    icon:'🧠', color:'#6244eb' },
    { label:'Self-Assessment',     pre:38, post: journals.length > 0 ? Math.min(38+journals.length*8,99) : 38, icon:'🔍', color:'#22d3ee' },
    { label:'Digital Creativity',  pre:61, post: projects.length > 0 ? Math.min(61+projects.length*10,99) : 61, icon:'🎨', color:'#10b981' },
    { label:'Quiz Performance',    pre:44, post: avgScore || 44,                                    icon:'📊', color:'#f59e0b' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
      <div>
        <h1 style={{ color:'#f0f0ff' }}>📊 My Progress</h1>
        <p style={{ color:'var(--gray-400)', marginTop:'6px' }}>Track your growth across all learning activities.</p>
      </div>

      {/* Summary stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        {[
          { icon:'🧠', value:results.length,    label:'Quizzes Taken',    color:'#6244eb' },
          { icon:'📊', value:`${avgScore}%`,    label:'Average Score',     color:'#22d3ee' },
          { icon:'📁', value:projects.length,   label:'Projects Uploaded', color:'#10b981' },
          { icon:'📝', value:journals.length,   label:'Journal Entries',   color:'#f59e0b' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding:22, textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:'2.2rem', fontWeight:800, color:s.color, marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:'.78rem', color:'var(--gray-400)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Skills progress (pre vs estimated post) */}
      <div className="glass-card" style={{ padding:28 }}>
        <h3 style={{ color:'#f0f0ff', marginBottom:24 }}>📈 Skills Development (Estimated)</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {SKILLS.map(s => (
            <div key={s.label}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:'.88rem' }}>
                <span style={{ color:'var(--gray-200)', fontWeight:600 }}>{s.icon} {s.label}</span>
                <span style={{ color:'var(--gray-400)' }}>
                  <span style={{ color:'var(--gray-600)' }}>Before: {s.pre}%</span>
                  {' → '}
                  <span style={{ color:s.color, fontWeight:700 }}>Now: {s.post}%</span>
                </span>
              </div>
              <div style={{ height:8, background:'rgba(255,255,255,.05)', borderRadius:999, overflow:'hidden', marginBottom:4 }}>
                <div style={{ display:'flex', height:'100%' }}>
                  <div style={{ width:`${s.pre}%`, background:'rgba(124,106,245,.2)', transition:'width 1.5s ease' }} />
                  <div style={{ width:`${s.post-s.pre}%`, background:`linear-gradient(90deg, ${s.color}88, ${s.color})`, transition:'width 1.5s ease' }} />
                </div>
              </div>
              <div style={{ fontSize:'.75rem', color:'var(--emerald-400)', fontWeight:700 }}>
                +{s.post - s.pre}% growth
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz history */}
      <div>
        <h3 style={{ color:'#f0f0ff', marginBottom:14 }}>🧠 Quiz History</h3>
        {loading ? (
          <p style={{ color:'var(--gray-400)', textAlign:'center', padding:24 }}>Loading...</p>
        ) : results.length === 0 ? (
          <div className="glass-card" style={{ padding:'40px', textAlign:'center' }}>
            <div style={{ fontSize:'3rem', marginBottom:12 }}>🧠</div>
            <p style={{ color:'var(--gray-400)' }}>No quizzes taken yet. <a href="/dashboard/student/quiz" style={{ color:'var(--primary-300)' }}>Take your first quiz →</a></p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {results.map((r, i) => {
              const pct = Math.round(r.percentage || 0);
              return (
                <div key={r.id} className="glass-card" style={{ padding:'16px 22px', display:'flex', alignItems:'center', gap:16 }} id={`result-row-${r.id}`}>
                  <span style={{ fontSize:'1.3rem' }}>{pct >= 75 ? '🎉' : pct >= 50 ? '📚' : '🔍'}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, color:'#f0f0ff', fontSize:'.9rem', marginBottom:2 }}>{r.quizzes?.title}</div>
                    <div style={{ height:4, background:'rgba(255,255,255,.05)', borderRadius:999, overflow:'hidden', maxWidth:200 }}>
                      <div style={{ height:'100%', width:`${pct}%`, background:'var(--gradient-primary)', borderRadius:999 }} />
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:800, fontSize:'1.1rem', color: pct>=75?'var(--emerald-400)':pct>=50?'var(--amber-400)':'var(--rose-400)' }}>{pct}%</div>
                    <div style={{ fontSize:'.72rem', color:'var(--gray-600)' }}>{r.score}/{r.total} · {new Date(r.completed_at).toLocaleDateString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
