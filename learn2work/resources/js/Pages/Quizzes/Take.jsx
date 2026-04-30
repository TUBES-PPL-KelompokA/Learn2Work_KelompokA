import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Take({ quiz }) {
    const { data, setData, post, processing } = useForm({
        answers: quiz.questions.map(q => ({
            question_id: q.id,
            type: q.type,
            answer: ''
        }))
    });

    const handleAnswerChange = (questionId, value) => {
        const newAnswers = data.answers.map(a => 
            a.question_id === questionId ? { ...a, answer: value } : a
        );
        setData('answers', newAnswers);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('quizzes.submit', quiz.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('student.learn', { course: quiz.module.course_id, module: quiz.module_id })} className="text-slate-500 hover:text-indigo-600">
                            ← Kembali
                        </Link>
                        <span className="text-slate-300">/</span>
                        <h2 className="font-bold text-slate-800">{quiz.title}</h2>
                    </div>
                </div>
            }
        >
            <Head title={`Mengerjakan: ${quiz.title}`} />

            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-8">
                    {quiz.questions.map((q, idx) => (
                        <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                            <div className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                                    {idx + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="text-lg font-bold text-slate-800 mb-6">{q.question_text}</p>
                                    
                                    {q.type === 'pg' ? (
                                        <div className="grid grid-cols-1 gap-3">
                                            {Object.entries(q.options || {}).map(([key, val]) => (
                                                <label 
                                                    key={key} 
                                                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
                                                        data.answers.find(a => a.question_id === q.id)?.answer === key
                                                            ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                                            : 'border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <input 
                                                        type="radio" 
                                                        name={`question-${q.id}`} 
                                                        value={key}
                                                        onChange={() => handleAnswerChange(q.id, key)}
                                                        className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                                                        required
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-400">{key}.</span>
                                                        <span className="text-slate-700">{val}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <textarea
                                            rows="5"
                                            value={data.answers.find(a => a.question_id === q.id)?.answer}
                                            onChange={e => handleAnswerChange(q.id, e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 p-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                                            placeholder="Tulis jawaban essay Anda di sini..."
                                            required
                                        ></textarea>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-indigo-600 px-12 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:bg-indigo-500 hover:-translate-y-1 disabled:opacity-50"
                        >
                            {processing ? 'Mengirim...' : 'Kumpulkan Quiz ✨'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
