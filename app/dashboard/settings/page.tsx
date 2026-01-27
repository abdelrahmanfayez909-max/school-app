'use client';

export default function SettingsPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>إعدادات النظام</h1>

            <div className="card">
                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>إعدادات المدرسة</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label className="label">اسم المدرسة</label>
                        <input className="input-field" defaultValue="مدرسة المستشار أحمد عصمت" />
                    </div>
                    <div>
                        <label className="label">العام الدراسي</label>
                        <input className="input-field" defaultValue="2025 / 2026" />
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>النسخ الاحتياطي</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>أخذ نسخة احتياطية من قاعدة البيانات</p>
                <button className="btn btn-primary">تحميل نسخة احتياطية</button>
            </div>
        </div>
    );
}
