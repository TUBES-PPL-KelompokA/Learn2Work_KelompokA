import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Learn({ course, activeModule, enrollment, submission, hasEssay }) {
    const { post, processing } = useForm();

    const activeIndex = course.modules.findIndex(m => m.id === activeModule?.id);
    const nextModule = activeIndex >= 0 && activeIndex < course.modules.length - 1
        ? course.modules[activeIndex + 1] : null;

    const handleNext = () => {
        if (nextModule) {
            post(route('student.next', { course: course.id, nextModule: nextModule.id }));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('student.dashboard')} className="text-slate-500 hover:text-indigo-600 transition">
                        ← Kembali
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800 truncate">{course.title}</h2>
                </div>
            }
        >
            <Head title={course.title} />

            <div className="flex flex-col md:flex-row gap-0 md:gap-6 px-4 py-8 sm:px-6 lg:px-8">

                {/* ── SIDEBAR: Module List ── */}
                <aside className="w-full md:w-72 shrink-0">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 px-5 py-4">
                            <h3 className="font-bold text-slate-800">📋 Daftar Modul</h3>
                            <p className="mt-1 text-xs text-slate-500">{course.modules.length} modul tersedia</p>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {course.modules.map((mod, index) => {
                                const isLocked = enrollment.current_module_id !== null
                                    && index > course.modules.findIndex(m => m.id === enrollment.current_module_id);
                                const isActive = activeModule?.id === mod.id;
                                const isDone = !isLocked && !isActive && index < (activeIndex >= 0 ? activeIndex : 0);

                                return (
                                    <li key={mod.id}>
                                        {isLocked ? (
                                            <div className="flex items-center gap-3 px-5 py-3.5 opacity-50 cursor-not-allowed">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                                                    🔒
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm text-slate-500">Modul {mod.order_number}</p>
                                                    <p className="truncate text-xs text-slate-400">{mod.title}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={route('student.learn', { course: course.id, module: mod.id })}
                                                className={`flex items-center gap-3 px-5 py-3.5 transition ${
                                                    isActive
                                                        ? 'bg-indigo-50 border-l-4 border-indigo-500'
                                                        : 'hover:bg-slate-50 border-l-4 border-transparent'
                                                }`}
                                            >
                                                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                    isActive
                                                        ? 'bg-indigo-600 text-white'
                                                        : isDone
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {isDone ? '✓' : mod.order_number}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`truncate text-sm font-medium ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>
                                                        {mod.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                <div className="flex-1 min-w-0">
                    {activeModule ? (
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            {/* Module header */}
                            <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                                    Modul {activeModule.order_number}
                                </p>
                                <h2 className="mt-1 text-xl font-bold text-slate-800">{activeModule.title}</h2>
                            </div>

                            {/* Content area */}
                            <div className="p-6">
                                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                                    {activeModule.content_url ? (
                                        <>
                                            <div className="mb-4 text-5xl">🎬</div>
                                            <p className="mb-4 text-sm text-slate-500">Klik tombol di bawah untuk membuka materi</p>
                                            <a
                                                href={activeModule.content_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
                                            >
                                                📎 Buka Materi / Video
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4 text-5xl">📄</div>
                                            <p className="text-slate-500">Tidak ada lampiran materi untuk modul ini.</p>
                                        </>
                                    )}
                                </div>

                                {activeModule.text_content && (
                                    <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <span>📖</span> Materi Teks
                                        </h4>
                                        <div className="prose prose-slate max-w-none text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                                            {activeModule.text_content}
                                        </div>
                                    </div>
                                )}

                                {activeModule.quiz && (
                                    <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 text-center md:text-left">
                                                <div className="text-4xl">📝</div>
                                                <div>
                                                    <h4 className="font-bold text-amber-800">Evaluasi Modul Tersedia</h4>
                                                    <p className="text-sm text-amber-600">Selesaikan quiz ini untuk mengukur pemahaman Anda.</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('quizzes.take', activeModule.quiz.id)}
                                                className="rounded-xl bg-amber-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-500 hover:-translate-y-0.5"
                                            >
                                                {submission ? 'Ambil Ulang Quiz' : 'Ambil Quiz Sekarang →'}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {submission && (
                                    <div className="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-2xl">📊</span>
                                            <h4 className="font-bold text-slate-800">Hasil Evaluasi</h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {!hasEssay && (
                                                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Skor Anda</p>
                                                    <p className={`text-3xl font-black mt-1 ${submission.score >= 80 ? 'text-green-600' : 'text-rose-600'}`}>
                                                        {submission.score}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">KKM: 80</p>
                                                </div>
                                            )}
                                            <div className={`rounded-xl bg-slate-50 p-4 border border-slate-100 ${hasEssay ? 'md:col-span-2' : ''}`}>
                                                <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                                                <div className="mt-2">
                                                    {submission.status === 'pending' ? (
                                                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                                                            ⏳ Menunggu Koreksi Essay
                                                        </span>
                                                    ) : (hasEssay || submission.score >= 80) ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                                            ✅ Selesai
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                                                            ❌ Belum Lulus (Minimal 80)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {submission.teacher_feedback && (
                                            <div className="mt-6 rounded-xl bg-indigo-50 p-5 border border-indigo-100">
                                                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                                                    <span className="text-lg">💬</span>
                                                    <span className="text-sm font-bold">Feedback Pengajar:</span>
                                                </div>
                                                <p className="text-sm text-slate-700 italic leading-relaxed">
                                                    "{submission.teacher_feedback}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                                    {activeIndex > 0 ? (
                                        <Link
                                            href={route('student.learn', { course: course.id, module: course.modules[activeIndex - 1].id })}
                                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                                        >
                                            ← Modul Sebelumnya
                                        </Link>
                                    ) : <div />}

                                    {nextModule ? (
                                        <div className="flex flex-col items-end gap-2">
                                            {activeModule.quiz && (!submission || (!hasEssay && submission.score < 80)) && (
                                                <p className="text-[10px] font-bold text-rose-500 uppercase">
                                                    ⚠️ Harus Selesaikan Quiz Untuk Lanjut
                                                </p>
                                            )}
                                            <button
                                                onClick={handleNext}
                                                disabled={processing || (activeModule.quiz && (!submission || (!hasEssay && submission.score < 80)))}
                                                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-500 disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Selesai & Lanjut →
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md">
                                            🎉 Kursus Selesai!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-24 text-center">
                            <div className="mb-4 text-6xl">👈</div>
                            <h3 className="text-lg font-semibold text-slate-700">Pilih Modul</h3>
                            <p className="mt-2 text-sm text-slate-500">Pilih modul di sebelah kiri untuk mulai belajar</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
