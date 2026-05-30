'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats]   = useState({ students:0, quizzes:0, projects:0, reflections:0 });
  const [recent, setRecent] = useState({ projects:[], results:[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [sRes, qRes, pRes, rRes, recentP, recentR] = await Promise.all([
        supabase.from('profiles').select('id', {count:'exact'}).eq('role','student'),
        supabase.from('quizzes').select('id', {count:'exact'}),
        supabase.from('projects').select('id', {count:'exact'}),
        supabase.from('reflections').select('id', {count:'exact'}),
        supabase.from('projects').select('*, profiles(full_name,class)').order('created_at', {ascending:false}).limit(5),
        supabase.from('quiz_results').select('*, profiles(full_name), quizzes(title)').order('completed_at', {ascending:false}).limit(5),
      ]);
      setStats({ students: sRes.count||0, quizzes: qRes.count||0, projects: pRes.count||0, reflections: rRes.count||0 });
      setRecent({ projects: recentP.data||[], results: recentR.data||[] });
      setLoading(false);
    }
    load();
  }, []);

  const QUICK_ACTIONS = [
    { href:'/dashboard/admin/students',    icon:'👥', label:'Manage Students',  color:'#6244eb', desc:`${stats.students} registered` },
    { href:'/dashboard/admin/quizzes',     icon:'🧠', label:'Manage Quizzes',   color:'#22d3ee', desc:`${stats.quizzes} quizzes` },
    { href:'/dashboard/admin/projects',    icon:'📁', label:'Review Projects',  color:'#10b981', desc:`${stats.projects} submitted` },
    { href:'/dashboard/admin/reflections', icon:'✨', label:'Reflections',       color:'#f59e0b', desc:`${stats.reflections} entries` },
    { href:'/dashboard/admin/analytics',   icon:'📈', label:'Analytics',        color:'#fb7185', desc:'View full results' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 style={{ color:'var(--gray-900)' }}>👩‍🏫 Admin Dashboard</h1>
        <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>Overview of all student activity and platform metrics.</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { icon:'🎓', value:stats.students,    label:'Students',           color:'#6244eb' },
          { icon:'🧠', value:stats.quizzes,     label:'Quizzes Created',    color:'#22d3ee' },
          { icon:'📁', value:stats.projects,    label:'Projects Submitted', color:'#10b981' },
          { icon:'✨', value:stats.reflections, label:'Reflections Written', color:'#f59e0b' },
        ].map(s => (
          <div key={s.label} className={`${styles.statCard} glass-card`}>
            <div style={{ fontSize:'2rem', color:s.color, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:'2.4rem', fontWeight:800, color:s.color, marginBottom:4 }}>{s.value}</div>
            <div style={{ fontSize:'.8rem', color:'var(--gray-400)', fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={styles.sectionTitle}>⚡ Quick Actions</div>
      <div className={styles.actionsGrid}>
        {QUICK_ACTIONS.map(a => (
          <Link key={a.href} href={a.href} className={`${styles.actionCard} glass-card`} id={`admin-action-${a.label.toLowerCase().replace(' ','')}`}>
            <span style={{ fontSize:'1.8rem', color:a.color }}>{a.icon}</span>
            <div>
              <div style={{ fontWeight:700, color:'var(--gray-800)', fontSize:'.95rem' }}>{a.label}</div>
              <div style={{ fontSize:'.78rem', color:'var(--gray-500)' }}>{a.desc}</div>
            </div>
            <span style={{ marginLeft:'auto', color:'var(--gray-600)' }}>→</span>
          </Link>
        ))}
      </div>

      <div className={styles.twoCol}>
        {/* Recent Projects */}
        <div>
          <div className={styles.sectionTitle}>📁 Recent Project Submissions</div>
          <div className={`${styles.recentCard} glass-card`}>
            {recent.projects.length === 0 ? (
              <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'24px' }}>No projects yet.</p>
            ) : recent.projects.map(p => (
              <div key={p.id} className={styles.recentRow} id={`recent-proj-${p.id}`}>
                <div className={styles.recentIcon}>📄</div>
                <div>
                  <div style={{ fontSize:'.88rem', fontWeight:600, color:'var(--gray-800)' }}>{p.title}</div>
                  <div style={{ fontSize:'.75rem', color:'var(--gray-500)' }}>
                    {p.profiles?.full_name} {p.profiles?.class ? `· ${p.profiles.class}` : ''} · {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
                <span style={{ marginLeft:'auto', fontSize:'.72rem', textTransform:'capitalize', color:'var(--primary-300)', background:'rgba(98,68,235,.12)', padding:'3px 8px', borderRadius:'999px', flexShrink:0 }}>
                  {p.project_type}
                </span>
              </div>
            ))}
            <Link href="/dashboard/admin/projects" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:'.82rem', color:'var(--primary-300)', fontWeight:600, textDecoration:'none' }}>
              View all →
            </Link>
          </div>
        </div>

        {/* Recent Quiz Results */}
        <div>
          <div className={styles.sectionTitle}>🧠 Recent Quiz Results</div>
          <div className={`${styles.recentCard} glass-card`}>
            {recent.results.length === 0 ? (
              <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'24px' }}>No results yet.</p>
            ) : recent.results.map(r => {
              const pct = Math.round(r.percentage || 0);
              return (
                <div key={r.id} className={styles.recentRow} id={`recent-result-${r.id}`}>
                  <div className={styles.recentIcon}>🎯</div>
                  <div>
                    <div style={{ fontSize:'.88rem', fontWeight:600, color:'var(--gray-800)' }}>{r.profiles?.full_name}</div>
                    <div style={{ fontSize:'.75rem', color:'var(--gray-500)' }}>{r.quizzes?.title} · {new Date(r.completed_at).toLocaleDateString()}</div>
                  </div>
                  <span style={{ marginLeft:'auto', fontWeight:800, fontSize:'.9rem', color: pct >= 75 ? 'var(--emerald-400)' : pct >= 50 ? 'var(--amber-400)' : 'var(--rose-400)', flexShrink:0 }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
            <Link href="/dashboard/admin/analytics" style={{ display:'block', textAlign:'center', marginTop:14, fontSize:'.82rem', color:'var(--primary-300)', fontWeight:600, textDecoration:'none' }}>
              View analytics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
