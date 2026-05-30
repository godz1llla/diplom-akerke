'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import styles from './student.module.css';

const QUICK_LINKS = [
  { href: '/dashboard/student/tasks',     icon: '📚', label: 'Textbook Tasks',   color: '#fb923c', desc: 'Explore the 10-week program' },
  { href: '/dashboard/student/reading',   icon: '📖', label: 'Read Texts',       color: '#6244eb', desc: 'Start with today\'s reading' },
  { href: '/dashboard/student/quiz',      icon: '🧠', label: 'Take a Quiz',      color: '#22d3ee', desc: 'Test your comprehension' },
  { href: '/dashboard/student/errors',    icon: '🔍', label: 'Error Journal',    color: '#f59e0b', desc: 'Analyze your mistakes' },
  { href: '/dashboard/student/challenge', icon: '🎥', label: 'Creative Challenge', color: '#10b981', desc: 'Submit speaking & video tasks' },
  { href: '/dashboard/student/upload',    icon: '📤', label: 'Upload Project',   color: '#fb7185', desc: 'Submit your creative work' },
  { href: '/dashboard/student/progress',  icon: '📊', label: 'My Progress',      color: '#a49dff', desc: 'See your growth over time' },
];

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ quizzes: 0, projects: 0, reflections: 0, avgScore: 0 });
  const [recentResults, setRecentResults] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [qRes, pRes, rRes] = await Promise.all([
        supabase.from('quiz_results').select('score, total, percentage, completed_at, quizzes(title)').eq('student_id', user.id).order('completed_at', { ascending: false }).limit(5),
        supabase.from('projects').select('id', { count: 'exact' }).eq('student_id', user.id),
        supabase.from('reflections').select('id', { count: 'exact' }).eq('student_id', user.id),
      ]);
      const results = qRes.data || [];
      const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.percentage || 0), 0) / results.length) : 0;
      setStats({ quizzes: results.length, projects: pRes.count || 0, reflections: rRes.count || 0, avgScore: avg });
      setRecentResults(results);
    }
    load();
  }, [user]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className={styles.page}>
      {/* Welcome */}
      <div className={styles.welcome}>
        <div>
          <p className={styles.greetingText}>{greeting} 👋</p>
          <h1 className={styles.welcomeTitle}>
            Welcome back, <span className="gradient-text">{profile?.full_name?.split(' ')[0] || 'Student'}!</span>
          </h1>
          <p className={styles.welcomeSub}>Continue your learning journey. Every step counts.</p>
        </div>
        <div className={styles.welcomeBadge}>
          <span>🏆</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--gray-800)', fontSize: '0.9rem' }}>Learning Streak</div>
            <div style={{ color: 'var(--amber-500)', fontWeight: 800, fontSize: '1.4rem' }}>Keep it up!</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { icon: '🧠', value: stats.quizzes,     label: 'Quizzes Completed',  color: '#6244eb' },
          { icon: '📊', value: `${stats.avgScore}%`, label: 'Average Score',    color: '#22d3ee' },
          { icon: '📤', value: stats.projects,    label: 'Projects Uploaded',   color: '#10b981' },
          { icon: '✨', value: stats.reflections, label: 'Reflections Written', color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className={`${styles.statCard} glass-card`}>
            <div className={styles.statIcon} style={{ color: s.color }}>{s.icon}</div>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={styles.sectionTitle}>📚 Learning Stages</div>
      <div className={styles.quickGrid}>
        {QUICK_LINKS.map((link, i) => (
          <Link key={link.href} href={link.href} className={`${styles.quickCard} glass-card`} id={`quick-${i}`}>
            <div className={styles.quickNum} style={{ color: link.color }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className={styles.quickIcon} style={{ color: link.color }}>{link.icon}</div>
            <div className={styles.quickLabel}>{link.label}</div>
            <div className={styles.quickDesc}>{link.desc}</div>
            <div className={styles.quickArrow} style={{ color: link.color }}>→</div>
          </Link>
        ))}
      </div>

      {/* Recent Quiz Results */}
      {recentResults.length > 0 && (
        <>
          <div className={styles.sectionTitle}>📝 Recent Quiz Results</div>
          <div className={`${styles.resultsCard} glass-card`}>
            {recentResults.map((r, i) => (
              <div key={i} className={styles.resultRow}>
                <div className={styles.resultName}>{r.quizzes?.title || 'Quiz'}</div>
                <div className={styles.resultBar}>
                  <div className={styles.resultFill} style={{ width: `${r.percentage || 0}%` }} />
                </div>
                <div className={styles.resultPct} style={{
                  color: r.percentage >= 75 ? '#059669' : r.percentage >= 50 ? '#d97706' : '#e11d48'
                }}>
                  {Math.round(r.percentage || 0)}%
                </div>
              </div>
            ))}
            <Link href="/dashboard/student/progress" className={styles.viewAllLink} id="view-all-progress">
              View full progress →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
