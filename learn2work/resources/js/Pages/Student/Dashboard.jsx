import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ enrollments }) {
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

            <div className="px-4 py-8 sm:px-6 lg:px-8">
                {enrollments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                        <div className="mb-4 text-6xl">📚</div>
                        <h3 className="text-lg font-semibold text-slate-700">Belum ada kursus</h3>
                        <p className="mt-2 text-sm text-slate-500">Anda belum bergabung ke kursus manapun.</p>
                        <Link
                            href={route('courses.index')}
                            className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                        >
                            Jelajahi Kursus Sekarang
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                            >
                                {/* Card header gradient */}
                                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <h3 className="font-bold text-slate-800 line-clamp-2">
                                            {enrollment.course.title}
                                        </h3>
                                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                            enrollment.status === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {enrollment.status === 'paid' ? '✅ Aktif' : enrollment.status}
                                        </span>
                                    </div>

                                    {enrollment.remaining_days !== null && (
                                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
                                            <span className="text-sm">⏳</span>
                                            <span className="text-xs font-bold text-slate-600">
                                                Sisa Waktu: <span className={enrollment.remaining_days <= 3 ? 'text-red-600' : 'text-indigo-600'}>
                                                    {enrollment.remaining_days} Hari
                                                </span>
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4">
                                        <Link
                                            href={route('student.learn', { course: enrollment.course.id })}
                                            className="block w-full rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 hover:shadow-indigo-500/30"
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
