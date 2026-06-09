import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';

export default function Dashboard() {
    const {
        auth,
        total_applications,
        total_students,
        total_teachers,
        total_companies,
        total_courses,
        free_courses_count,
        paid_courses_count,
        total_openings,
        active_openings_count,
        pending_payments,
        course_metrics,
        recent_companies,
        teacher_metrics,
        flash
    } = usePage().props;

    const user = auth.user;
    const { patch, processing } = useForm();

    const roleLinks = {
        admin: [
            { label: 'Verifikasi Pembayaran', href: route('admin.payments.index'), icon: '💳', desc: 'Validasi dan setujui pendaftaran kursus siswa' },
            { label: 'Penugasan Guru', href: route('assignments.index'), icon: '👨‍🏫', desc: 'Atur penugasan eksklusif guru ke kursus' },
            { label: 'Kelola Kursus', href: route('courses.index'), icon: '📚', desc: 'Tambah dan kelola materi kursus pembelajaran' },
            { label: 'Mitra Perusahaan', href: route('companies.index'), icon: '🏢', desc: 'Kelola data perusahaan mitra serta lowongan magang' },
        ],
        teacher: [
            { label: 'Kursus Saya', href: route('courses.index'), icon: '📚', desc: 'Kelola kursus yang Anda ajarkan secara eksklusif' },
            { label: 'Penilaian', href: route('submissions.index'), icon: '📝', desc: 'Berikan feedback dan nilai pada essay siswa' },
        ],
        student: [
            { label: 'Ruang Belajar', href: route('student.dashboard'), icon: '🎓', desc: 'Lanjutkan perjalanan belajar Anda' },
            { label: 'Jelajahi Kursus', href: route('courses.index'), icon: '🔍', desc: 'Temukan kursus baru yang menarik' },
            { label: 'Mitra Perusahaan', href: route('companies.index'), icon: '🏢', desc: 'Lihat peluang magang di perusahaan mitra' },
        ],
    };

    const links = roleLinks[user?.role] || roleLinks.student;

    const roleLabel = {
        admin: 'Administrator',
        teacher: 'Pengajar',
        student: 'Peserta Didik',
    }[user?.role] || 'User';

    const handleApprove = (id) => {
        if (confirm('Setujui pembayaran ini dan buka akses kursus untuk siswa?')) {
            patch(route('admin.payments.approve', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-slate-800">
                    Dashboard Utama
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* Global Flash Message Banner */}
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

                    {/* Welcome Banner */}
                    <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />
                        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl" />

                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-md border border-white/10 shadow-inner">
                                👋
                            </div>
                            <div>
                                <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-widest mb-2">
                                    {roleLabel}
                                </span>
                                <h1 className="text-3xl font-black tracking-tight">Selamat Datang, {user?.name}!</h1>
                                <p className="mt-1 text-slate-300 text-sm max-w-xl">
                                    Pantau aktivitas, kelola pembelajaran, dan raih pencapaian baru di ekosistem Learn2Work.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ADMIN SPECIFIC: Deep Multi-Metric Statistical Dashboards */}
                    {user?.role === 'admin' && (
                        <div className="space-y-8">

                            {/* Section 1: Financial & Base Entities Counters */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Ringkasan Entitas & Keterlibatan Platform</h3>
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm relative overflow-hidden transition hover:border-indigo-100">
                                        <div className="absolute right-3 top-3 text-2xl opacity-10">📄</div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lamaran Magang</p>
                                        <p className="mt-2 text-xl font-black text-emerald-600 truncate">
                                            {total_applications || 0} <span className="text-xs font-normal text-slate-400">berkas</span>
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-500">Terkirim ke mitra industri</p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm relative overflow-hidden transition hover:border-indigo-100">
                                        <div className="absolute right-3 top-3 text-2xl opacity-10">🎓</div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Siswa Terdaftar</p>
                                        <p className="mt-2 text-xl font-black text-indigo-600">
                                            {total_students || 0} <span className="text-xs font-normal text-slate-400">akun</span>
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-500">Pelajar aktif platform</p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm relative overflow-hidden transition hover:border-indigo-100">
                                        <div className="absolute right-3 top-3 text-2xl opacity-10">👨‍🏫</div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tenaga Pengajar</p>
                                        <p className="mt-2 text-xl font-black text-purple-600">
                                            {total_teachers || 0} <span className="text-xs font-normal text-slate-400">guru</span>
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-500">Pengampu eksklusif materi</p>
                                    </div>

                                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm relative overflow-hidden transition hover:border-indigo-100">
                                        <div className="absolute right-3 top-3 text-2xl opacity-10">🏢</div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Perusahaan Mitra</p>
                                        <p className="mt-2 text-xl font-black text-sky-600">
                                            {total_companies || 0} <span className="text-xs font-normal text-slate-400">industri</span>
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-500">Penyedia lowongan magang</p>
                                    </div>

                                </div>
                            </div>

                            {/* Section 2: Deep Courses & Internship Slot Metrics */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                                {/* Sub-card A: Ekosistem Kursus */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg">📚</span>
                                        <h4 className="font-bold text-slate-800 text-sm">Distribusi & Tipe Kursus</h4>
                                    </div>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-3xl font-black text-slate-900">{total_courses || 0}</span>
                                        <span className="text-xs text-slate-500">Total Modul Pembelajaran Platform</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Kursus Gratis</span>
                                            <span className="text-lg font-bold text-emerald-600">{free_courses_count || 0} Modul</span>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Kursus Berbayar</span>
                                            <span className="text-lg font-bold text-indigo-600">{paid_courses_count || 0} Modul</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-card B: Slot Lowongan Magang */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg">💼</span>
                                        <h4 className="font-bold text-slate-800 text-sm">Ketersediaan Slot Magang</h4>
                                    </div>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-3xl font-black text-slate-900">{total_openings || 0}</span>
                                        <span className="text-xs text-slate-500">Posisi Magang Didefinisikan</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                        <div className="rounded-xl bg-emerald-50/40 border border-emerald-100 p-3">
                                            <span className="text-[10px] font-bold text-emerald-700 uppercase block">Lowongan Aktif</span>
                                            <span className="text-lg font-bold text-emerald-600">{active_openings_count || 0} Posisi</span>
                                        </div>
                                        <div className="rounded-xl bg-rose-50/40 border border-rose-100 p-3">
                                            <span className="text-[10px] font-bold text-rose-700 uppercase block">Lowongan Ditutup</span>
                                            <span className="text-lg font-bold text-rose-600">{(total_openings || 0) - (active_openings_count || 0)} Posisi</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Section 3: Detailed Teacher Assignment Metrics & Partner Rankings */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                                {/* Teacher Assignment Metrics */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h4 className="font-bold text-slate-800 text-sm mb-4">Statistik Penugasan Guru</h4>
                                    {teacher_metrics && teacher_metrics.length > 0 ? (
                                        <div className="space-y-3">
                                            {teacher_metrics.map((t) => (
                                                <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                                    <div className="flex items-center gap-2.5 truncate">
                                                        <div className="h-8 w-8 rounded-full bg-purple-50 font-bold text-purple-600 flex items-center justify-center text-xs shrink-0">
                                                            {t.name.charAt(0)}
                                                        </div>
                                                        <div className="truncate">
                                                            <p className="text-xs font-bold text-slate-900 truncate">{t.name}</p>
                                                            <p className="text-[10px] text-slate-400 truncate">{t.email}</p>
                                                        </div>
                                                    </div>
                                                    <span className="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 shrink-0">
                                                        {t.courses_count || 0} Kursus
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Belum ada metrik penugasan pengajar.</p>
                                    )}
                                </div>

                                {/* Recent Partners with Openings Count */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h4 className="font-bold text-slate-800 text-sm mb-4">Mitra Perusahaan Terbaru</h4>
                                    {recent_companies && recent_companies.length > 0 ? (
                                        <div className="space-y-3">
                                            {recent_companies.map((c) => (
                                                <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                                    <div className="truncate">
                                                        <Link href={route('companies.show', c.id)} className="text-xs font-bold text-slate-900 hover:text-indigo-600 truncate block">
                                                            {c.name}
                                                        </Link>
                                                        <p className="text-[10px] text-slate-400 truncate">{c.industry}</p>
                                                    </div>
                                                    <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-700 shrink-0">
                                                        {c.internship_openings_count || 0} Posisi Magang
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Belum ada mitra terdaftar.</p>
                                    )}
                                </div>

                            </div>

                            {/* Pending Payments Alert List */}
                            {pending_payments && pending_payments.length > 0 && (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">⚠️</span>
                                            <h4 className="font-bold text-amber-900 text-sm">Pembayaran Pending Perlu Tindakan</h4>
                                        </div>
                                        <Link href={route('admin.payments.index')} className="text-xs font-bold text-amber-700 hover:underline">
                                            Lihat Halaman Penuh →
                                        </Link>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-amber-200/60 text-[11px] font-bold text-amber-800 uppercase">
                                                    <th className="pb-2">Siswa</th>
                                                    <th className="pb-2">Kursus</th>
                                                    <th className="pb-2">Bukti Bayar</th>
                                                    <th className="pb-2 text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-amber-200/40 text-xs text-slate-700">
                                                {pending_payments.slice(0, 5).map((enrollment) => (
                                                    <tr key={enrollment.id} className="hover:bg-amber-100/30 transition">
                                                        <td className="py-2.5 font-semibold">{enrollment.user?.name}</td>
                                                        <td className="py-2.5 text-slate-600">{enrollment.course?.title}</td>
                                                        <td className="py-2.5">
                                                            {enrollment.payment_proof ? (
                                                                <a
                                                                    href={route('admin.proofs.show', enrollment.id)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium"
                                                                >
                                                                    📎 Lihat Gambar
                                                                </a>
                                                            ) : (
                                                                <span className="text-slate-400 italic">Tanpa Bukti</span>
                                                            )}
                                                        </td>
                                                        <td className="py-2.5 text-right">
                                                            <button
                                                                onClick={() => handleApprove(enrollment.id)}
                                                                disabled={processing}
                                                                className="rounded-lg bg-emerald-600 px-3 py-1 text-white font-bold hover:bg-emerald-500 transition shadow-sm disabled:opacity-40"
                                                            >
                                                                Approve
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Course Enrollment Breakdown Comparison Table */}
                            {course_metrics && course_metrics.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">📊</span>
                                            <h4 className="font-bold text-slate-800 text-sm">Komparasi Pendaftar Setiap Kursus</h4>
                                        </div>
                                        <span className="text-xs text-slate-400">Total Pendaftar Keseluruhan</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {course_metrics.map((course) => (
                                            <div key={course.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 relative overflow-hidden transition hover:border-indigo-100">
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="text-xs font-bold text-slate-700 truncate block flex-1">{course.title}</span>
                                                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 uppercase tracking-wider shrink-0">
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-indigo-600">{course.enrollments_count || 0}</span>
                                                    <span className="text-xs text-slate-400">siswa mendaftar</span>
                                                </div>
                                                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500 rounded-full"
                                                        style={{ width: `${Math.min(100, ((course.enrollments_count || 0) / (total_students || 1)) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick Action Cards */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Navigasi Utama</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex flex-col gap-4 rounded-2xl bg-white p-6 border border-slate-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-100"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition-colors group-hover:bg-indigo-50 group-hover:scale-110 duration-200">
                                        {link.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                            {link.label}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{link.desc}</p>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center text-xs font-bold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                                        Buka Menu →
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
