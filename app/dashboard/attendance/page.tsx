'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Check, X, Ban } from 'lucide-react';

export default function AttendancePage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [grade, setGrade] = useState('الصف الأول الابتدائي');
    const [classGroup, setClassGroup] = useState('1/1');
    const [students, setStudents] = useState<any[]>([]);
    const [attendanceMap, setAttendanceMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchStudentsAndAttendance = async () => {
        setLoading(true);
        try {
            // 1. Get Students in this class (including all statuses)
            const { data: studentsData } = await supabase
                .from('students')
                .select('id, full_name, status, gender')
                .eq('grade', grade)
                .eq('class_group', classGroup)
                .order('full_name');

            if (!studentsData || studentsData.length === 0) {
                setStudents([]);
                setLoading(false);
                return;
            }

            // 2. Get today's attendance records
            const { data: attData } = await supabase
                .from('attendance')
                .select('student_id, status')
                .eq('date', date)
                .in('student_id', studentsData.map(s => s.id));

            const newAttMap: Record<string, string> = {};

            if (attData) {
                attData.forEach((a: any) => {
                    newAttMap[a.student_id] = a.status;
                });
            }

            setStudents(studentsData);
            setAttendanceMap(newAttMap);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (grade && classGroup) {
            fetchStudentsAndAttendance();
        }
    }, [grade, classGroup, date]);

    const handleStatusChange = (studentId: string, status: string) => {
        setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
    };

    const saveAttendance = async () => {
        setSaving(true);
        try {
            // Prepare upsert
            const updates = Object.keys(attendanceMap).map(studentId => ({
                student_id: studentId,
                date: date,
                status: attendanceMap[studentId]
            }));

            // Clean old (simple way for now) and insert new
            if (updates.length > 0) {
                const ids = updates.map(u => u.student_id);
                await supabase.from('attendance').delete().eq('date', date).in('student_id', ids);
                await supabase.from('attendance').insert(updates);
            }
            alert('تم حفظ البيانات بنجاح');
        } catch (error) {
            console.error(error);
            alert('خطأ أثناء الحفظ');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>رصد الغياب اليومي</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" style={{ width: 'auto' }} />
                    <button onClick={saveAttendance} disabled={saving} className="btn btn-primary">
                        <Save size={18} />
                        <span>{saving ? 'جاري الحفظ...' : 'حفظ الكل'}</span>
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="label">الصف الدراسي</label>
                    <select value={grade} onChange={(e) => setGrade(e.target.value)} className="input-field">
                        <optgroup label="المرحلة الابتدائية">
                            <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
                            <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
                            <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
                            <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
                            <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
                            <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
                        </optgroup>
                        <optgroup label="المرحلة الإعدادية">
                            <option value="الصف الأول الإعدادي">الصف الأول الإعدادي</option>
                            <option value="الصف الثاني الإعدادي">الصف الثاني الإعدادي</option>
                            <option value="الصف الثالث الإعدادي">الصف الثالث الإعدادي</option>
                        </optgroup>
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="label">الفصل</label>
                    <input value={classGroup} onChange={(e) => setClassGroup(e.target.value)} className="input-field" placeholder="مثال 1/1" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={fetchStudentsAndAttendance} className="btn btn-outline" style={{ height: '42px' }}>عرض القائمة</button>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                {loading ? (
                    <div className="flex-center" style={{ padding: '3rem' }}>جاري التحميل...</div>
                ) : students.length === 0 ? (
                    <div className="flex-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>لا يوجد طلاب مسجلين في هذا الفصل</div>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>#</th>
                                    <th>اسم الطالب</th>
                                    <th style={{ width: '150px' }}>الحالة</th>
                                    <th style={{ textAlign: 'center', width: '450px' }}>تسجيل الغياب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, i) => {
                                    const status = attendanceMap[student.id];
                                    const studentStatus = student.status;
                                    
                                    // إذا كان الطالب منقطع، لا نسجل له حضور
                                    const isDropped = studentStatus === 'transferred' || studentStatus === 'expelled' || studentStatus === 'graduated';
                                    
                                    return (
                                        <tr key={student.id} style={{ 
                                            background: status === 'absent' ? '#fff1f2' : status === 'dropped' ? '#f3f4f6' : 'white',
                                            opacity: isDropped ? 0.6 : 1
                                        }}>
                                            <td>{i + 1}</td>
                                            <td style={{ fontWeight: 600 }}>
                                                {student.full_name}
                                                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                                    {student.gender === 'male' ? '♂️ ذكر' : '♀️ أنثى'}
                                                </div>
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.9rem',
                                                    background: isDropped ? '#f3f4f6' : 
                                                               status === 'present' ? '#dcfce7' :
                                                               status === 'absent' ? '#fee2e2' :
                                                               status === 'excused' ? '#fef3c7' :
                                                               '#f3f4f6',
                                                    color: isDropped ? '#6b7280' :
                                                           status === 'present' ? '#166534' :
                                                           status === 'absent' ? '#991b1b' :
                                                           status === 'excused' ? '#b45309' :
                                                           '#6b7280'
                                                }}>
                                                    {isDropped ? '❌ منقطع' :
                                                     status === 'present' ? '✓ حاضر' :
                                                     status === 'absent' ? '✗ غائب' :
                                                     status === 'excused' ? '📄 إذن' :
                                                     '- لم يتم التسجيل'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleStatusChange(student.id, 'present')}
                                                        disabled={isDropped}
                                                        className={`btn ${status === 'present' ? 'btn-primary' : 'btn-outline'}`}
                                                        style={{ 
                                                            background: status === 'present' ? '#16a34a' : 'white', 
                                                            borderColor: status === 'present' ? '#16a34a' : '#d1d5db', 
                                                            color: status === 'present' ? 'white' : 'black', 
                                                            padding: '0.4rem 0.8rem',
                                                            opacity: isDropped ? 0.5 : 1,
                                                            cursor: isDropped ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        <Check size={16} />
                                                        حاضر
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(student.id, 'absent')}
                                                        disabled={isDropped}
                                                        className={`btn ${status === 'absent' ? 'btn-primary' : 'btn-outline'}`}
                                                        style={{ 
                                                            background: status === 'absent' ? '#dc2626' : 'white', 
                                                            borderColor: status === 'absent' ? '#dc2626' : '#d1d5db', 
                                                            color: status === 'absent' ? 'white' : 'black', 
                                                            padding: '0.4rem 0.8rem',
                                                            opacity: isDropped ? 0.5 : 1,
                                                            cursor: isDropped ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        <X size={16} />
                                                        غائب
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(student.id, 'excused')}
                                                        disabled={isDropped}
                                                        className={`btn ${status === 'excused' ? 'btn-primary' : 'btn-outline'}`}
                                                        style={{ 
                                                            background: status === 'excused' ? '#f59e0b' : 'white', 
                                                            borderColor: status === 'excused' ? '#f59e0b' : '#d1d5db', 
                                                            color: status === 'excused' ? 'white' : 'black', 
                                                            padding: '0.4rem 0.8rem',
                                                            opacity: isDropped ? 0.5 : 1,
                                                            cursor: isDropped ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        📄
                                                        إذن
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
