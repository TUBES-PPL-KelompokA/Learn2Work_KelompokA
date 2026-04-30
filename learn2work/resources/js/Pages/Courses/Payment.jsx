import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Payment({ course }) {
    const { post, processing } = useForm();

    const handlePayment = (e) => {
        e.preventDefault();
        post(route('enrollments.store', course.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('courses.show', course.id)} className="text-slate-500 hover:text-indigo-600 transition">
                        ← Kembali
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800">Pembayaran Kursus</h2>
                </div>
            }
        >
            <Head title="Pembayaran Kursus" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    
                    {/* Left: Course Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Ringkasan Kursus</h3>
                            <div className="flex gap-4">
                                <div className="h-20 w-20 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center text-3xl">
                                    📚
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{course.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{course.description}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            ⏳ Akses {course.duration_days} Hari
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Pilih Metode Pembayaran</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <label className="flex items-center justify-between rounded-xl border-2 border-indigo-600 bg-indigo-50 px-5 py-4 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full border-4 border-indigo-600 bg-white" />
                                        <div>
                                            <p className="font-bold text-slate-800">Saldo Belajar (Simulasi)</p>
                                            <p className="text-xs text-slate-500">Bayar instan menggunakan saldo akun</p>
                                        </div>
                                    </div>
                                    <span className="text-xl">💳</span>
                                </label>
                                <div className="opacity-40 grayscale pointer-events-none">
                                    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="h-5 w-5 rounded-full border border-slate-300" />
                                            <div>
                                                <p className="font-bold text-slate-800">Transfer Bank</p>
                                                <p className="text-xs text-slate-500">Coming Soon</p>
                                            </div>
                                        </div>
                                        <span className="text-xl">🏦</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Price Breakdown */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Detail Harga</h3>
                            <div className="space-y-3 pb-6 border-b border-slate-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Harga Kursus</span>
                                    <span className="font-medium text-slate-800">
                                        Rp {Number(course.price).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Biaya Layanan</span>
                                    <span className="font-medium text-green-600">Gratis</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-6 mb-8">
                                <span className="font-bold text-slate-800">Total Bayar</span>
                                <span className="text-xl font-black text-indigo-600">
                                    Rp {Number(course.price).toLocaleString('id-ID')}
                                </span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Bayar Sekarang'}
                            </button>
                            
                            <p className="mt-4 text-[10px] text-center text-slate-400 leading-relaxed">
                                Dengan menekan tombol di atas, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi Learn2Work.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
