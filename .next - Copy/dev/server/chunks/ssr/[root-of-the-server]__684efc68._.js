module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
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
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });
            // Header
            doc.setFontSize(18);
            doc.setFont('Arial', 'bold');
            doc.setTextColor(30, 58, 138);
            doc.text('تقرير الحضور والغياب اليومي', 105, 15, {
                align: 'center'
            });
            // Date and Report Info
            doc.setFontSize(11);
            doc.setFont('Arial', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(`التاريخ: ${reportDate}`, 190, 25, {
                align: 'right'
            });
            // Summary
            const presentCount = attendance?.filter((a)=>a.status === 'present').length || 0;
            const absentCount = attendance?.filter((a)=>a.status === 'absent').length || 0;
            const excusedCount = attendance?.filter((a)=>a.status === 'excused').length || 0;
            const notRecordedCount = (students?.length || 0) - (presentCount + absentCount + excusedCount);
            doc.setFontSize(10);
            doc.text(`إجمالي الطلاب: ${students.length}`, 190, 35, {
                align: 'right'
            });
            doc.text(`الحاضرون: ${presentCount}`, 190, 42, {
                align: 'right'
            });
            doc.text(`الغائبون: ${absentCount}`, 190, 49, {
                align: 'right'
            });
            doc.text(`المأذون لهم: ${excusedCount}`, 190, 56, {
                align: 'right'
            });
            // Create attendance map
            const attendanceMap = {};
            attendance?.forEach((a)=>{
                attendanceMap[a.student_id] = a.status;
            });
            // Draw table manually
            let yPosition = 65;
            const pageHeight = doc.internal.pageSize.height;
            const rowHeight = 8;
            const col1Width = 15;
            const col2Width = 60;
            const col3Width = 40;
            const col4Width = 35;
            const col5Width = 30;
            // Table Header
            doc.setFillColor(30, 58, 138);
            doc.setTextColor(255, 255, 255);
            doc.setFont('Arial', 'bold');
            doc.setFontSize(9);
            doc.rect(10, yPosition, col1Width, rowHeight, 'F');
            doc.text('#', 10 + col1Width / 2, yPosition + 6, {
                align: 'center'
            });
            doc.rect(10 + col1Width, yPosition, col2Width, rowHeight, 'F');
            doc.text('الاسم', 10 + col1Width + col2Width - 2, yPosition + 6, {
                align: 'right'
            });
            doc.rect(10 + col1Width + col2Width, yPosition, col3Width, rowHeight, 'F');
            doc.text('الصف', 10 + col1Width + col2Width + col3Width - 2, yPosition + 6, {
                align: 'right'
            });
            doc.rect(10 + col1Width + col2Width + col3Width, yPosition, col4Width, rowHeight, 'F');
            doc.text('الفصل', 10 + col1Width + col2Width + col3Width + col4Width - 2, yPosition + 6, {
                align: 'right'
            });
            doc.rect(10 + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, rowHeight, 'F');
            doc.text('الحالة', 10 + col1Width + col2Width + col3Width + col4Width + col5Width - 2, yPosition + 6, {
                align: 'right'
            });
            yPosition += rowHeight;
            // Table Data
            doc.setTextColor(0, 0, 0);
            doc.setFont('Arial', 'normal');
            students?.forEach((student, idx)=>{
                // Add new page if needed
                if (yPosition + rowHeight > pageHeight - 10) {
                    doc.addPage();
                    yPosition = 10;
                }
                const status = attendanceMap[student.id];
                const statusLabel = status === 'present' ? 'حاضر' : status === 'absent' ? 'غائب' : status === 'excused' ? 'مأذون' : 'لم يتم';
                // Row background
                if (idx % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(10, yPosition, col1Width + col2Width + col3Width + col4Width + col5Width, rowHeight, 'F');
                }
                // Borders
                doc.setTextColor(0, 0, 0);
                doc.rect(10, yPosition, col1Width, rowHeight);
                doc.rect(10 + col1Width, yPosition, col2Width, rowHeight);
                doc.rect(10 + col1Width + col2Width, yPosition, col3Width, rowHeight);
                doc.rect(10 + col1Width + col2Width + col3Width, yPosition, col4Width, rowHeight);
                doc.rect(10 + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, rowHeight);
                // Text
                doc.setFontSize(8);
                doc.text((idx + 1).toString(), 10 + col1Width / 2, yPosition + 5, {
                    align: 'center'
                });
                doc.text(student.full_name, 10 + col1Width + 3, yPosition + 5, {
                    align: 'left',
                    isRtl: true
                });
                doc.text(student.grade, 10 + col1Width + col2Width + 3, yPosition + 5, {
                    align: 'left',
                    isRtl: true
                });
                doc.text(student.class_group, 10 + col1Width + col2Width + col3Width + 3, yPosition + 5, {
                    align: 'left',
                    isRtl: true
                });
                doc.text(statusLabel, 10 + col1Width + col2Width + col3Width + col4Width + 3, yPosition + 5, {
                    align: 'left',
                    isRtl: true
                });
                yPosition += rowHeight;
            });
            const filename = `تقرير_الحضور_${reportDate}.pdf`;
            doc.save(filename);
            alert(`✓ تم توليد التقرير بنجاح!\n${filename}`);
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
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });
            // Header
            doc.setFontSize(18);
            doc.setFont('Arial', 'bold');
            doc.setTextColor(30, 58, 138);
            doc.text('تقرير إحصائيات الفصول', 105, 15, {
                align: 'center'
            });
            // Current date
            doc.setFontSize(11);
            doc.setFont('Arial', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-EG')}`, 190, 25, {
                align: 'right'
            });
            // Group by class
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
            // Draw table manually
            let yPosition = 35;
            const pageHeight = doc.internal.pageSize.height;
            const rowHeight = 8;
            // Table Header
            doc.setFillColor(30, 58, 138);
            doc.setTextColor(255, 255, 255);
            doc.setFont('Arial', 'bold');
            doc.setFontSize(9);
            const headers = [
                '#',
                'الفصل',
                'الإجمالي',
                'منتظم',
                'محول',
                'مفصول',
                'خريج'
            ];
            const colWidths = [
                12,
                35,
                22,
                22,
                22,
                22,
                22
            ];
            let xPos = 10;
            headers.forEach((header, idx)=>{
                doc.rect(xPos, yPosition, colWidths[idx], rowHeight, 'F');
                if (idx === 0) {
                    doc.text(header, xPos + colWidths[idx] / 2, yPosition + 6, {
                        align: 'center'
                    });
                } else {
                    doc.text(header, xPos + colWidths[idx] - 2, yPosition + 6, {
                        align: 'right'
                    });
                }
                xPos += colWidths[idx];
            });
            yPosition += rowHeight;
            // Table Data
            doc.setTextColor(0, 0, 0);
            doc.setFont('Arial', 'normal');
            let rowCount = 0;
            Object.keys(classByGrade).forEach((grade)=>{
                Object.keys(classByGrade[grade]).forEach((classGroup)=>{
                    // Add new page if needed
                    if (yPosition + rowHeight > pageHeight - 10) {
                        doc.addPage();
                        yPosition = 10;
                    }
                    const stats = classByGrade[grade][classGroup];
                    const total = stats.منتظم + stats.محول + stats.مفصول + stats.خريج;
                    // Row background
                    if (rowCount % 2 === 0) {
                        doc.setFillColor(245, 245, 245);
                        doc.rect(10, yPosition, 159, rowHeight, 'F');
                    }
                    // Draw cells
                    doc.setTextColor(0, 0, 0);
                    xPos = 10;
                    doc.rect(xPos, yPosition, colWidths[0], rowHeight);
                    doc.setFontSize(8);
                    doc.text((rowCount + 1).toString(), xPos + colWidths[0] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    xPos += colWidths[0];
                    doc.rect(xPos, yPosition, colWidths[1], rowHeight);
                    doc.text(`${grade} - ${classGroup}`, xPos + colWidths[1] - 2, yPosition + 5, {
                        align: 'right'
                    });
                    xPos += colWidths[1];
                    doc.rect(xPos, yPosition, colWidths[2], rowHeight);
                    doc.text(total.toString(), xPos + colWidths[2] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    xPos += colWidths[2];
                    doc.rect(xPos, yPosition, colWidths[3], rowHeight);
                    doc.text(stats.منتظم.toString(), xPos + colWidths[3] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    xPos += colWidths[3];
                    doc.rect(xPos, yPosition, colWidths[4], rowHeight);
                    doc.text(stats.محول.toString(), xPos + colWidths[4] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    xPos += colWidths[4];
                    doc.rect(xPos, yPosition, colWidths[5], rowHeight);
                    doc.text(stats.مفصول.toString(), xPos + colWidths[5] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    xPos += colWidths[5];
                    doc.rect(xPos, yPosition, colWidths[6], rowHeight);
                    doc.text(stats.خريج.toString(), xPos + colWidths[6] / 2, yPosition + 5, {
                        align: 'center'
                    });
                    yPosition += rowHeight;
                    rowCount++;
                });
            });
            const filename = `تقرير_إحصائيات_الفصول_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(filename);
            alert(`✓ تم توليد التقرير بنجاح!\n${filename}`);
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
            const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });
            // Header
            doc.setFontSize(18);
            doc.setFont('Arial', 'bold');
            doc.setTextColor(30, 58, 138);
            doc.text('تقرير إحصاء أعداد الطلاب', 105, 15, {
                align: 'center'
            });
            doc.setFontSize(11);
            doc.setFont('Arial', 'normal');
            doc.setTextColor(0, 0, 0);
            const todayDate = new Date().toISOString().split('T')[0];
            doc.text(`التاريخ: ${new Date(todayDate).toLocaleDateString('ar-EG')}`, 190, 25, {
                align: 'right'
            });
            // Summary
            const totalStudents = students.length;
            const maleStudents = students.filter((s)=>s.gender === 'male').length;
            const femaleStudents = students.filter((s)=>s.gender === 'female').length;
            const activeStudents = students.filter((s)=>s.status === 'active').length;
            doc.setFontSize(10);
            doc.text(`إجمالي الطلاب: ${totalStudents}`, 190, 35, {
                align: 'right'
            });
            doc.text(`الذكور: ${maleStudents}`, 190, 42, {
                align: 'right'
            });
            doc.text(`الإناث: ${femaleStudents}`, 190, 49, {
                align: 'right'
            });
            doc.text(`المنتظمون: ${activeStudents}`, 190, 56, {
                align: 'right'
            });
            // Draw table manually
            let yPosition = 65;
            const pageHeight = doc.internal.pageSize.height;
            const rowHeight = 7;
            // Table Header
            doc.setFillColor(30, 58, 138);
            doc.setTextColor(255, 255, 255);
            doc.setFont('Arial', 'bold');
            doc.setFontSize(8);
            const headers = [
                '#',
                'الاسم',
                'الصف',
                'الفصل',
                'النوع',
                'الحالة'
            ];
            const colWidths = [
                12,
                45,
                32,
                25,
                18,
                37
            ];
            let xPos = 10;
            headers.forEach((header, idx)=>{
                doc.rect(xPos, yPosition, colWidths[idx], rowHeight, 'F');
                if (idx === 0) {
                    doc.text(header, xPos + colWidths[idx] / 2, yPosition + 4, {
                        align: 'center'
                    });
                } else {
                    doc.text(header, xPos + colWidths[idx] - 1, yPosition + 4, {
                        align: 'right'
                    });
                }
                xPos += colWidths[idx];
            });
            yPosition += rowHeight;
            // Table Data
            doc.setTextColor(0, 0, 0);
            doc.setFont('Arial', 'normal');
            students?.forEach((student, idx)=>{
                if (yPosition + rowHeight > pageHeight - 10) {
                    doc.addPage();
                    yPosition = 10;
                }
                // Row background
                if (idx % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(10, yPosition, 169, rowHeight, 'F');
                }
                // Borders and data
                doc.setTextColor(0, 0, 0);
                xPos = 10;
                const genderLabel = student.gender === 'male' ? 'ذكر' : 'أنثى';
                const statusLabel = student.status === 'active' ? 'منتظم' : student.status === 'transferred' ? 'محول' : student.status === 'expelled' ? 'مفصول' : 'خريج';
                doc.setFontSize(7);
                doc.rect(xPos, yPosition, colWidths[0], rowHeight);
                doc.text((idx + 1).toString(), xPos + colWidths[0] / 2, yPosition + 4, {
                    align: 'center'
                });
                xPos += colWidths[0];
                doc.rect(xPos, yPosition, colWidths[1], rowHeight);
                doc.text(student.full_name, xPos + colWidths[1] - 1, yPosition + 4, {
                    align: 'right'
                });
                xPos += colWidths[1];
                doc.rect(xPos, yPosition, colWidths[2], rowHeight);
                doc.text(student.grade, xPos + colWidths[2] - 1, yPosition + 4, {
                    align: 'right'
                });
                xPos += colWidths[2];
                doc.rect(xPos, yPosition, colWidths[3], rowHeight);
                doc.text(student.class_group, xPos + colWidths[3] - 1, yPosition + 4, {
                    align: 'right'
                });
                xPos += colWidths[3];
                doc.rect(xPos, yPosition, colWidths[4], rowHeight);
                doc.text(genderLabel, xPos + colWidths[4] / 2, yPosition + 4, {
                    align: 'center'
                });
                xPos += colWidths[4];
                doc.rect(xPos, yPosition, colWidths[5], rowHeight);
                doc.text(statusLabel, xPos + colWidths[5] - 1, yPosition + 4, {
                    align: 'right'
                });
                yPosition += rowHeight;
            });
            const filename = `تقرير_إحصاء_أعداد_الطلاب_${todayDate}.pdf`;
            doc.save(filename);
            alert(`✓ تم توليد التقرير بنجاح!\n${filename}`);
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
                        lineNumber: 467,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "استخراج تقارير الحضور والغياب والقوائم الإحصائية"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 468,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 466,
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
                                lineNumber: 473,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: reportDate,
                                onChange: (e)=>setReportDate(e.target.value),
                                className: "input-field"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 474,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 472,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "label",
                                children: "نوع التقرير"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 477,
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
                                        lineNumber: 479,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "class-stats",
                                        children: "تقرير إحصاء أعداد الفصول"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "students-count",
                                        children: "تقرير إحصاء أعداد الطلاب"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/reports/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 478,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 476,
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
                                    lineNumber: 487,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: loading ? 'جاري التوليد...' : 'طباعة التقرير'
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/reports/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/reports/page.tsx",
                            lineNumber: 486,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 485,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 471,
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
                        lineNumber: 494,
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
                                        lineNumber: 502,
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
                                        lineNumber: 503,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/dashboard/reports/page.tsx",
                                lineNumber: 501,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/reports/page.tsx",
                        lineNumber: 495,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/reports/page.tsx",
                lineNumber: 493,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/reports/page.tsx",
        lineNumber: 465,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__684efc68._.js.map