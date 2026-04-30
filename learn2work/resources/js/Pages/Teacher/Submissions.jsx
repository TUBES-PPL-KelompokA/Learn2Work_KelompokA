import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Submissions({ submissions }) {
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const { data, setData, patch, processing, reset } = useForm({
        teacher_feedback: '',
    });

    const submitFeedback = (e) => {
        e.preventDefault();
        patch(route('submissions.update', selectedSubmission.id), {
            onSuccess: () => {
                reset();
                setSelectedSubmission(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold text-slate-800">📝 Penilaian & Feedback Essay</h2>
            }
        >
            <Head title="Penilaian" />

            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Siswa</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kursus / Quiz</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Skor</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-slate-500">
                                        Belum ada submission yang perlu dinilai.
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800">{sub.user.name}</p>
                                            <p className="text-xs text-slate-400">{sub.user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-indigo-600">{sub.quiz.module.course.title}</p>
                                            <p className="text-xs text-slate-500">{sub.quiz.title}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-black text-slate-800">{sub.score}</span>
                                            <span className="text-xs text-slate-400 ml-1">/ 100</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                                {sub.status === 'pending' ? 'Menunggu Feedback' : 'Selesai'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedSubmission(sub);
                                                    setData('teacher_feedback', sub.teacher_feedback || '');
                                                }}
                                                className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
                                            >
                                                Lihat Jawaban & Beri Feedback
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Feedback Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Evaluasi Jawaban</h3>
                                <p className="text-sm text-slate-500">Siswa: {selectedSubmission.user.name}</p>
                            </div>
                            <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto mb-6 pr-2">
                            {/* Answers Section */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Jawaban Essay</h4>
                                { (selectedSubmission.answers || []).filter(a => a.type === 'essay').map((ans, i) => (
                                    <div key={i} className="mb-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                                        <p className="text-xs font-bold text-indigo-600 mb-1">Pertanyaan Essay #{i+1}</p>
                                        <p className="text-sm text-slate-700 italic leading-relaxed">"{ans.answer}"</p>
                                    </div>
                                ))}
                                { (selectedSubmission.answers || []).filter(a => a.type === 'essay').length === 0 && (
                                    <p className="text-sm text-slate-400 italic">Tidak ada pertanyaan essay di quiz ini.</p>
                                )}
                            </div>

                            {/* Feedback Form */}
                            <form onSubmit={submitFeedback} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Feedback & Catatan Pengajar</label>
                                    <textarea
                                        value={data.teacher_feedback}
                                        onChange={e => setData('teacher_feedback', e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                                        placeholder="Tulis saran atau evaluasi untuk siswa..."
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Mengirim...' : 'Simpan & Kirim Feedback'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
