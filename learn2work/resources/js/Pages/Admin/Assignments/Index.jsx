import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ courses, teachers }) {
    const { flash, errors } = usePage().props;
    const [selectedTeachers, setSelectedTeachers] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleTeacherChange = (courseId, teacherId) => {
        setSelectedTeachers(prev => ({ ...prev, [courseId]: teacherId }));
        setProcessing(true);
        router.patch(route('assignments.update', courseId), { teacher_id: teacherId }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false)
        });
    };

    const handleRemoveTeacher = (courseId) => {
        if (confirm('Apakah Anda yakin ingin mencopot guru yang bertugas dari kursus ini?')) {
            setProcessing(true);
            router.delete(route('assignments.destroy', courseId), {
                preserveScroll: true,
                onFinish: () => setProcessing(false)
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Dashboard Admin</p>
                        <h2 className="text-xl font-bold text-slate-800">Manajemen Penugasan Guru (1 Kursus = 1 Guru)</h2>
                    </div>
                    <Link
                        href={route('dashboard')}
                        className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Penugasan Guru" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Flash Notifications */}
                    {flash?.success && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-emerald-800 shadow-sm animate-fade-in">
                            <span className="text-xl">✅</span>
                            <p className="text-sm font-semibold">{flash.success}</p>
                        </div>
                    )}
                    {errors?.course_id && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-rose-50 p-4 border border-rose-100 text-rose-800 shadow-sm animate-fade-in">
                            <span className="text-xl">⚠️</span>
                            <p className="text-sm font-semibold">{errors.course_id}</p>
                        </div>
                    )}

                    {/* Instruction Card */}
                    <div className="mb-8 rounded-2xl bg-indigo-50/50 p-6 border border-indigo-100">
                        <h4 className="font-bold text-indigo-950 text-sm mb-1 flex items-center gap-2">
                            <span>📌</span> Aturan Logika Bisnis Penugasan
                        </h4>
                        <p className="text-xs text-indigo-900/80 leading-relaxed">
                            Setiap kursus pembelajaran hanya dapat diisi oleh <strong>maksimal satu orang pengajar</strong>. 
                            Namun, satu orang pengajar yang sama diizinkan untuk mengampu beberapa kursus berbeda secara serentak.
                        </p>
                    </div>

                    {/* Main Content Table */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        <div className="border-b border-slate-100 bg-slate-50 px-8 py-5 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800">Daftar Penugasan Aktif</h3>
                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                                {courses.length} Kursus Tersedia
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="py-4 pl-8 pr-4">Judul Kursus Pembelajaran</th>
                                        <th className="px-4 py-4">Pengajar Saat Ini</th>
                                        <th className="py-4 pl-4 pr-8 text-right">Aksi Penugasan / Ganti Guru</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                                    {courses.map((course) => (
                                        <tr key={course.id} className="hover:bg-slate-50/50 transition">
                                            <td className="py-4 pl-8 pr-4">
                                                <div className="font-bold text-slate-900">{course.title}</div>
                                                <div className="text-xs text-slate-400 line-clamp-1">{course.description}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                {course.teacher ? (
                                                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                                                        <span>👨‍🏫</span> {course.teacher.name}
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 border border-rose-100">
                                                        <span>⚠️</span> Belum Ada Guru Ditugaskan
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 pl-4 pr-8 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <select
                                                        value={selectedTeachers[course.id] || course.teacher_id || ''}
                                                        onChange={(e) => handleTeacherChange(course.id, e.target.value)}
                                                        disabled={processing}
                                                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white disabled:opacity-50"
                                                    >
                                                        <option value="" disabled>Pilih Pengajar...</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.id} value={teacher.id}>
                                                                {teacher.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {course.teacher_id && (
                                                        <button
                                                            onClick={() => handleRemoveTeacher(course.id)}
                                                            disabled={processing}
                                                            title="Copot Penugasan"
                                                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition disabled:opacity-40"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {courses.length === 0 && (
                                        <tr>
                                            <td colspan="3" className="py-16 text-center text-slate-400 italic">
                                                Belum ada data kursus yang tersedia untuk dikelola.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
