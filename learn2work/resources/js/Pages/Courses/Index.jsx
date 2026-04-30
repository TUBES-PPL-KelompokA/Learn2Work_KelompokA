import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';

// Separate enroll button component to give each course its own useForm instance
function EnrollButton({ courseId }) {
    const handleEnroll = (e) => {
        e.preventDefault();
        router.get(route('enrollments.payment', courseId));
    };
    return (
        <button
            onClick={handleEnroll}
            className="flex-1 rounded-xl bg-indigo-600 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
            Daftar
        </button>
    );
}

export default function Index({ courses }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user?.role === 'admin';
    const isTeacherOrAdmin = user?.role === 'teacher' || user?.role === 'admin';

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        price: '',
        duration_days: '',
    });

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
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
                            <h3 className="font-bold text-slate-800">✨ Buat Kursus Baru</h3>
                            <p className="text-sm text-slate-500 mt-1">Isi form di bawah untuk menambahkan kursus baru</p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Kursus</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Nama kursus..."
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi</label>
                                    <input
                                        type="text"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Deskripsi singkat..."
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Harga (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="0"
                                        required
                                    />
                                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Batas Waktu (Hari)</label>
                                    <input
                                        type="number"
                                        value={data.duration_days}
                                        onChange={e => setData('duration_days', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                        placeholder="30"
                                        required
                                    />
                                    {errors.duration_days && <p className="mt-1 text-xs text-red-500">{errors.duration_days}</p>}
                                </div>
                                <div className="md:col-span-3 flex justify-end">
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
                        <p className="mt-2 text-sm text-slate-500">Belum ada kursus yang tersedia saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 line-clamp-3 flex-1">
                                        {course.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between">
                                        <span className="text-lg font-extrabold text-indigo-600">
                                            {Number(course.price) === 0
                                                ? 'Gratis'
                                                : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                        </span>
                                        <div className="flex flex-col items-end gap-1">
                                            {course.duration_days ? (
                                                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700 uppercase tracking-tighter border border-amber-200">
                                                    ⏳ {course.duration_days} HARI AKSES
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-300 uppercase">Akses Selamanya</span>
                                            )}
                                            {course.teacher && (
                                                <span className="text-xs text-slate-400">oleh {course.teacher.name}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={route('courses.show', course.id)}
                                            className="flex-1 rounded-xl border border-indigo-200 py-2 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                                        >
                                            Detail
                                        </Link>
                                        {user?.role === 'student' && (
                                            <EnrollButton courseId={course.id} />
                                        )}
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