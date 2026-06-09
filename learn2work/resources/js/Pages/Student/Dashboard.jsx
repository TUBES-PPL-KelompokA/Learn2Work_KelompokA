import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ enrollments }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Kursus Saya 🎓</h2>
                    <Link
                        href={route('courses.index')}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                        + Jelajahi Kursus
                    </Link>
                </div>
            }
        >
            <Head title="Kursus Saya" />

            <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                
                {/* Flash Message Banner */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-emerald-800 shadow-sm animate-fade-in">
                        <span className="text-xl">✅</span>
                        <p className="text-sm font-semibold">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 border border-rose-100 text-rose-800 shadow-sm animate-fade-in">
                        <span className="text-xl">❌</span>
                        <p className="text-sm font-semibold">{flash.error}</p>
                    </div>
                )}

                {/* User Stats / Overview Strip */}
                <div className="rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white shadow-xl flex items-center justify-between relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-xl" />
                    <div>
                        <h3 className="text-lg font-black tracking-tight">Perjalanan Pembelajaran Anda</h3>
                        <p className="text-xs text-slate-300 mt-1">Selesaikan seluruh modul secara terstruktur untuk meraih kelulusan kompetensi.</p>
                    </div>
                    <span className="text-3xl hidden sm:block shrink-0">🚀</span>
                </div>

                {enrollments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-slate-800 py-20 text-center">
                        <div className="mb-4 text-6xl">📚</div>
                        <h3 className="text-lg font-semibold text-slate-700">Belum ada kursus</h3>
                        <p className="mt-2 text-sm text-slate-500">Anda belum bergabung ke kursus manapun saat ini.</p>
                        <Link
                            href={route('courses.index')}
                            className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-sm"
                        >
                            Jelajahi Kursus Sekarang
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
                            >
                                {/* Card header gradient */}
                                <div className={`h-2 ${(enrollment.status === 'paid' || enrollment.status === 'active') ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} />

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <h3 className="font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                            {enrollment.course.title}
                                        </h3>
                                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                            (enrollment.status === 'paid' || enrollment.status === 'active')
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                                        }`}>
                                            {(enrollment.status === 'paid' || enrollment.status === 'active') ? '● Aktif' : enrollment.status}
                                        </span>
                                    </div>

                                    {enrollment.course?.level === 'basic' || Number(enrollment.course?.price) === 0 ? (
                                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 border border-emerald-100">
                                            <span className="text-sm">♾️</span>
                                            <span className="text-xs font-bold text-emerald-700">
                                                Akses Selamanya
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
                                            <span className="text-sm">⏳</span>
                                            <span className="text-xs font-bold text-slate-600">
                                                Sisa Waktu: <span className={(enrollment.remaining_days || 0) <= 3 ? 'text-rose-600' : 'text-indigo-600'}>
                                                    {enrollment.remaining_days !== null ? `${enrollment.remaining_days} Hari` : 'Expired'}
                                                </span>
                                            </span>
                                        </div>
                                    )}

                                    {/* Progress Belajar Terintegrasi */}
                                    <div className="mt-auto pt-2 mb-4 space-y-1.5">
                                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            <span>Progres Belajar</span>
                                            <span className="text-indigo-600 font-extrabold">{enrollment.progress_percent || 0}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                                                style={{ width: `${Math.min(100, Math.max(0, enrollment.progress_percent || 0))}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-50">
                                        <Link
                                            href={route('student.learn', { course: enrollment.course.id })}
                                            className="block w-full rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-indigo-500 uppercase tracking-wider"
                                        >
                                            Lanjut Belajar →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
