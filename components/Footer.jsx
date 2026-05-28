import styles from './Footer.module.css';

const SECTIONS = [
  { label: 'Home', href: '#home' },
  { label: 'Learning Process', href: '#learning' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Error Analysis', href: '#errors' },
  { label: '2-Week Challenge', href: '#challenge' },
  { label: 'Project Gallery', href: '#gallery' },
  { label: 'Upload Project', href: '#upload' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Results', href: '#results' },
  { label: 'Final Reflection', href: '#reflection' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top divider glow */}
      <div className={styles.topGlow} />

      <div className="container">
        <div className={styles.inner}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>CriticalMinds ✦</div>
            <p className={styles.tagline}>
              Developing critical and creative thinking in high school students
              through digital linguistic tools and online learning platforms.
            </p>
            <div className={styles.badges}>
              <span className="badge badge-primary">Diploma Project</span>
              <span className="badge badge-accent">2024</span>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.navBlock}>
            <h5 className={styles.colTitle}>Site Sections</h5>
            <div className={styles.navGrid}>
              {SECTIONS.map((s) => (
                <a key={s.href} href={s.href} className={styles.navLink}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoBlock}>
            <h5 className={styles.colTitle}>Project Info</h5>
            <div className={styles.infoList}>
              {[
                ['🎓', 'Diploma Research Project'],
                ['📚', 'Subject: English Language Methodology'],
                ['🏫', 'High School — Grades 10–11'],
                ['🛠️', 'Stack: Next.js + Supabase + Vercel'],
                ['🌐', 'Tools: Newsela, BBC Learning, Google Docs'],
                ['📅', 'Academic Year: 2023–2024'],
              ].map(([icon, text]) => (
                <div key={text} className={styles.infoItem}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 CriticalMinds — Diploma Project. Built with Next.js &amp; Supabase, deployed on Vercel.
          </p>
          <div className={styles.bottomRight}>
            <span className={styles.madeWith}>Made with ❤️ for education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
