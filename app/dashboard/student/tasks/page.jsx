'use client';

import BookTasksSection from '../../../../components/BookTasksSection';

export default function StudentTasksPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ color: 'var(--gray-900)' }}>📚 Textbook Tasks</h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '6px' }}>
          Explore the 10-week Bloom's Taxonomy learning program and complete activities.
        </p>
      </div>
      
      <div className="glass-card" style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '12px' }}>
        <BookTasksSection />
      </div>
    </div>
  );
}
