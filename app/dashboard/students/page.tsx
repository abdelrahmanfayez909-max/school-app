'use client';

import { useState, useEffect, Suspense } from 'react';
import {
    Plus,
    Search,
    Download,
    Trash2,
    Loader2,
    RefreshCcw,
    Edit,
    FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { exportToExcel } from '@/lib/export';
import { useSearchParams } from 'next/navigation';

type Student = {
    id: string;
    full_name: string;
    national_id: string;
    birth_date: string;
    gender: 'male' | 'female';
    religion: 'muslim' | 'christian';
    grade: string;
    class_group: string;
    phone: string;
    parent_job: string;
    address: string;
    status: 'active' | 'transferred' | 'expelled' | 'graduated';
    created_at: string;
};

function StudentsContent() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    // Initial Form State
    const initialFormState = {
        full_name: '',
        national_id: '',
        birth_date: '',
        gender: 'male',
        religion: 'muslim',
        grade: 'الصف الأول الابتدائي',
        class_group: '',
        phone: '',
        parent_job: '',
        address: '',
        status: 'active'
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        const querySearch = searchParams.get('search');
        if (querySearch) {
            setSearchTerm(querySearch);
        }
        fetchStudents();
    }, [searchParams]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setStudents(data as unknown as Student[] || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const isValidEgyptianNationalId = (id: string): boolean => {
        // التحقق من أن الرقم 14 رقم
        if (!/^\d{14}$/.test(id)) return false;
        
        const century = parseInt(id[0]);
        const year = parseInt(id.substring(1, 3));
        const month = parseInt(id.substring(3, 5));
        const day = parseInt(id.substring(5, 7));
        
        // التحقق من أن القرن صحيح (2 أو 3)
        if (century !== 2 && century !== 3) return false;
        
        // التحقق من أن الشهر بين 1 و 12
        if (month < 1 || month > 12) return false;
        
        // التحقق من أن اليوم بين 1 و 31
        if (day < 1 || day > 31) return false;
        
        return true;
    };

    const isValidEgyptianPhone = (phone: string): boolean => {
        // إزالة المسافات والشرطات
        const cleanPhone = phone.replace(/[\s\-]/g, '');
        
        // صيغة الهاتف المصري: 01xxxxxxxxx (10 أرقام)
        // أو +201xxxxxxxxx (يبدأ بـ +20)
        const egyptianPhoneRegex = /^(01|(\+201))\d{8,9}$/;
        
        return egyptianPhoneRegex.test(cleanPhone);
    };

    const handleNationalIdChange = (value: string) => {
        const newData = { ...formData, national_id: value };

        if (isValidEgyptianNationalId(value)) {
            const century = parseInt(value[0]);
            const year = parseInt(value.substring(1, 3));
            const month = value.substring(3, 5);
            const day = value.substring(5, 7);
            const genderDigit = parseInt(value.substring(12, 13));

            const fullYear = (century === 2 ? 1900 : 2000) + year;
            newData.birth_date = `${fullYear}-${month}-${day}`;
            newData.gender = genderDigit % 2 !== 0 ? 'male' : 'female';
        }
        setFormData(newData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEgyptianNationalId(formData.national_id)) {
            alert('الرقم القومي غير صحيح. تأكد من أنه رقم مصري صحيح (14 رقم)');
            return;
        }

        if (formData.phone && !isValidEgyptianPhone(formData.phone)) {
            alert('رقم الهاتف غير صحيح. يجب أن يكون رقم مصري (01xxxxxxxxx أو +201xxxxxxxxx)');
            return;
        }

        setIsSubmitting(true);
        try {
            if (editingId) {
                const { error } = await supabase
                    .from('students')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('students')
                    .insert([formData]);
                if (error) throw error;
            }

            await supabase.from('logs').insert([{
                action: editingId ? 'تعديل طالب' : 'إضافة طالب',
                details: `الطالب: ${formData.full_name}`,
                user_id: 'admin'
            }]);

            setIsModalOpen(false);
            setEditingId(null);
            setFormData(initialFormState as any);
            fetchStudents();
        } catch (error: any) {
            alert('حدث خطأ: ' + error.message);
        } finally {
            setIsSubmitting(false);
            // Close modal here to ensure UI feedback
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من الحذف النهائي؟')) return;

        const { error } = await supabase.from('students').delete().eq('id', id);
        if (!error) {
            setStudents(prev => prev.filter(s => s.id !== id));
            await supabase.from('logs').insert([{
                action: 'حذف طالب',
                details: `تم حذف الطالب برقم مرجعي ${id}`,
                user_id: 'admin'
            }]);
        }
    };

    const filteredStudents = students.filter(student => {
        if (!searchTerm.trim()) return true;
        
        // البحث في الرقم القومي
        if (student.national_id.includes(searchTerm)) return true;
        
        // تقسيم الاسم الرباعي إلى أجزاء والبحث في كل جزء
        const nameParts = student.full_name.split(/\s+/);
        return nameParts.some(part => 
            part.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const statusMap: Record<string, { label: string, clazz: string }> = {
        'active': { label: 'منتظم', clazz: 'status-success' },
        'transferred': { label: 'محول', clazz: 'status-warning' },
        'expelled': { label: 'مفصول', clazz: 'status-error' },
        'graduated': { label: 'خريج', clazz: 'status-info' }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>سجلات الطلاب</h1>
                </div>
                <button
                    onClick={() => { setEditingId(null); setFormData(initialFormState as any); setIsModalOpen(true); }}
                    className="btn btn-primary"
                >
                    <Plus size={18} />
                    <span>تسجيل طالب جديد</span>
                </button>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="بحث بالاسم أو الرقم القومي..."
                            className="input-field"
                            style={{ paddingRight: '40px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={fetchStudents} className="btn btn-outline"><RefreshCcw size={18} /></button>
                    <button onClick={() => exportToExcel(students, 'students_db')} className="btn btn-outline">
                        <FileSpreadsheet size={18} />
                        <span>Excel</span>
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>الاسم الكامل</th>
                            <th>الرقم القومي</th>
                            <th>الصف / الفصل</th>
                            <th>تاريخ الميلاد</th>
                            <th>النوع</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center' }}><Loader2 className="animate-spin" /></td></tr>
                        ) : filteredStudents.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }} className="text-muted">لا توجد نتائج</td></tr>
                        ) : (
                            filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{student.full_name}</div>
                                        <div className="text-xs text-muted">{student.religion === 'muslim' ? 'مسلم' : 'مسيحي'}</div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace' }}>{student.national_id}</td>
                                    <td>{student.grade} <span className="text-muted">({student.class_group})</span></td>
                                    <td>{student.birth_date}</td>
                                    <td>{student.gender === 'male' ? 'ذكر' : 'أنثى'}</td>
                                    <td><span className={`status-badge ${statusMap[student.status]?.clazz}`}>{statusMap[student.status]?.label}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => { setEditingId(student.id); setFormData(student as any); setIsModalOpen(true); }} className="btn btn-outline" style={{ padding: '0.4rem' }}><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(student.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="card"
                            style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{editingId ? 'تعديل بيانات' : 'إضافة طالب جديد'}</h2>
                                <button onClick={() => setIsModalOpen(false)}><Plus style={{ transform: 'rotate(45deg)' }} /></button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}><h3 style={{ color: 'var(--brand)', fontWeight: 'bold' }}>بيانات الطالب</h3></div>

                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="label">الرقم القومي (14 رقم)*</label>
                                    <input required maxLength={14} value={formData.national_id} onChange={(e) => handleNationalIdChange(e.target.value)} className="input-field" placeholder="الرقم الموجود في شهادة الميلاد" style={{ fontFamily: 'monospace' }} />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="label">الاسم رباعي*</label>
                                    <input required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="input-field" />
                                </div>

                                <div><label className="label">تاريخ الميلاد</label><input type="date" required value={formData.birth_date} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} className="input-field" /></div>
                                <div>
                                    <label className="label">النوع</label>
                                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })} className="input-field" >
                                        <option value="male">ذكر</option>
                                        <option value="female">أنثى</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label">الديانة</label>
                                    <select value={formData.religion} onChange={(e) => setFormData({ ...formData, religion: e.target.value as any })} className="input-field">
                                        <option value="muslim">مسلم</option>
                                        <option value="christian">مسيحي</option>
                                    </select>
                                </div>

                                <div style={{ gridColumn: 'span 2' }}><h3 style={{ color: 'var(--brand)', fontWeight: 'bold', marginTop: '1rem' }}>بيانات الدراسة</h3></div>

                                <div>
                                    <label className="label">المرحلة / الصف</label>
                                    <select value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="input-field">
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

                                <div>
                                    <label className="label">الفصل</label>
                                    <input value={formData.class_group} onChange={(e) => setFormData({ ...formData, class_group: e.target.value })} className="input-field" placeholder="1/1" />
                                </div>

                                <div>
                                    <label className="label">حالة القيد</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="input-field">
                                        <option value="active">منتظم</option>
                                        <option value="transferred">محول</option>
                                        <option value="expelled">مفصول</option>
                                    </select>
                                </div>

                                <div style={{ gridColumn: 'span 2' }}><h3 style={{ color: 'var(--brand)', fontWeight: 'bold', marginTop: '1rem' }}>ولي الأمر</h3></div>

                                <div style={{ gridColumn: 'span 2' }}><label className="label">رقم الهاتف</label><input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" /></div>

                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <button disabled={isSubmitting} type="submit" className="btn btn-primary" style={{ flex: 1 }}>{isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات'}</button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>إلغاء</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function StudentsPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 className="animate-spin" /></div>}>
            <StudentsContent />
        </Suspense>
    );
}
