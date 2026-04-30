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
        <div className="min-h-screen bg-slate-50">

            {/* ── TOP NAVBAR ── */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo + Nav Links */}
                        <div className="flex items-center gap-8">
                            <Link href={route('dashboard')} className="flex items-center gap-2">
                                <span className="text-xl">🎯</span>
                                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Learn2Work
                                </span>
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden items-center gap-1 sm:flex">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={route(item.href)}
                                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            route().current(item.href)
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
                            <span className={`hidden rounded-full px-2.5 py-0.5 text-xs font-semibold text-white sm:inline-flex ${roleColor}`}>
                                {roleLabel}
                            </span>

                            {/* Avatar Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1 pr-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                                >
                                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold ${roleColor}`}>
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline">{user?.name}</span>
                                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                        <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                                            <div className="border-b border-slate-100 px-4 py-3">
                                                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                                                <p className="truncate text-xs text-slate-500">{user?.email}</p>
                                            </div>
                                            {/* Profil Saya dihapus sesuai permintaan */}
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 ${isAdmin ? 'border-t border-slate-100' : ''}`}
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
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:hidden"
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
                    <div className="border-t border-slate-200 bg-white sm:hidden">
                        <div className="space-y-1 px-4 py-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={route(item.href)}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        route().current(item.href)
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-slate-200 px-4 py-3">
                            <div className="mb-2 flex items-center gap-3 px-3 py-2">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold ${roleColor}`}>
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                                    <p className="text-xs text-slate-500">{roleLabel}</p>
                                </div>
                            </div>
                            {/* Profil Saya dihapus sesuai permintaan */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
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
                <div className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}

            {/* ── MAIN CONTENT ── */}
            <main className="mx-auto max-w-7xl">{children}</main>
        </div>
    );
}
