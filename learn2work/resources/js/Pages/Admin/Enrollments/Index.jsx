import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ enrollments }) {
    const { flash } = usePage().props;
    const [processing, setProcessing] = useState(false);

    const handleApprove = (id) => {
        if (confirm('Apakah Anda yakin ingin menyetujui pembayaran ini dan membuka akses kursus bagi siswa?')) {
            setProcessing(true);
            router.patch(route('admin.payments.approve', id), {}, {
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
                        <h2 className="text-xl font-bold text-slate-800">Verifikasi Pembayaran Siswa</h2>
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
            <Head title="Verifikasi Pembayaran" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Flash Alert */}
                    {flash?.success && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-emerald-800 shadow-sm animate-fade-in">
                            <span className="text-xl">✅</span>
                            <p className="text-sm font-semibold">{flash.success}</p>
                        </div>
                    )}

                    {/* Main Container */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        {/* Internal Header */}
                        <div className="border-b border-slate-100 bg-slate-50 px-8 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">💳</span>
                                <div>
                                    <h3 className="font-bold text-slate-800">Daftar Transaksi Masuk</h3>
                                    <p className="text-xs text-slate-500">
                                        Menampilkan pendaftaran berstatus <span className="font-bold text-amber-600">Pending</span> yang menunggu validasi transfer.
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                {enrollments.length} Perlu Tindakan
                            </span>
                        </div>

                        {/* Table Layout */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="py-4 pl-8 pr-4">Nama Siswa</th>
                                        <th className="px-4 py-4">Kursus Pembelajaran</th>
                                        <th className="px-4 py-4">Harga Kursus</th>
                                        <th className="px-4 py-4 text-center">Bukti Transfer</th>
                                        <th className="py-4 pl-4 pr-8 text-right">Aksi Verifikasi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                                    {enrollments.map((enrollment) => (
                                        <tr key={enrollment.id} className="hover:bg-slate-50/50 transition">
                                            <td className="py-4 pl-8 pr-4">
                                                <div className="font-bold text-slate-900">{enrollment.user?.name}</div>
                                                <div className="text-xs text-slate-400">{enrollment.user?.email}</div>
                                            </td>
                                            <td className="px-4 py-4 font-medium text-slate-800">
                                                {enrollment.course?.title}
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-indigo-600">
                                                Rp {new Intl.NumberFormat('id-ID').format(enrollment.course?.price || 0)}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {enrollment.payment_proof ? (
                                                    <a
                                                        href={route('admin.proofs.show', enrollment.id)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition"
                                                    >
                                                        <span>🔍</span> Lihat Bukti
                                                    </a>
                                                ) : (
                                                    <span className="text-xs italic text-slate-400">Tidak ada lampiran</span>
                                                )}
                                            </td>
                                            <td className="py-4 pl-4 pr-8 text-right">
                                                <button
                                                    onClick={() => handleApprove(enrollment.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition disabled:opacity-40"
                                                >
                                                    <span>✓</span> Setujui & Akses
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {enrollments.length === 0 && (
                                        <tr>
                                            <td colspan="5" className="py-16 text-center">
                                                <div className="text-4xl mb-3">🎉</div>
                                                <h4 className="font-bold text-slate-700">Semua Pembayaran Tervalidasi</h4>
                                                <p className="text-xs text-slate-400 mt-1">Saat ini tidak ada antrean pendaftaran yang butuh persetujuan.</p>
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
