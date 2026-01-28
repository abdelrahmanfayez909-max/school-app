module.exports = [
"[project]/app/dashboard/reports/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReportsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
;
'use client';
;
;
;
;
;
const html2pdf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/html2pdf.js/dist/html2pdf.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
function ReportsPage() {
    const [reportDate, setReportDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split('T')[0]);
    const [reportType, setReportType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('daily-attendance');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const generateReport = async ()=>{
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
        } finally{
            setLoading(false);
        }
    };
    const generateAttendanceReport = async ()=>{
        try {
            const { data: attendance, error: attError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('attendance').select('student_id, status').eq('date', reportDate);
            const { data: students, error: studError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('students').select('id, full_name, grade, class_group, status');
            if (attError || studError) {
                console.error('Database error:', attError || studError);
                alert('حدث خطأ في الاتصال بقاعدة البيانات');
                return;
            }
            if (!students || students.length === 0) {
                alert('لا توجد طلاب مسجلين في النظام');
                return;
            }
            const attendanceMap = {};
            attendance?.forEach((a)=>{
                attendanceMap[a.student_id] = a.status;
            });
            const presentCount = attendance?.filter((a)=>a.status === 'present').length || 0;
            const absentCount = attendance?.filter((a)=>a.status === 'absent').length || 0;
            const excusedCount = attendance?.filter((a)=>a.status === 'excused').length || 0;
            const tableRows = students.map((student, idx)=>{
                const status = attendanceMap[student.id];
                const statusLabel = status === 'present' ? 'حاضر' : status === 'absent' ? 'غائب' : status === 'excused' ? 'مأذون' : 'لم يتم';
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
                image: {
                    type: 'png'
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                }
            };
            html2pdf().set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!`);
        } catch (error) {
            console.error('Error generating attendance report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };
    const generateClassStatsReport = async ()=>{
        try {
            const { data: students, error: studError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('students').select('id, full_name, grade, class_group, status');
            if (studError) {
                console.error('Database error:', studError);
                alert('حدث خطأ في الاتصال بقاعدة البيانات');
                return;
            }
            if (!students || students.length === 0) {
                alert('لا توجد طلاب مسجلين في النظام');
                return;
            }
            const classByGrade = {};
            students.forEach((student)=>{
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
                const statusMap = {
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
            Object.keys(classByGrade).forEach((grade)=>{
                Object.keys(classByGrade[grade]).forEach((classGroup)=>{
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
                        <p><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
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
                filename: `تقرير_إحصائيات_الفصول_${new Date().toISOString().split('T')[0]}.pdf`,
                image: {
                    type: 'png'
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                }
            };
            html2pdf().set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!`);
        } catch (error) {
            console.error('Error generating class stats report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };
    const generateStudentsCountReport = async ()=>{
        try {
            const { data: students, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('students').select('id, full_name, grade, class_group, status, gender');
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
            const maleStudents = students.filter((s)=>s.gender === 'male').length;
            const femaleStudents = students.filter((s)=>s.gender === 'female').length;
            const activeStudents = students.filter((s)=>s.status === 'active').length;
            const tableRows = students.map((student, idx)=>{
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
            const todayDate = new Date().toISOString().split('T')[0];
            const htmlContent = `
                <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="text-align: center; color: #1e3a8a; margin-bottom: 20px;">تقرير إحصاء أعداد الطلاب</h1>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>التاريخ:</strong> ${new Date(todayDate).toLocaleDateString('ar-EG')}</p>
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
                filename: `تقرير_إحصاء_أعداد_الطلاب_${todayDate}.pdf`,
                image: {
                    type: 'png'
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                }
            };
            html2pdf().set(opt).from(element).save();
            alert(`✓ تم توليد التقرير بنجاح!`);
        } catch (error) {
            console.error('Error generating students count report:', error);
            alert('حدث خطأ في توليد التقرير');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: '1000px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        },
                        children: "التقارير"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 335,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "استخراج تقارير الحضور والغياب والقوائم الإحصائية"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 336,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 334,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label",
                                children: "تاريخ التقرير"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 341,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: reportDate,
                                onChange: (e)=>setReportDate(e.target.value),
                                className: "input-field"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 342,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 340,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label",
                                children: "نوع التقرير"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 345,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: reportType,
                                onChange: (e)=>setReportType(e.target.value),
                                className: "input-field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "daily-attendance",
                                        children: "تقرير الحضور والغياب اليومي"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "class-stats",
                                        children: "تقرير إحصاء أعداد الفصول"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "students-count",
                                        children: "تقرير إحصاء أعداد الطلاب"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 346,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 344,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridColumn: 'span 2',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: generateReport,
                            disabled: loading,
                            className: "btn btn-primary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/reports/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: loading ? 'جاري التوليد...' : 'طباعة التقرير'
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/reports/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/reports/page.tsx",
                            lineNumber: 354,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 353,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        },
                        children: "التقارير الجاهزة"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 362,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '1rem'
                        },
                        children: [
                            {
                                name: 'تقرير إحصاء أعداد الطلاب',
                                action: ()=>{
                                    setReportType('students-count');
                                    generateStudentsCountReport();
                                }
                            },
                            {
                                name: 'تقرير الحضور والغياب اليومي',
                                action: ()=>{
                                    setReportType('daily-attendance');
                                    generateAttendanceReport();
                                }
                            },
                            {
                                name: 'تقرير إحصاء الفصول',
                                action: ()=>{
                                    setReportType('class-stats');
                                    generateClassStatsReport();
                                }
                            }
                        ].map((rep, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: rep.action,
                                className: "card",
                                style: {
                                    padding: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        size: 32,
                                        color: "var(--brand)",
                                        style: {
                                            marginBottom: '0.75rem'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        },
                                        children: rep.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 371,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 369,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 363,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 361,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/reports/page.tsx",
        lineNumber: 333,
        columnNumber: 9
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Printer
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
            key: "143wyd"
        }
    ],
    [
        "path",
        {
            d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
            key: "1itne7"
        }
    ],
    [
        "rect",
        {
            x: "6",
            y: "14",
            width: "12",
            height: "8",
            rx: "1",
            key: "1ue0tg"
        }
    ]
];
const Printer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("printer", __iconNode);
;
 //# sourceMappingURL=printer.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Printer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
function BailoutToCSR({ reason, children }) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactDOM; //# sourceMappingURL=react-dom.js.map
}),
"[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _encodeuripath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/deployment-id.js [app-ssr] (ecmascript)");
function PreloadChunks({ moduleIds }) {
    // Early return in client compilation and only load requestStore on server side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const dplId = (0, _deploymentid.getDeploymentIdQueryOrEmptyString)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = `${workStore.assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(chunk)}${dplId}`;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style",
                    nonce: workStore.nonce
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low',
                    nonce: workStore.nonce
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : "TURBOPACK unreachable",
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map
}),
"[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: mergedOptions.loadableGenerated?.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map
}),
];

//# sourceMappingURL=_a1eeb162._.js.map