'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // التحقق من بيانات الدخول
    if (username === 'admin' && password === 'admin199') {
      setTimeout(() => {
        router.push('/dashboard');
        setLoading(false);
      }, 1000);
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ maxWidth: '1000px', width: '100%', display: 'flex', overflow: 'hidden', minHeight: '600px' }}
      >
        {/* Right Side: Illustration */}
        <div className="login-hero-image" style={{ flex: 1, position: 'relative' }}>
          <div style={{
            backgroundImage: `url('/school_hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%'
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(30, 58, 138, 0.4), rgba(30, 58, 138, 0.8))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>مدرسة المستشار أحمد عصمت</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>نظام الإدارة المدرسية المتطور - كفاءة، أمان، وسهولة.</p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div style={{ flex: 1, padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
              <GraduationCap size={36} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>تسجيل الدخول</h2>
            <p style={{ color: 'var(--text-muted)' }}>مرحباً بك مجدداً في نظام إدارة المدرسة</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && (
              <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', fontSize: '0.95rem' }}>
                {error}
              </div>
            )}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>اسم المستخدم</label>
              <input
                type="text"
                className="input-field"
                placeholder="أدخل اسم المستخدم"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>كلمة المرور</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'جاري التحميل...' : (
                <>
                  <LogIn size={20} />
                  <span>دخول النظام</span>
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} />
            <span>نظام مؤمن ومشفر بالكامل</span>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {
          .login-hero {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
