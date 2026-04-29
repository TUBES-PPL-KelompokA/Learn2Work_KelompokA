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
        post(route('questions.store', quiz.id), { 
            onSuccess: () => reset() 
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Pembuat Soal: {quiz.title}</h2>}>
            <Head title="Buat Soal" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* Bagian 1: Form Input */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Tambah Soal Baru</h3>
                    <form onSubmit={submitQuestion} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Tipe Soal</label>
                            <select 
                                value={data.type} 
                                onChange={e => setData('type', e.target.value)} 
                                className="mt-1 block w-full rounded-md border-gray-300"
                            >
                                <option value="pg">Pilihan Ganda</option>
                                <option value="essay">Essay</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Pertanyaan</label>
                            <textarea 
                                value={data.question_text} 
                                onChange={e => setData('question_text', e.target.value)} 
                                className="mt-1 block w-full rounded-md border-gray-300" 
                                required 
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Implementasi Komponen Opsi */}
                        {data.type === 'pg' && (
                            <QuestionOptions options={data.options} setData={setData} />
                        )}

                        {/* Input Kunci Jawaban & Feedback */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-green-700">Kunci Jawaban</label>
                                {data.type === 'pg' ? (
                                    <select 
                                        value={data.correct_answer} 
                                        onChange={e => setData('correct_answer', e.target.value)} 
                                        className="mt-1 block w-full rounded-md border-green-300"
                                    >
                                        <option value="">Pilih Kunci...</option>
                                        <option value="a">A</option>
                                        <option value="b">B</option>
                                        <option value="c">C</option>
                                        <option value="d">D</option>
                                    </select>
                                ) : (
                                    <input 
                                        type="text" 
                                        placeholder="Kata kunci jawaban essay..." 
                                        value={data.correct_answer} 
                                        onChange={e => setData('correct_answer', e.target.value)} 
                                        className="mt-1 block w-full rounded-md border-green-300" 
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700">Feedback (Opsional)</label>
                                <input 
                                    type="text" 
                                    placeholder="Penjelasan..." 
                                    value={data.feedback} 
                                    onChange={e => setData('feedback', e.target.value)} 
                                    className="mt-1 block w-full rounded-md border-blue-300" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Simpan Soal
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}