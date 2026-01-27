'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Printer, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type definition for Student
type Student = {
    id: string;
    full_name: string;
    religion: string;
    gender: string;
    birth_date: string;
    national_id: string; // Added for 12 D Lists
};

export default function ClassesPage() {
    const [grade, setGrade] = useState('الصف الأول الابتدائي');
    const [classGroup, setClassGroup] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchClassValidation = async () => {
        if (!grade) return;
        setLoading(true);
        try {
            // @ts-ignore
            let query = supabase
                .from('students')
                .select('*')
                .eq('grade', grade)
                .eq('status', 'active')
                .order('full_name');

            if (classGroup) {
                query = query.eq('class_group', classGroup);
            }

            const { data, error } = await query;
            if (error) throw error;
            setStudents(data as unknown as Student[] || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassValidation();
    }, [grade, classGroup]);

    // Function to generate "12 D" style list (Government Standard)
    const printClassList = () => {
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

        // Setup Arabic Font (Simulated for this environment, normally requires addFont)
        doc.setLanguage('ar');

        // Header
        doc.setFontSize(16);
        doc.text('قوائم الفصول - نموذج 41 مستجد', 105, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`الصف: ${grade}`, 190, 25, { align: 'right' });
        doc.text(`الفصل: ${classGroup || 'الكل'}`, 190, 32, { align: 'right' });
        doc.text(`العام الدراسي: 2025 / 2026`, 20, 25, { align: 'left' });

        // Table
        const tableColumn = ["م", "الاسم", "الديانة", "النوع", "تاريخ الميلاد", "ملاحظات"];
        const tableRows: (string | number)[][] = [];

        students.forEach((student, index) => {
            const studentData = [
                index + 1,
                student.full_name,
                student.religion === 'muslim' ? 'مسلم' : 'مسيحي',
                student.gender === 'male' ? 'ذكر' : 'أنثى',
                student.birth_date,
                '',
            ];
            tableRows.push(studentData);
        });

        // @ts-ignore
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            styles: { font: 'Cairo', halign: 'right' },
            headStyles: { fillColor: [15, 23, 42] },
            theme: 'grid'
        });

        doc.save(`class_list_${grade}.pdf`);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>قوائم الفصول</h1>
                    <p className="text-muted">عرض وطباعة قوائم الفصول (12 د / 41 مستجد)</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
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
                    <label className="label">الفصل (اختياري)</label>
                    <input
                        value={classGroup}
                        onChange={(e) => setClassGroup(e.target.value)}
                        className="input-field"
                        placeholder="مثال: 1/1"
                    />
                </div>
                <div>
                    <button onClick={printClassList} className="btn btn-primary" disabled={students.length === 0}>
                        <Printer size={18} />
                        <span>طباعة القائمة</span>
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: 0, minHeight: '400px' }}>
                <div className="table-wrapper" style={{ border: 'none', borderRadius: '0' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>اسم الطالب</th>
                                <th>الديانة</th>
                                <th>النوع</th>
                                <th>تاريخ الميلاد</th>
                                <th>العنوان</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" /></td></tr>
                            ) : students.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }} className="text-muted">لا يوجد طلاب في هذا الفصل</td></tr>
                            ) : (
                                students.map((s, i) => (
                                    <tr key={s.id}>
                                        <td>{i + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{s.full_name}</td>
                                        <td>{s.religion === 'muslim' ? 'مسلم' : 'مسيحي'}</td>
                                        <td>{s.gender === 'male' ? 'ذكر' : 'أنثى'}</td>
                                        <td>{s.birth_date}</td>
                                        <td>-</td>
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
