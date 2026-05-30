'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.from('profiles').select('*, quiz_results(count), projects(count)').eq('role', 'student')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setStudents(data || []); setLoading(false); });
  }, []);

  const filtered = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.class?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePromote = async (id) => {
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', id);
    toast.success('Student promoted to admin.');
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
      <div>
        <h1 style={{ color:'var(--gray-900)' }}>👥 Students</h1>
        <p style={{ color:'var(--gray-500)', marginTop:'6px' }}>All registered students and their activity summary.</p>
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="🔍 Search by name or class..." style={{ maxWidth:400 }} id="student-search" />

      {loading ? (
        <p style={{ color:'var(--gray-500)', textAlign:'center', padding:'32px' }}>Loading students...</p>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ padding:'48px', textAlign:'center', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <div style={{ fontSize:'3rem', marginBottom:'12px' }}>👥</div>
          <p style={{ color:'var(--gray-500)' }}>No students found.</p>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow:'hidden', background:'#fff', border:'1px solid var(--gray-200)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--gray-200)' }}>
                {['Student','Class','Quizzes','Projects','Joined','Actions'].map(h => (
                  <th key={h} style={{ padding:'14px 20px', textAlign:'left', fontSize:'.78rem', fontWeight:700, color:'var(--gray-500)', textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} id={`student-row-${s.id}`}
                  style={{ borderBottom: '1px solid var(--gray-100)', transition:'background .2s', cursor:'pointer' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(98,68,235,.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                  onClick={() => router.push(`/dashboard/admin/students/${s.id}`)}>
                  <td style={{ padding:'14px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--gradient-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:'#fff', fontSize:'.88rem', flexShrink:0 }}>
                        {s.full_name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight:600, color:'var(--gray-900)', fontSize:'.9rem' }}>{s.full_name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'14px 20px', fontSize:'.85rem', color:'var(--gray-600)' }}>{s.class || '—'}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.9rem', fontWeight:600, color:'var(--primary-700)' }}>{s.quiz_results?.[0]?.count || 0}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.9rem', fontWeight:600, color:'var(--accent-700)' }}>{s.projects?.[0]?.count || 0}</td>
                  <td style={{ padding:'14px 20px', fontSize:'.78rem', color:'var(--gray-500)' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td style={{ padding:'14px 20px' }}>
                    <span style={{ fontSize:'.78rem', color:'var(--primary-700)', fontWeight:600 }}>View Details →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
