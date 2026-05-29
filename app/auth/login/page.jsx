'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    // Fetch role and redirect
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    toast.success('Welcome back! 🎉');
    // Hard redirect — ensures AuthContext loads fresh session before dashboard renders
    const dest = profile?.role === 'admin' ? '/dashboard/admin' : '/dashboard/student';
    window.location.href = dest;
  };

  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />

      <div className={styles.card}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>CriticalMinds ✦</Link>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to continue your learning journey</p>

        <form onSubmit={handleLogin} className={styles.form} id="login-form">
          <div className={styles.field}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            id="login-submit-btn"
            disabled={loading}
          >
            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
          </button>
        </form>

        <div className={styles.dividerRow}>
          <span />
          <p>Don't have an account?</p>
          <span />
        </div>

        <Link href="/auth/register" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }} id="go-register-btn">
          Create Account
        </Link>

        <div className={styles.demoHint}>
          <p>🧪 Demo accounts:</p>
          <div className={styles.demoAccounts}>
            <span><strong>Admin:</strong> admin@criticalminds.edu</span>
            <span><strong>Student:</strong> student@criticalminds.edu</span>
            <span><strong>Password:</strong> demo1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}
