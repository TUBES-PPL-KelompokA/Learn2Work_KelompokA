import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ courses }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user?.role === 'admin';

    const [courseType, setCourseType] = useState('paid'); // 'free' or 'paid'

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        price: '',
        level: 'premium',
        duration_days: '30',
    });

    // Auto-update price/level/duration when courseType changes
    useEffect(() => {
        if (courseType === 'free') {
            setData(prev => ({ ...prev, price: '0', level: 'basic', duration_days: '' }));
        } else {
            setData(prev => ({ ...prev, price: prev.price === '0' ? '' : prev.price, level: 'premium', duration_days: '30' }));
        }
    }, [courseType]);

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">📚 Katalog Kursus</h2>
                    <span className="text-sm text-slate-500">{courses.length} kursus tersedia</span>
                </div>
            }
        >
            <Head title="Kursus" />

            <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-8">

                {/* Create Course Form — only for admin */}
                {isAdmin && (
                    <div className="rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
                            <h3 className="font-bold text-slate-800">✨ Buat Kursus Baru</h3>
                            <p className="text-sm text-slate-500 mt-1">Pilih tipe kursus dan lengkapi deskripsinya</p>
                        </div>
                        <div className="p-6 space-y-5">
                            
                            {/* Explicit Course Type Toggle Tabs */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tipe / Kategori Kursus</label>
                                <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setCourseType('paid')}
                                        className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                                            courseType === 'paid' 
                                                ? 'bg-white text-indigo-600 shadow-sm' 
                                                : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        💎 Kursus Berbayar (Premium)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCourseType('free')}
                                        className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                                            courseType === 'free' 
                                                ? 'bg-white text-emerald-600 shadow-sm' 
                                                : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        🎁 Kursus Gratis (Basic)
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-3 pt-2 border-t border-slate-50">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Kursus</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Misal: Full-Stack Web Development React & Laravel..."
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        disabled={courseType === 'free'}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400"
                                        placeholder="0"
                                        required
                                    />
                                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Ringkasan sasaran pembelajaran..."
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                                </div>

                                {courseType === 'paid' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Batas Waktu Akses (Hari)</label>
                                        <input
                                            type="number"
                                            name="duration_days"
                                            value={data.duration_days}
                                            onChange={e => setData('duration_days', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            placeholder="30"
                                            required
                                        />
                                        {errors.duration_days && <p className="mt-1 text-xs text-red-500">{errors.duration_days}</p>}
                                    </div>
                                )}

                                <div className="md:col-span-3 flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : '+ Simpan Kursus'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Course Grid */}
                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                        <div className="mb-4 text-6xl">📭</div>
                        <h3 className="text-lg font-semibold text-slate-700">Belum ada kursus</h3>
                        <p className="mt-2 text-sm text-slate-500">Belum ada kursus yang tersedia di platform saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <div className={`h-2 ${Number(course.price) === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} />
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                            Number(course.price) === 0 
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                        }`}>
                                            {Number(course.price) === 0 ? '🎁 Gratis' : '💎 Premium'}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 line-clamp-3 flex-1">
                                        {course.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
                                        <span className={`text-lg font-extrabold ${Number(course.price) === 0 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                            {Number(course.price) === 0
                                                ? 'Gratis'
                                                : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                        </span>
                                        <div className="flex flex-col items-end gap-1">
                                            {Number(course.price) === 0 || course.level === 'basic' ? (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700 uppercase tracking-tighter border border-emerald-200">
                                                    ♾️ AKSES SELAMANYA
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700 uppercase tracking-tighter border border-amber-200">
                                                    ⏳ {course.duration_days || 0} HARI AKSES
                                                </span>
                                            )}
                                            {course.teacher && (
                                                <span className="text-xs text-slate-500">oleh {course.teacher.name}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2 items-center">
                                        {(user?.role !== 'teacher' || course.teacher_id === user?.id) ? (
                                            <Link
                                                href={route('courses.show', course.id)}
                                                className="flex-1 rounded-xl border border-indigo-200 py-2 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 block"
                                            >
                                                Detail
                                            </Link>
                                        ) : (
                                            <span className="flex-1 py-2 text-center text-xs font-bold text-slate-500 bg-slate-50 rounded-xl border border-slate-100 block">
                                                🔒 Bukan Tugas Anda
                                            </span>
                                        )}
                                        {user?.role === 'student' && (() => {
                                            const enrollment = course.enrollments && course.enrollments[0];
                                            if (enrollment) {
                                                if (enrollment.status === 'pending') {
                                                    return (
                                                        <span className="flex-1 rounded-xl bg-amber-500/10 border border-amber-200 py-2 text-center text-xs font-bold text-amber-700 block">
                                                            Menunggu Verifikasi ⏳
                                                        </span>
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        href={route('student.learn', course.id)}
                                                        className="flex-1 rounded-xl bg-indigo-600 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 block"
                                                    >
                                                        Belajar →
                                                    </Link>
                                                );
                                            }
                                            return Number(course.price) === 0 ? (
                                                <Link
                                                    href={route('enrollments.free', course.id)}
                                                    method="post"
                                                    as="button"
                                                    className="flex-1 rounded-xl bg-emerald-600 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 block"
                                                >
                                                    Daftar Gratis
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={route('enrollments.payment', course.id)}
                                                    className="flex-1 rounded-xl bg-indigo-600 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 block"
                                                >
                                                    Daftar
                                                </Link>
                                            );
                                        })()}
                                        {isAdmin && (
                                            <Link
                                                href={route('courses.destroy', course.id)}
                                                method="delete"
                                                as="button"
                                                className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin menghapus kursus ini? Semua data terkait akan hilang.')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                🗑
                                            </Link>
                                        )}
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