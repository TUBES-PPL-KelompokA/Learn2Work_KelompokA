import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Payment({ course }) {
    const [preview, setPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('payment_proof', file);
            setPreview(URL.createObjectURL(file));
        } else {
            setData('payment_proof', null);
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('enrollments.store', course.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('courses.index')} className="text-slate-500 hover:text-indigo-600 transition font-medium text-sm">
                        ← Kembali ke Katalog
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800 text-base truncate">Konfirmasi Pembayaran</h2>
                </div>
            }
        >
            <Head title={`Pembayaran: ${course.title}`} />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 px-8 py-8 text-white relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-xl" />
                        <div className="relative z-10">
                            <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-widest mb-2">
                                Instruksi Transfer Bank
                            </span>
                            <h1 className="text-2xl font-black tracking-tight">{course.title}</h1>
                            <p className="mt-1 text-slate-300 text-xs max-w-xl">
                                Selesaikan pembayaran untuk membuka seluruh materi, modul penugasan, dan sertifikasi.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                        
                        {/* Left Side: Bank Accounts & Total Fee */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Tagihan</h3>
                                <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-100 flex items-baseline justify-between">
                                    <span className="text-xs text-slate-500 font-medium">Biaya Pendaftaran</span>
                                    <span className="text-2xl font-black text-indigo-600">
                                        Rp {Number(course.price).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Pilihan Bank Tujuan</h3>
                                
                                <div className="space-y-3">
                                    {/* Bank 1 */}
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-extrabold text-slate-800 text-sm">Bank Central Asia (BCA)</span>
                                            <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">Verifikasi Cepat</span>
                                        </div>
                                        <p className="font-mono text-lg font-bold tracking-wider text-slate-900">8820-1122-3344</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">a.n PT. Learn2Work Edukasi Indonesia</p>
                                    </div>

                                    {/* Bank 2 */}
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-extrabold text-slate-800 text-sm">Bank Mandiri</span>
                                            <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">Reguler</span>
                                        </div>
                                        <p className="font-mono text-lg font-bold tracking-wider text-slate-900">123-000-999-888</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">a.n PT. Learn2Work Edukasi Indonesia</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-amber-50 p-3 border border-amber-100 flex items-start gap-2.5 text-amber-900">
                                <span className="text-base mt-0.5">💡</span>
                                <p className="text-[11px] leading-relaxed">
                                    Simpan struk atau *screenshot* bukti transfer setelah transaksi berhasil untuk diunggah pada form di samping.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Upload File Form */}
                        <div className="rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                            <form onSubmit={submit} className="space-y-4 flex-1 flex flex-col">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                        Unggah Bukti Pembayaran <span className="text-rose-500">*</span>
                                    </label>
                                    
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="proof"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleImageChange}
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${preview ? 'border-indigo-300 bg-indigo-50/20' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/60'}`}>
                                            {preview ? (
                                                <div className="space-y-2 w-full">
                                                    <div className="max-h-48 overflow-hidden rounded-xl border border-slate-200 bg-white">
                                                        <img src={preview} alt="Pratinjau Bukti" className="w-full h-full object-contain" />
                                                    </div>
                                                    <p className="text-[11px] font-bold text-indigo-600">Klik atau seret untuk mengganti gambar</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2 py-6">
                                                    <span className="text-4xl block">📸</span>
                                                    <p className="text-xs font-bold text-slate-700">Pilih berkas gambar bukti bayar</p>
                                                    <p className="text-[10px] text-slate-400">Mendukung format JPG, JPEG, atau PNG (Maks 2MB)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {errors.payment_proof && (
                                        <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.payment_proof}</p>
                                    )}
                                </div>

                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.payment_proof}
                                        className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
                                    >
                                        {processing ? 'Mengirim Data...' : 'Kirim Konfirmasi Pembayaran'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
