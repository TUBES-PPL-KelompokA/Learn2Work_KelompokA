import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Builder({ quiz }) {
    const { data, setData, post, processing, reset } = useForm({
        type: 'pg',
        question_text: '',
        options: { a: '', b: '', c: '', d: '' },
        correct_answer: '',
        feedback: '',
    });

    const submitQuestion = (e) => {
        e.preventDefault();
        post(route('questions.store', quiz.id), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Pembuat Soal: {quiz.title}</h2>}>
            <Head title="Buat Soal" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* Form Tambah Soal */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Tambah Soal Baru</h3>
                    <form onSubmit={submitQuestion} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Tipe Soal</label>
                            <select value={data.type} onChange={e => setData('type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300">
                                <option value="pg">Pilihan Ganda</option>
                                <option value="essay">Essay</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Pertanyaan</label>
                            <textarea value={data.question_text} onChange={e => setData('question_text', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required rows="3"></textarea>
                        </div>

                        {/* Jika Pilihan Ganda, tampilkan input A, B, C, D */}
                        {data.type === 'pg' && (
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md border">
                                {['a', 'b', 'c', 'd'].map((opt) => (
                                    <div key={opt}>
                                        <label className="block text-sm font-medium uppercase">Opsi {opt}</label>
                                        <input type="text" value={data.options[opt]} onChange={e => setData('options', { ...data.options, [opt]: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300" required />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-green-700">Kunci Jawaban</label>
                                {data.type === 'pg' ? (
                                    <select value={data.correct_answer} onChange={e => setData('correct_answer', e.target.value)} className="mt-1 block w-full rounded-md border-green-300">
                                        <option value="">Pilih Kunci...</option>
                                        <option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option>
                                    </select>
                                ) : (
                                    <input type="text" placeholder="Kata kunci jawaban essay..." value={data.correct_answer} onChange={e => setData('correct_answer', e.target.value)} className="mt-1 block w-full rounded-md border-green-300" />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700">Feedback (Opsional)</label>
                                <input type="text" placeholder="Penjelasan setelah dijawab..." value={data.feedback} onChange={e => setData('feedback', e.target.value)} className="mt-1 block w-full rounded-md border-blue-300" />
                            </div>
                        </div>

                        <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Simpan Soal</button>
                    </form>
                </div>

                {/* Daftar Soal yang Sudah Dibuat */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Daftar Soal ({quiz.questions.length})</h3>
                    <div className="space-y-4">
                        {quiz.questions.map((q, index) => (
                            <div key={q.id} className="p-4 border rounded-md">
                                <div className="flex justify-between">
                                    <span className="font-bold">{index + 1}. {q.type === 'pg' ? '[Pilihan Ganda]' : '[Essay]'}</span>
                                    <Link href={route('questions.destroy', q.id)} method="delete" as="button" className="text-red-600 text-sm hover:underline">Hapus</Link>
                                </div>
                                <p className="mt-2">{q.question_text}</p>
                                {q.type === 'pg' && q.options && (
                                    <ul className="ml-4 mt-2 list-disc text-sm text-gray-600">
                                        <li>A. {q.options.a}</li><li>B. {q.options.b}</li><li>C. {q.options.c}</li><li>D. {q.options.d}</li>
                                    </ul>
                                )}
                                <div className="mt-3 text-sm">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Kunci: {q.correct_answer}</span>
                                    {q.feedback && <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">Feedback: {q.feedback}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
