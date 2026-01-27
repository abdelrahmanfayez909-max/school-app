'use client';

import { useState, useEffect } from 'react';
import { FileText, Printer } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ReportsPage() {
    const [reportDate, setReportDate] = useState('');
    const [reportType, setReportType] = useState('daily-attendance');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setReportDate(today);
        setMounted(true);
    }, []);

    const generateReport = async () => {
        setLoading(true);
        try {
            if (reportType === 'daily-attendance') {
                await generateAttendanceReport();
            } else if (reportType === 'class-stats') {
                await generateClassStatsReport();
            } else if (reportType === 'students-count') {
                await generateStudentsCountReport();
            }
        } catch (error) {
            console.error('Error generating report:', error);
            alert('حدث خطأ في توليد التقرير');
        } finally {
            setLoading(false);
        }
    };

    const checkDataExists = async (date: string) => {
        const { data: attendance, error } = await supabase
            .from('attendance')
            .select('id')
            .eq('date', date)
            .limit(1);
        
        if (error) {
            console.error('Error checking data:', error);
            return false;
        }
        
        return attendance && attendance.length > 0;
    };

    const generateAttendanceReport = async () => {
        try {
            // التحقق من وجود بيانات في التاريخ المختار
            const dataExists = await checkDataExists(reportDate);
            if (!dataExists) {
                alert(`لا توجد بيانات حضور وغياب في تاريخ ${reportDate}\nاختر تاريخاً آخر يحتوي على بيانات`);
                return;
            }

            const html2pdf = (await import('html2pdf.js')).default;
            
            const { data: attendance, error: attError } = await supabase
                .from('attendance')
                .select('student_id, status')
                .eq('date', reportDate);

            const { data: students, error: studError } = await supabase
                .from('students')
                .select('id, full_name, grade, class_group, status');

            if (attError || studError) {
                console.error('Database error:', attError || studError);
                alert('حدث خطأ في الاتصال بقاعدة البيانات');
                return;
            }

            if (!students || students.length === 0) {
                alert('لا توجد طلاب مسجلين في النظام');
                return;
            }

            if (!attendance || attendance.length === 0) {
                alert(`لا توجد بيانات حضور وغياب في تاريخ ${reportDate}\nاختر تاريخاً آخر يحتوي على بيانات`);
                return;
            }

            const attendanceMap: Record<string, string> = {};
            attendance?.forEach(a => {
                attendanceMap[a.student_id] = a.status;
            });

            const presentCount = attendance?.filter(a => a.status === 'present').length || 0;
            const absentCount = attendance?.filter(a => a.status === 'absent').length || 0;
            const excusedCount = attendance?.filter(a => a.status === 'excused').length || 0;

            const tableRows = students.map((student, idx) => {
                const status = attendanceMap[student.id];
                const statusLabel = 
                    status === 'present' ? 'حاضر' :
                    status === 'absent' ? 'غائب' :
                    status === 'excused' ? 'مأذون' :
                    'لم يتم';
                
                return `
                    <tr style="background-color: ${idx % 2 === 0 ? '#f5f5f5' : 'white'};">
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${idx + 1}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${student.full_name}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${student.grade}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${student.class_group}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${statusLabel}</td>
                    </tr>
                `;
            }).join('');

            const htmlContent = `
                <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="text-align: center; color: #1e3a8a; margin-bottom: 20px;">تقرير الحضور والغياب اليومي</h1>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>التاريخ:</strong> ${reportDate}</p>
                        <p><strong>إجمالي الطلاب:</strong> ${students.length}</p>
                        <p><strong>الحاضرون:</strong> ${presentCount}</p>
                        <p><strong>الغائبون:</strong> ${absentCount}</p>
                        <p><strong>المأذون لهم:</strong> ${excusedCount}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #1e3a8a; color: white;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">#</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">الاسم</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الصف</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الفصل</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;

            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            
            const opt = {
                margin: 10,
                filename: `تقرير_الحضور_${reportDate}.pdf`,
                image: { type: 'png' as const },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };

            (html2pdf() as any).set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!\nالتاريخ: ${reportDate}\nعدد السجلات: ${attendance.length}`);
        } catch (error) {
            console.error('Error generating attendance report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };

    const generateClassStatsReport = async () => {
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            
            const { data: students, error: studError } = await supabase
                .from('students')
                .select('id, full_name, grade, class_group, status');

            if (studError) {
                console.error('Database error:', studError);
                alert('حدث خطأ في الاتصال بقاعدة البيانات');
                return;
            }

            if (!students || students.length === 0) {
                alert('لا توجد طلاب مسجلين في النظام');
                return;
            }

            const classByGrade: Record<string, Record<string, any>> = {};
            students.forEach(student => {
                if (!classByGrade[student.grade]) {
                    classByGrade[student.grade] = {};
                }
                if (!classByGrade[student.grade][student.class_group]) {
                    classByGrade[student.grade][student.class_group] = {
                        منتظم: 0,
                        محول: 0,
                        مفصول: 0,
                        خريج: 0
                    };
                }
                
                const statusMap: Record<string, string> = {
                    'active': 'منتظم',
                    'transferred': 'محول',
                    'expelled': 'مفصول',
                    'graduated': 'خريج'
                };
                
                const arabicStatus = statusMap[student.status] || 'منتظم';
                classByGrade[student.grade][student.class_group][arabicStatus]++;
            });

            let tableRows = '';
            let rowNum = 1;
            Object.keys(classByGrade).forEach(grade => {
                Object.keys(classByGrade[grade]).forEach(classGroup => {
                    const stats = classByGrade[grade][classGroup];
                    const total = stats.منتظم + stats.محول + stats.مفصول + stats.خريج;
                    tableRows += `
                        <tr style="background-color: ${(rowNum - 1) % 2 === 0 ? '#f5f5f5' : 'white'};">
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${rowNum}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${grade} - ${classGroup}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${total}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.منتظم}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.محول}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.مفصول}</td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${stats.خريج}</td>
                        </tr>
                    `;
                    rowNum++;
                });
            });

            const htmlContent = `
                <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="text-align: center; color: #1e3a8a; margin-bottom: 20px;">تقرير إحصائيات الفصول</h1>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>التاريخ:</strong> ${new Date(reportDate).toLocaleDateString('ar-EG')}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #1e3a8a; color: white;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">#</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">الفصل</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الإجمالي</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">منتظم</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">محول</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">مفصول</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">خريج</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;

            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            
            const opt = {
                margin: 10,
                filename: `تقرير_إحصائيات_الفصول_${reportDate}.pdf`,
                image: { type: 'png' as const },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };

            (html2pdf() as any).set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!\nإجمالي الطلاب: ${students.length}`);
        } catch (error) {
            console.error('Error generating class stats report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };

    const generateStudentsCountReport = async () => {
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            
            const { data: students, error } = await supabase
                .from('students')
                .select('id, full_name, grade, class_group, status, gender');

            if (error) {
                console.error('Database error:', error);
                alert('حدث خطأ في الاتصال بقاعدة البيانات');
                return;
            }

            if (!students || students.length === 0) {
                alert('لا توجد طلاب مسجلين في النظام');
                return;
            }

            const totalStudents = students.length;
            const maleStudents = students.filter(s => s.gender === 'male').length;
            const femaleStudents = students.filter(s => s.gender === 'female').length;
            const activeStudents = students.filter(s => s.status === 'active').length;

            const tableRows = students.map((student, idx) => {
                const genderLabel = student.gender === 'male' ? 'ذكر' : 'أنثى';
                const statusLabel = student.status === 'active' ? 'منتظم' : student.status === 'transferred' ? 'محول' : student.status === 'expelled' ? 'مفصول' : 'خريج';
                
                return `
                    <tr style="background-color: ${idx % 2 === 0 ? '#f5f5f5' : 'white'};">
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${idx + 1}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${student.full_name}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${student.grade}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${student.class_group}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${genderLabel}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${statusLabel}</td>
                    </tr>
                `;
            }).join('');

            const htmlContent = `
                <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="text-align: center; color: #1e3a8a; margin-bottom: 20px;">تقرير إحصاء أعداد الطلاب</h1>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>التاريخ:</strong> ${new Date(reportDate).toLocaleDateString('ar-EG')}</p>
                        <p><strong>إجمالي الطلاب:</strong> ${totalStudents}</p>
                        <p><strong>الذكور:</strong> ${maleStudents}</p>
                        <p><strong>الإناث:</strong> ${femaleStudents}</p>
                        <p><strong>المنتظمون:</strong> ${activeStudents}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #1e3a8a; color: white;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">#</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">الاسم</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الصف</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الفصل</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">النوع</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;

            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            
            const opt = {
                margin: 10,
                filename: `تقرير_إحصاء_أعداد_الطلاب_${reportDate}.pdf`,
                image: { type: 'png' as const },
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
            };

            (html2pdf() as any).set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!\nإجمالي الطلاب: ${totalStudents}\nالذكور: ${maleStudents}\nالإناث: ${femaleStudents}`);
        } catch (error) {
            console.error('Error generating students count report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: 'clamp(1.25rem, 5vw, 1.5rem)', fontWeight: 'bold' }}>التقارير</h1>
                <p className="text-muted" style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>استخراج تقارير الحضور والغياب والقوائم الإحصائية</p>
            </div>

            <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', padding: '1rem' }}>
                <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>تاريخ التقرير</label>
                    <input type="date" value={reportDate} onChange={e => setReportDate(e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>نوع التقرير</label>
                    <select value={reportType} onChange={e => setReportType(e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="daily-attendance">تقرير الحضور والغياب اليومي</option>
                        <option value="class-stats">تقرير إحصاء أعداد الفصول</option>
                        <option value="students-count">تقرير إحصاء أعداد الطلاب</option>
                    </select>
                </div>

                <div style={{ gridColumn: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <button onClick={generateReport} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)', width: '100%', justifyContent: 'center', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                        <Printer size={18} />
                        <span>{loading ? 'جاري التوليد...' : 'طباعة التقرير'}</span>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)', fontWeight: 'bold', marginBottom: '1rem' }}>التقارير الجاهزة</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    {[
                        { name: 'تقرير إحصاء أعداد الطلاب', action: () => { setReportType('students-count'); generateStudentsCountReport(); } },
                        { name: 'تقرير الحضور والغياب اليومي', action: () => { setReportType('daily-attendance'); generateAttendanceReport(); } },
                        { name: 'تقرير إحصاء الفصول', action: () => { setReportType('class-stats'); generateClassStatsReport(); } }
                    ].map((rep, i) => (
                        <div key={i} onClick={rep.action} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--border)', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: '150px', justifyContent: 'center' }} onMouseEnter={(e) => { (e.currentTarget as any).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; (e.currentTarget as any).style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { (e.currentTarget as any).style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; (e.currentTarget as any).style.transform = 'translateY(0)'; }}>
                            <FileText size={28} color="var(--brand)" style={{ marginBottom: '0.5rem' }} />
                            <span style={{ fontWeight: '600', fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)', lineHeight: '1.3' }}>{rep.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
