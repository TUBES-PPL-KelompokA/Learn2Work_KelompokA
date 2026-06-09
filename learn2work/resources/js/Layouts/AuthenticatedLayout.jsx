import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const NAV_ITEMS = {
    admin: [
        { label: 'Dashboard', href: 'dashboard', icon: '🏠' },
        { label: 'Kursus', href: 'courses.index', icon: '📚' },
        { label: 'Mitra', href: 'companies.index', icon: '🏢' },
    ],
    teacher: [
        { label: 'Dashboard', href: 'dashboard', icon: '🏠' },
        { label: 'Kursus Saya', href: 'courses.index', icon: '📚' },
        { label: 'Penilaian', href: 'submissions.index', icon: '📝' },
    ],
    student: [
        { label: 'Dashboard', href: 'dashboard', icon: '🏠' },
        { label: 'Kursus Saya', href: 'student.dashboard', icon: '🎓' },
        { label: 'Jelajahi', href: 'courses.index', icon: '🔍' },
        { label: 'Mitra', href: 'companies.index', icon: '🏢' },
    ],
};

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = NAV_ITEMS[user?.role] || NAV_ITEMS.student;
    const isAdmin = user?.role === 'admin';

    const roleColor = {
        admin: 'bg-rose-500',
        teacher: 'bg-amber-500',
        student: 'bg-indigo-500',
    }[user?.role] || 'bg-indigo-500';

    const roleLabel = {
        admin: 'Admin',
        teacher: 'Pengajar',
        student: 'Student',
    }[user?.role] || 'User';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 font-sans">

            {/* ── TOP NAVBAR ── */}
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo + Nav Links */}
                        <div className="flex items-center gap-8">
                            <Link href={route('dashboard')} className="flex items-center gap-2">
                                <span className="text-xl">🎯</span>
                                <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Learn2Work
                                </span>
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden items-center gap-1 sm:flex">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={route(item.href)}
                                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                                            route().current(item.href)
                                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-inner'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right: User Dropdown */}
                        <div className="flex items-center gap-3">
                            {/* Role Badge */}
                            <span className={`hidden rounded-full px-2.5 py-0.5 text-xs font-semibold text-white sm:inline-flex shadow-sm ${roleColor}`}>
                                {roleLabel}
                            </span>

                            {/* Avatar Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-3 py-1 text-sm font-medium text-slate-200 shadow-sm transition hover:bg-white/10"
                                >
                                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold ${roleColor}`}>
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline font-semibold">{user?.name}</span>
                                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                        <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl backdrop-blur-xl">
                                            <div className="border-b border-white/10 px-4 py-3 bg-white/5">
                                                <p className="text-sm font-bold text-white">{user?.name}</p>
                                                <p className="truncate text-xs text-slate-400">{user?.email}</p>
                                            </div>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <span>🚪</span> Keluar
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 sm:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE MENU ── */}
                {mobileOpen && (
                    <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-md sm:hidden">
                        <div className="space-y-1 px-4 py-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={route(item.href)}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                        route().current(item.href)
                                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                            : 'text-slate-400 hover:bg-white/5'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-white/10 px-4 py-3 bg-white/5">
                            <div className="mb-2 flex items-center gap-3 px-3 py-2">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold ${roleColor}`}>
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{user?.name}</p>
                                    <p className="text-xs text-slate-400">{roleLabel}</p>
                                </div>
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                               as="button"
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/10"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span>🚪</span> Keluar
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── PAGE HEADER ── */}
            {header && (
                <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 [&_*]:!text-slate-100">
                        {header}
                    </div>
                </div>
            )}

            {/* ── MAIN CONTENT ── */}
            <main className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
