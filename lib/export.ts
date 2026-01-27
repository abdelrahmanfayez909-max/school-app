/* eslint-disable @typescript-eslint/no-any */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data: any[], filename: string) => {
    const doc = new jsPDF('p', 'pt', 'a4') as any;

    // Need a font that supports Arabic for PDF. 
    // For this demo, we'll use a placeholder or standard latin if Arabic is tricky without embedding font.
    // In a production app, we would embed an Arabic-supporting font.

    const headers = [['الاسم', 'الرقم القومي', 'الصف', 'الحالة']];
    const rows = data.map((item: any) => [item.full_name, item.national_id, item.grade, item.status]);

    doc.text('قائمة الطلاب - مدرسة المستشار أحمد عصمت', 40, 40);
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 60,
        styles: { font: 'helvetica', halign: 'right' }
    });

    doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
