'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#home',       label: 'Home' },
  { href: '#learning',   label: 'Learning' },
  { href: '#quiz',       label: 'Quiz' },
  { href: '#challenge',  label: 'Challenge' },
  { href: '#gallery',    label: 'Gallery' },
  { href: '#upload',     label: 'Upload' },
  { href: '#feedback',   label: 'Feedback' },
  { href: '#results',    label: 'Results' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        {/* Logo */}
        <a href="#home" className="nav-logo">
          CriticalMinds ✦
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="/auth/login" className="btn btn-secondary btn-sm" id="nav-login-btn">
            Sign In
          </a>
          <a href="/auth/register" className="btn btn-primary btn-sm" id="nav-register-btn">
            🚀 Start Learning
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(11,11,26,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(124,106,245,0.18)',
          padding: '24px',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: '1rem', fontWeight: 600, color: '#e8e8ff', display: 'block', padding: '8px 0' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
