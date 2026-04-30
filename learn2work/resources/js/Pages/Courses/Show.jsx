import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

// ── STUDENT VIEW: Course detail/info page ──────────────────────────────────
function StudentCourseDetail({ course, isEnrolled }) {
    const { post, processing } = useForm();

    const handleEnroll = () => {
        router.get(route('enrollments.payment', course.id));
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            {/* Hero Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl font-extrabold text-slate-800">{course.title}</h1>

                            <p className="mt-4 text-slate-600 leading-relaxed">{course.description}</p>

                            {/* Stats Row */}
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2">
                                    <span className="text-xl">📋</span>
                                    <div>
                                        <p className="text-xs text-slate-500">Total Modul</p>
                                        <p className="font-bold text-slate-800">{course.modules.length} Modul</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2">
                                    <span className="text-xl">💰</span>
                                    <div>
                                        <p className="text-xs text-slate-500">Harga</p>
                                        <p className="font-bold text-indigo-600">
                                            {Number(course.price) === 0
                                                ? 'Gratis'
                                                : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                        </p>
                                    </div>
                                </div>
                                {course.duration_days && (
                                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-100 px-4 py-2">
                                        <span className="text-xl">⏳</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-amber-600 uppercase">Masa Akses</p>
                                            <p className="font-bold text-amber-900">{course.duration_days} Hari</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Enrollment CTA */}
                        <div className="shrink-0 w-full md:w-64">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                                <div className="mb-4 text-5xl">🎓</div>
                                <p className="text-2xl font-extrabold text-indigo-600 mb-1">
                                    {Number(course.price) === 0
                                        ? 'Gratis'
                                        : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                </p>
                                {isEnrolled ? (
                                    <Link
                                        href={route('student.learn', { course: course.id })}
                                        className="mt-3 block w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500"
                                    >
                                        Lanjut Belajar →
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        disabled={processing}
                                        className="mt-3 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-60"
                                    >
                                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What You'll Learn */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 px-6 py-4">
                    <h2 className="font-bold text-slate-800">📖 Silabus Kursus</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {course.modules.length} modul pembelajaran terstruktur
                    </p>
                </div>
                {course.modules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-3 text-5xl">📭</div>
                        <p className="text-slate-500 text-sm">Modul sedang disiapkan oleh pengajar.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {course.modules.map((mod, idx) => (
                            <li key={mod.id} className="flex items-center gap-4 px-6 py-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                                    {mod.order_number}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-800 truncate">{mod.title}</p>
                                </div>
                                {isEnrolled ? (
                                    <Link
                                        href={route('student.learn', { course: course.id, module: mod.id })}
                                        className="shrink-0 text-xs font-semibold text-indigo-600 hover:underline"
                                    >
                                        Buka →
                                    </Link>
                                ) : (
                                    <span className="shrink-0 text-xs text-slate-400">🔒</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// ── TEACHER/ADMIN VIEW: Module management ─────────────────────────────────
function TeacherCourseManage({ course }) {
    const [editingModule, setEditingModule] = useState(null);
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        title: '',
        content_url: '',
        text_content: '',
        order_number: '',
    });

    const submitModule = (e) => {
        e.preventDefault();
        if (editingModule) {
            patch(route('modules.update', editingModule.id), {
                onSuccess: () => {
                    reset();
                    setEditingModule(null);
                }
            });
        } else {
            post(route('modules.store', course.id), { onSuccess: () => reset() });
        }
    };

    const startEdit = (mod) => {
        setEditingModule(mod);
        setData({
            title: mod.title,
            content_url: mod.content_url || '',
            text_content: mod.text_content || '',
            order_number: mod.order_number,
        });
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            {/* Add Module Form */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800">{editingModule ? '📝 Edit Modul' : '➕ Tambah Modul Baru'}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Kursus: <span className="font-semibold text-slate-700">{course.title}</span>
                        </p>
                    </div>
                    {editingModule && (
                        <button
                            onClick={() => { setEditingModule(null); reset(); }}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                        >
                            Batal Edit
                        </button>
                    )}
                </div>
                <div className="p-6">
                    <form onSubmit={submitModule}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Modul</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Judul modul..."
                                    required
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Link Materi / Video</label>
                                <input
                                    type="url"
                                    value={data.content_url}
                                    onChange={e => setData('content_url', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="https://google-drive-link atau youtube..."
                                />
                                {errors.content_url && <p className="mt-1 text-xs text-red-500">{errors.content_url}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Urutan Ke-</label>
                                <input
                                    type="number"
                                    value={data.order_number}
                                    onChange={e => setData('order_number', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="1"
                                    required
                                />
                                {errors.order_number && <p className="mt-1 text-xs text-red-500">{errors.order_number}</p>}
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Materi Teks (Opsional)</label>
                                <textarea
                                    value={data.text_content}
                                    onChange={e => setData('text_content', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Tuliskan materi teks di sini..."
                                ></textarea>
                                {errors.text_content && <p className="mt-1 text-xs text-red-500">{errors.text_content}</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-500 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : '+ Tambah Modul'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Module List */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">📋 Daftar Modul</h3>
                    <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-semibold text-indigo-700">
                        {course.modules.length} modul
                    </span>
                </div>

                {course.modules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-3 text-5xl">📭</div>
                        <p className="text-slate-500 text-sm">Belum ada modul. Tambahkan modul pertama!</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {course.modules.map((mod) => (
                            <li key={mod.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                                        {mod.order_number}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 truncate">{mod.title}</p>
                                        {mod.content_url && (
                                            <p className="text-xs text-slate-400 truncate mt-0.5">{mod.content_url}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                    {mod.quiz ? (
                                        <Link
                                            href={route('quizzes.show', mod.quiz.id)}
                                            className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                                        >
                                            📝 Edit Quiz
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (confirm('Tambah quiz untuk modul ini?')) {
                                                    router.post(route('quizzes.store', mod.id), { min_score: 80 });
                                                }
                                            }}
                                            className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                                        >
                                            ➕ Tambah Quiz
                                        </button>
                                    )}
                                    <button
                                        onClick={() => startEdit(mod)}
                                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Edit
                                    </button>
                                    {mod.content_url && (
                                        <a
                                            href={mod.content_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                                        >
                                            Lihat →
                                        </a>
                                    )}
                                    <Link
                                        href={route('modules.destroy', mod.id)}
                                        method="delete"
                                        as="button"
                                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                        onClick={(e) => {
                                            if (!confirm('Apakah Anda yakin ingin menghapus modul ini? Semua materi di dalamnya akan hilang.')) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        Hapus
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function Show({ course, isEnrolled }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isTeacherOrAdmin = user?.role === 'teacher' || user?.role === 'admin';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('courses.index')} className="text-slate-500 hover:text-indigo-600 transition">
                        ← Kembali
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800 truncate">{course.title}</h2>
                    {isTeacherOrAdmin && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                            Mode Pengajar
                        </span>
                    )}
                </div>
            }
        >
            <Head title={course.title} />

            {isTeacherOrAdmin
                ? <TeacherCourseManage course={course} />
                : <StudentCourseDetail course={course} isEnrolled={isEnrolled ?? false} />
            }
        </AuthenticatedLayout>
    );
}
