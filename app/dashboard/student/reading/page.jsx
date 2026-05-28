'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import styles from './reading.module.css';

const LEVEL_COLORS = { beginner: '#10b981', intermediate: '#6244eb', advanced: '#fb7185' };

export default function ReadingPage() {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeText, setActiveText] = useState(null);

  useEffect(() => {
    supabase.from('texts').select('*').order('created_at').then(({ data }) => {
      setTexts(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>Loading texts...</div>;

  if (activeText) {
    return (
      <div className={styles.readerPage}>
        <button onClick={() => setActiveText(null)} className={styles.backBtn} id="back-to-texts">
          ← Back to Texts
        </button>

        <div className={`${styles.readerCard} glass-card`}>
          <div className={styles.readerHeader}>
            <span className={styles.levelTag} style={{ background: `${LEVEL_COLORS[activeText.level]}22`, color: LEVEL_COLORS[activeText.level], border: `1px solid ${LEVEL_COLORS[activeText.level]}44` }}>
              {activeText.level}
            </span>
            {activeText.topic && <span className={styles.topicTag}>📌 {activeText.topic}</span>}
          </div>
          <h1 className={styles.readerTitle}>{activeText.title}</h1>
          {activeText.source && <p className={styles.readerSource}>Source: {activeText.source}</p>}

          <div className={styles.readerContent}>
            {activeText.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: '16px', color: para.startsWith('Discussion') || para.startsWith('Critical') ? 'var(--accent-400)' : 'var(--gray-300)', fontWeight: para.startsWith('Discussion') || para.startsWith('Critical') ? 600 : 400 }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.afterRead}>
          <h3 style={{ color: '#f0f0ff', marginBottom: '16px' }}>✅ Finished reading? What's next?</h3>
          <div className={styles.nextSteps}>
            <Link href="/dashboard/student/quiz" className={`${styles.nextBtn} glass-card`} id="go-to-quiz">
              <span>🧠</span>
              <div>
                <div style={{ fontWeight: 700, color: '#f0f0ff' }}>Take the Quiz</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Test your comprehension</div>
              </div>
            </Link>
            <Link href="/dashboard/student/errors" className={`${styles.nextBtn} glass-card`} id="go-to-journal">
              <span>🔍</span>
              <div>
                <div style={{ fontWeight: 700, color: '#f0f0ff' }}>Open Error Journal</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Analyze and reflect</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 style={{ color: '#f0f0ff' }}>📖 Reading Texts</h1>
        <p style={{ color: 'var(--gray-400)', marginTop: '6px' }}>Choose a text to read, then take the quiz to test your comprehension.</p>
      </div>

      <div className={styles.externalLinks}>
        <a href="https://newsela.com" target="_blank" rel="noopener noreferrer" className={`${styles.extCard} glass-card`} id="newsela-link">
          <span style={{ fontSize: '2rem' }}>📰</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f0f0ff' }}>Newsela</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>Leveled news articles</div>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--gray-500)', fontSize: '0.8rem' }}>↗ Open</span>
        </a>
        <a href="https://www.bbc.co.uk/learningenglish" target="_blank" rel="noopener noreferrer" className={`${styles.extCard} glass-card`} id="bbc-link">
          <span style={{ fontSize: '2rem' }}>🎙️</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f0f0ff' }}>BBC Learning English</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>Authentic English materials</div>
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--gray-500)', fontSize: '0.8rem' }}>↗ Open</span>
        </a>
      </div>

      <h2 style={{ color: '#f0f0ff', fontSize: '1.1rem', fontWeight: 700, marginTop: '8px' }}>📄 Platform Texts</h2>
      <div className={styles.textGrid}>
        {texts.map((text) => (
          <div key={text.id} className={`${styles.textCard} glass-card`} id={`text-${text.id}`}>
            <div className={styles.textCardHeader}>
              <span className={styles.levelTag}
                style={{ background: `${LEVEL_COLORS[text.level]}18`, color: LEVEL_COLORS[text.level], border: `1px solid ${LEVEL_COLORS[text.level]}33` }}>
                {text.level}
              </span>
              {text.topic && <span className={styles.topicSmall}>📌 {text.topic}</span>}
            </div>
            <h3 className={styles.textTitle}>{text.title}</h3>
            <p className={styles.textPreview}>{text.content.slice(0, 120)}...</p>
            {text.source && <p className={styles.textSource}>Source: {text.source}</p>}
            <button onClick={() => setActiveText(text)} className="btn btn-primary btn-sm"
              style={{ marginTop: '16px', width: '100%' }} id={`read-${text.id}`}>
              📖 Read Text
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
