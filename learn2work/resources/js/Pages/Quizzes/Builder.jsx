import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Builder({ quiz }) {
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState('pg');
    const [editingQuestion, setEditingQuestion] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        type: 'pg',
        question_text: '',
        options: { A: '', B: '', C: '', D: '' },
        correct_answer: '',
        feedback: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingQuestion) {
            router.patch(route('questions.update', editingQuestion.id), data, {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                    setEditingQuestion(null);
                },
            });
        } else {
            post(route('questions.store', quiz.id), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const startEdit = (question) => {
        setEditingQuestion(question);
        setType(question.type);
        setData({
            type: question.type,
            question_text: question.question_text,
            options: question.type === 'pg' ? question.options : { A: '', B: '', C: '', D: '' },
            correct_answer: question.correct_answer || '',
            feedback: question.feedback || '',
        });
        setShowForm(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('courses.index')} className="text-slate-500 hover:text-indigo-600">
                            ← Kursus
                        </Link>
                        <span className="text-slate-300">/</span>
                        <h2 className="font-bold text-slate-800">{quiz.title}</h2>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500"
                    >
                        {showForm ? 'Batal' : '➕ Tambah Pertanyaan'}
                    </button>
                </div>
            }
        >
            <Head title={`Builder: ${quiz.title}`} />

            <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-6">
                
                {showForm && (
                    <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editingQuestion ? '📝 Edit Pertanyaan' : '✨ Pertanyaan Baru'}
                            </h3>
                            {editingQuestion && (
                                <button 
                                    onClick={() => { setEditingQuestion(null); reset(); setShowForm(false); }}
                                    className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                                >
                                    Batal Edit
                                </button>
                            )}
                        </div>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Pertanyaan</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => { setType('pg'); setData('type', 'pg'); }}
                                            className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition ${type === 'pg' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            Pilihan Ganda
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setType('essay'); setData('type', 'essay'); }}
                                            className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition ${type === 'essay' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            Essay
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Pertanyaan</label>
                                    <textarea
                                        value={data.question_text}
                                        onChange={e => setData('question_text', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                                        placeholder="Masukkan teks pertanyaan..."
                                        rows="2"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {type === 'pg' && (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {['A', 'B', 'C', 'D'].map((opt) => (
                                        <div key={opt}>
                                            <label className="block text-xs font-bold text-slate-400 mb-1">Opsi {opt}</label>
                                            <input
                                                type="text"
                                                value={data.options[opt]}
                                                onChange={e => setData('options', { ...data.options, [opt]: e.target.value })}
                                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                                                placeholder={`Jawaban ${opt}`}
                                                required
                                            />
                                        </div>
                                    ))}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Jawaban Benar</label>
                                        <select
                                            value={data.correct_answer}
                                            onChange={e => setData('correct_answer', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                                            required
                                        >
                                            <option value="">Pilih Kunci Jawaban</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Pertanyaan'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                    <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                        <h3 className="font-bold text-slate-800">Daftar Pertanyaan ({quiz.questions.length})</h3>
                    </div>
                    {quiz.questions.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl mb-4">📝</div>
                            <p className="text-slate-500">Belum ada pertanyaan. Mulai buat sekarang!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {quiz.questions.map((q, idx) => (
                                <div key={q.id} className="p-6 hover:bg-slate-50 transition group">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                                                    {q.type === 'pg' ? 'Pilihan Ganda' : 'Essay'}
                                                </span>
                                                <span className="text-xs text-slate-400">Pertanyaan #{idx + 1}</span>
                                            </div>
                                            <p className="font-bold text-slate-800">{q.question_text}</p>
                                            
                                            {q.type === 'pg' && q.options && (
                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {Object.entries(q.options).map(([key, val]) => (
                                                        <div key={key} className={`rounded-lg border px-3 py-2 text-sm ${q.correct_answer === key ? 'border-green-200 bg-green-50 text-green-700 font-semibold' : 'border-slate-100 bg-white text-slate-600'}`}>
                                                            <span className="mr-2 opacity-50">{key}.</span> {val}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => startEdit(q)}
                                                className="opacity-0 group-hover:opacity-100 rounded-lg p-2 text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => confirm('Hapus pertanyaan ini?') && router.delete(route('questions.destroy', q.id))}
                                                className="opacity-0 group-hover:opacity-100 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
