'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ fullName: '', email: '', password: '', class: '', role: 'student' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
          class: form.class,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Account created! 🎉');
    router.push(form.role === 'admin' ? '/dashboard/admin' : '/dashboard/student');
  };

  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />

      <div className={styles.card}>
        <Link href="/" className={styles.logo}>CriticalMinds ✦</Link>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join the CriticalMinds learning platform</p>

        <form onSubmit={handleRegister} className={styles.form} id="register-form">
          <div className={styles.field}>
            <label htmlFor="reg-name">Full Name *</label>
            <input id="reg-name" name="fullName" value={form.fullName}
              onChange={handleChange} placeholder="Asel Mukanova" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-email">Email *</label>
            <input id="reg-email" name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="your@email.com" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="reg-password">Password *</label>
            <input id="reg-password" name="password" type="password" value={form.password}
              onChange={handleChange} placeholder="At least 6 characters" required />
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label htmlFor="reg-class">Class</label>
              <input id="reg-class" name="class" value={form.class}
                onChange={handleChange} placeholder="e.g. 10A" />
            </div>
            <div className={styles.field}>
              <label htmlFor="reg-role">Role *</label>
              <select id="reg-role" name="role" value={form.role} onChange={handleChange}>
                <option value="student">🎓 Student</option>
                <option value="admin">👩‍🏫 Teacher / Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}
            id="register-submit-btn" disabled={loading}>
            {loading ? '⏳ Creating account...' : '✨ Create Account'}
          </button>
        </form>

        <div className={styles.dividerRow}>
          <span /><p>Already have an account?</p><span />
        </div>

        <Link href="/auth/login" className="btn btn-secondary"
          style={{ width: '100%', textAlign: 'center' }} id="go-login-btn">
          Sign In
        </Link>
      </div>
    </div>
  );
}
