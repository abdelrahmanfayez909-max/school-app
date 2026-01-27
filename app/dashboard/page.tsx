'use client';

import { useEffect, useState } from 'react';
import { UserCheck, TrendingUp, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        students_count: 0,
        attendance_today: 0,
        attendance_percentage: 0
    });
    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];

            // Parallel Fetching
            const [students, logs, attendance] = await Promise.all([
                supabase.from('students').select('*', { count: 'exact', head: true }),
                supabase.from('logs').select('*').order('created_at', { ascending: false }).limit(5),
                supabase.from('attendance').select('*').eq('date', today)
            ]);

            // حساب الحضور
            const totalStudents = students.count || 0;
            const attendanceToday = attendance.data?.filter((a: any) => a.status === 'present').length || 0;
            const attendancePercentage = totalStudents > 0 ? Math.round((attendanceToday / totalStudents) * 100) : 0;

            setStats({
                students_count: totalStudents,
                attendance_today: attendanceToday,
                attendance_percentage: attendancePercentage
            });

            setRecentLogs(logs.data || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            title: 'إجمالي الطلاب',
            value: stats.students_count,
            icon: GraduationCap,
            trend: '+12 هذا الأسبوع',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'الحضور اليوم',
            value: `${stats.attendance_today}/${stats.students_count}`,
            subtitle: `${stats.attendance_percentage}%`,
            icon: UserCheck,
            trend: `معدل الحضور ${stats.attendance_percentage}%`,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        }
    ];

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '50vh' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style jsx>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>نظرة عامة</h1>
                    <p style={{ color: 'var(--text-muted)' }}>مرحباً بك في لوحة تحكم المدرسة الرقمية.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => router.push('/dashboard/reports')} className="btn btn-outline">
                        <Calendar size={18} />
                        <span>تقارير اليوم</span>
                    </button>
                    <button onClick={fetchDashboardData} className="btn btn-primary" style={{ background: 'var(--primary)' }}>
                        <RefreshCcwIcon size={18} />
                        <span>تحديث البيانات</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card"
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `4px solid currentColor`, color: card.color.includes('blue') ? '#2563eb' : card.color.includes('emerald') ? '#10b981' : card.color.includes('amber') ? '#d97706' : '#4f46e5' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{card.title}</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.25rem' }}>{card.value}</h3>
                                {(card as any).subtitle && <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{(card as any).subtitle}</p>}
                            </div>
                            <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: card.bg.replace('bg-', 'var(--').replace('-50', '-50)'), backgroundColor: '#f1f5f9' }}>
                                <card.icon size={24} />
                            </div>
                        </div>
                        <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                            <TrendingUp size={14} />
                            <span>{card.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
                {/* Recent Activity Section */}
                <div className="card" style={{ gridColumn: 'span 12' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '700' }}>سجل النشاطات الحديثة</h3>
                        <button onClick={() => router.push('/dashboard/logs')} style={{ color: 'var(--brand)', fontSize: '0.9rem', fontWeight: '600' }}>عرض الكل</button>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>النشاط</th>
                                    <th>المستخدم</th>
                                    <th>التوقيت</th>
                                    <th>الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>لا توجد بيانات حالياً</td>
                                    </tr>
                                ) : (
                                    recentLogs.map((log) => (
                                        <tr key={log.id}>
                                            <td style={{ fontWeight: '600' }}>{log.action}</td>
                                            <td>{log.user_id || 'System'}</td>
                                            <td style={{ direction: 'ltr', textAlign: 'right' }}>
                                                {new Date(log.created_at).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td>
                                                <span className="status-badge status-info">مكتمل</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RefreshCcwIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    )
}
