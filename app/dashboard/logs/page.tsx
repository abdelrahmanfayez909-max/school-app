'use client';

import { useState, useEffect } from 'react';
import { Search, Download, Loader2, RefreshCcw } from 'lucide-react';
import { supabase, type Log } from '@/lib/supabase';

export default function LogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log =>
        (log.details || '').includes(searchTerm) ||
        (log.action || '').includes(searchTerm)
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>سجل العمليات</h1>
                    <p className="text-muted">مراقبة كافة التحركات والعمليات على النظام</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="البحث في السجل..."
                            className="input-field"
                            style={{ paddingRight: '40px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={fetchLogs} className="btn btn-outline">
                        <RefreshCcw size={18} />
                    </button>
                    <button className="btn btn-outline">
                        <Download size={18} />
                        <span>تصدير</span>
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                    <table>
                        <thead>
                            <tr>
                                <th>العملية</th>
                                <th>التفاصيل</th>
                                <th>المستخدم</th>
                                <th>التاريخ والوقت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>
                                        <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            <Loader2 className="animate-spin" />
                                            <span>جاري تحميل السجل...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        لا توجد عمليات مسجلة.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td>
                                            <span className={`status-badge ${log.action?.includes('إضافة') ? 'status-success' :
                                                    log.action?.includes('حذف') ? 'status-error' :
                                                        log.action?.includes('تعديل') ? 'status-warning' : 'status-info'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td>{log.details}</td>
                                        <td>{log.user_id}</td>
                                        <td style={{ direction: 'ltr', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            {new Date(log.created_at).toLocaleString('ar-EG')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
