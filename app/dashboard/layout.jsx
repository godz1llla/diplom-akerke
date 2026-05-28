'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styles from './dashboard.module.css';

const STUDENT_NAV = [
  { href: '/dashboard/student',           icon: '🏠', label: 'Home' },
  { href: '/dashboard/student/reading',   icon: '📖', label: 'Reading' },
  { href: '/dashboard/student/quiz',      icon: '🧠', label: 'Quizzes' },
  { href: '/dashboard/student/errors',    icon: '🔍', label: 'Error Journal' },
  { href: '/dashboard/student/challenge', icon: '🎥', label: 'Challenge' },
  { href: '/dashboard/student/upload',    icon: '📤', label: 'My Projects' },
  { href: '/dashboard/student/progress',  icon: '📊', label: 'My Progress' },
];

const ADMIN_NAV = [
  { href: '/dashboard/admin',              icon: '📊', label: 'Overview' },
  { href: '/dashboard/admin/students',     icon: '👥', label: 'Students' },
  { href: '/dashboard/admin/projects',     icon: '📁', label: 'Projects' },
  { href: '/dashboard/admin/reflections',  icon: '✨', label: 'Reflections' },
  { href: '/dashboard/admin/analytics',    icon: '📈', label: 'Analytics' },
  { href: '/dashboard/admin/texts',        icon: '📖', label: 'Manage Texts' },
  { href: '/dashboard/admin/quizzes',      icon: '🧠', label: 'Manage Quizzes' },
];

export default function DashboardLayout({ children }) {
  const { user, profile, loading, signOut } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = profile?.role === 'admin';
  const navItems = isAdmin ? ADMIN_NAV : STUDENT_NAV;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* Logo */}
        <Link href="/" className={styles.sidebarLogo}>CriticalMinds ✦</Link>

        {/* Role badge */}
        <div className={styles.roleBadge}>
          <span>{isAdmin ? '👩‍🏫 Teacher' : '🎓 Student'}</span>
          <span className={styles.roleName}>{profile?.full_name || user.email}</span>
          {profile?.class && <span className={styles.roleClass}>{profile.class}</span>}
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard/student' && item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {active && <span className={styles.activeDot} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: sign out */}
        <div className={styles.sidebarBottom}>
          <button onClick={handleSignOut} className={styles.signOutBtn} id="signout-btn">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.pageTitle}>
              {navItems.find(n => pathname === n.href || pathname.startsWith(n.href))?.icon}{' '}
              {navItems.find(n => pathname === n.href || pathname.startsWith(n.href))?.label || 'Dashboard'}
            </div>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.userChip}>
              <div className={styles.userAvatar}>{(profile?.full_name || user.email)[0].toUpperCase()}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{profile?.full_name || 'User'}</span>
                <span className={styles.userRole}>{isAdmin ? 'Administrator' : `Student${profile?.class ? ' · ' + profile.class : ''}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
