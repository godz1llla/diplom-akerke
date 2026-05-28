'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';

export default function AdminAnalyticsPage() {
  const [data, setData]     = useState({ results:[], avgByQuiz:{}, topStudents:[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: results } = await supabase
        .from('quiz_results')
        .select('*, profiles(full_name, class), quizzes(title)');

      if (!results) { setLoading(false); return; }

      // Avg score per quiz
      const avgByQuiz = {};
      results.forEach(r => {
        const t = r.quizzes?.title || 'Unknown';
        if (!avgByQuiz[t]) avgByQuiz[t] = { total:0, count:0 };
        avgByQuiz[t].total += r.percentage || 0;
        avgByQuiz[t].count += 1;
      });
      Object.keys(avgByQuiz).forEach(k => {
        avgByQuiz[k].avg = Math.round(avgByQuiz[k].total / avgByQuiz[k].count);
      });

      // Top students
      const byStudent = {};
      results.forEach(r => {
        const n = r.profiles?.full_name || 'Unknown';
        if (!byStudent[n]) byStudent[n] = { scores:[], class: r.profiles?.class };
        byStudent[n].scores.push(r.percentage || 0);
      });
      const topStudents = Object.entries(byStudent)
        .map(([name, d]) => ({ name, class: d.class, avg: Math.round(d.scores.reduce((a,b)=>a+b,0)/d.scores.length), count: d.scores.length }))
        .sort((a,b) => b.avg - a.avg)
        .slice(0, 10);

      setData({ results, avgByQuiz, topStudents });
      setLoading(false);
    }
    load();
  }, []);

  const totalAttempts = data.results.length;
  const overallAvg = totalAttempts ? Math.round(data.results.reduce((a,r)=>a+(r.percentage||0),0)/totalAttempts) : 0;
  const passRate = totalAttempts ? Math.round(data.results.filter(r=>r.percentage>=60).length/totalAttempts*100) : 0;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
      <div>
        <h1 style={{ color:'#f0f0ff' }}>📈 Analytics</h1>
        <p style={{ color:'var(--gray-400)', marginTop:'6px' }}>Comprehensive overview of student performance and learning outcomes.</p>
      </div>

      {/* Key metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        {[
          { icon:'🎯', value:`${overallAvg}%`, label:'Overall Average Score', color:'#6244eb' },
          { icon:'✅', value:`${passRate}%`,   label:'Pass Rate (≥60%)',       color:'#10b981' },
          { icon:'📝', value:totalAttempts,     label:'Total Quiz Attempts',   color:'#22d3ee' },
          { icon:'🏆', value:data.topStudents[0]?.name?.split(' ')[0] || '—', label:'Top Student', color:'#f59e0b' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding:22, textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:'1.8rem', fontWeight:800, color:s.color, marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:'.78rem', color:'var(--gray-400)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pre vs Post Test Comparison */}
      <div className="glass-card" style={{ padding:28 }}>
        <h3 style={{ color:'#f0f0ff', marginBottom:24 }}>📊 Quiz Performance by Topic</h3>
        {Object.keys(data.avgByQuiz).length === 0 ? (
          <p style={{ color:'var(--gray-400)', textAlign:'center', padding:24 }}>No quiz data yet.</p>
        ) : Object.entries(data.avgByQuiz).map(([title, d]) => (
          <div key={title} style={{ marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:'.88rem' }}>
              <span style={{ color:'var(--gray-200)', fontWeight:600 }}>{title}</span>
              <span style={{ color: d.avg >= 75 ? 'var(--emerald-400)' : d.avg >= 50 ? 'var(--amber-400)' : 'var(--rose-400)', fontWeight:700 }}>{d.avg}% avg · {d.count} attempts</span>
            </div>
            <div style={{ height:10, background:'rgba(255,255,255,.06)', borderRadius:999, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${d.avg}%`, background:'var(--gradient-primary)', borderRadius:999, transition:'width 1.5s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Top students */}
      <div>
        <h3 style={{ color:'#f0f0ff', marginBottom:16 }}>🏆 Top Students Leaderboard</h3>
        <div className="glass-card" style={{ overflow:'hidden' }}>
          {loading ? (
            <p style={{ color:'var(--gray-400)', textAlign:'center', padding:32 }}>Loading...</p>
          ) : data.topStudents.length === 0 ? (
            <p style={{ color:'var(--gray-400)', textAlign:'center', padding:32 }}>No data yet.</p>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid var(--bg-border)' }}>
                  {['#','Student','Class','Avg Score','Quizzes Taken'].map(h => (
                    <th key={h} style={{ padding:'12px 20px', textAlign:'left', fontSize:'.75rem', fontWeight:700, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.topStudents.map((s, i) => (
                  <tr key={s.name} style={{ borderBottom: i < data.topStudents.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                    <td style={{ padding:'12px 20px' }}>
                      <span style={{ fontSize:'1.2rem' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`}</span>
                    </td>
                    <td style={{ padding:'12px 20px', fontWeight:600, color:'#f0f0ff', fontSize:'.9rem' }}>{s.name}</td>
                    <td style={{ padding:'12px 20px', color:'var(--gray-400)', fontSize:'.85rem' }}>{s.class || '—'}</td>
                    <td style={{ padding:'12px 20px' }}>
                      <span style={{ fontWeight:800, color: s.avg >= 75 ? 'var(--emerald-400)' : 'var(--amber-400)', fontSize:'.95rem' }}>{s.avg}%</span>
                    </td>
                    <td style={{ padding:'12px 20px', color:'var(--gray-400)', fontSize:'.88rem' }}>{s.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
