'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Building2,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth >= 768;
    });
    const [isMobile, setIsMobile] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [pathname, isMobile]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data } = await supabase
                .from('notifications')
                .select('*')
                .eq('is_read', false)
                .order('created_at', { ascending: false })
                .limit(5);
            if (data) setNotifications(data);
        };
        fetchNotifications();
    }, []);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/dashboard/students?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const menuItems = [
        {
            category: 'الرئيسية',
            items: [
                { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
            ]
        },
        {
            category: 'شئون الطلبة',
            items: [
                { name: 'جميع الطلاب', href: '/dashboard/students', icon: Users },
                { name: 'قوائم الفصول', href: '/dashboard/classes', icon: Building2 },
                { name: 'التقارير اليومية', href: '/dashboard/reports', icon: FileText },
            ]
        },
        {
            category: 'العمليات اليومية',
            items: [
                { name: 'الغياب والحضور', href: '/dashboard/attendance', icon: CalendarCheck },
            ]
        },
        {
            category: 'الإدارة',
            items: [
                { name: 'سجل النظام', href: '/dashboard/logs', icon: FileText },
                { name: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
            ]
        }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>

            {/* Sidebar Overlay - Mobile Only */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 40
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '280px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
                style={{
                    background: '#ffffff',
                    borderLeft: '1px solid var(--border)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: isMobile ? 'fixed' : 'relative',
                    zIndex: 50,
                    boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
                    height: '100vh',
                    top: 0,
                    right: 0
                }}
            >
                {/* Brand Logo */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        background: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', flexShrink: 0
                    }}>
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.2' }}>مدرسة المستشار</h1>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>أحمد عصمت</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {menuItems.map((group, idx) => (
                            <div key={idx}>
                                <h3 style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: 'var(--text-muted)',
                                    marginBottom: '0.75rem',
                                    paddingRight: '0.75rem'
                                }}>
                                    {group.category}
                                </h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.href}>
                                                <Link 
                                                    href={item.href}
                                                    onClick={() => {
                                                        if (isMobile) {
                                                            setIsSidebarOpen(false);
                                                        }
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.6rem 0.75rem',
                                                        borderRadius: '0.5rem',
                                                        color: isActive ? 'var(--brand)' : 'var(--text-secondary)',
                                                        background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                                        fontWeight: isActive ? '600' : '500',
                                                        borderRight: isActive ? '3px solid var(--brand)' : '3px solid transparent',
                                                        transition: 'all 0.2s',
                                                        fontSize: '0.95rem'
                                                    }}>
                                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Footer User Profile */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: '#f8fafc' }}>
                    <button className="btn btn-outline" style={{
                        width: '100%',
                        justifyContent: 'center',
                        color: 'var(--danger)',
                        background: '#fee2e2',
                        border: 'none'
                    }}>
                        <LogOut size={16} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                {/* Topbar */}
                <header style={{
                    height: '64px',
                    background: 'white',
                    borderBottom: '1px solid var(--border)',
                    padding: '0 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn-icon"
                            style={{ minWidth: '40px', height: '40px' }}
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h2 style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', fontWeight: '700', whiteSpace: 'nowrap' }}>لوحة التحكم</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <div style={{ position: 'relative', display: 'none', minWidth: 'fit-content' }} className="search-box">
                            <Search size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                placeholder="بحث عن طالب..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{
                                    padding: '0.5rem 2.5rem 0.5rem 1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: '2rem',
                                    fontSize: '0.9rem',
                                    width: 'clamp(150px, 20vw, 240px)',
                                    background: '#f8fafc'
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                style={{ position: 'relative', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', height: '40px' }}
                            >
                                <Bell size={20} color="var(--text-secondary)" />
                                {notifications.length > 0 && (
                                    <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: 'red', borderRadius: '50%' }} />
                                )}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="card"
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '0',
                                            width: 'clamp(250px, 90vw, 300px)',
                                            zIndex: 100,
                                            marginTop: '0.5rem',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                            padding: 0
                                        }}
                                    >
                                        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold' }}>الإشعارات</div>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد إشعارات جديدة</div>
                                        ) : (
                                            notifications.map(n => (
                                                <div key={n.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                                    <div style={{ fontWeight: '600' }}>{n.title}</div>
                                                    <div className="text-muted text-xs">{n.message}</div>
                                                </div>
                                            ))
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Content Scroller */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
