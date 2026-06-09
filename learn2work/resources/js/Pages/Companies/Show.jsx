import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ company }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const isAdmin = user?.role === 'admin';
    
    // State for student application flow targeting specific openings
    const [selectedOpening, setSelectedOpening] = useState(null);

    // Form for student submitting CV
    const { data: applyData, setData: setApplyData, post: postApply, processing: applying, errors: applyErrors, reset: resetApply } = useForm({
        partner_company_id: company.id,
        internship_opening_id: '',
        cv_file: null,
    });

    const handleApplyClick = (opening) => {
        setSelectedOpening(opening);
        setApplyData('internship_opening_id', opening.id);
    };

    const handleApplySubmit = (e) => {
        e.preventDefault();
        postApply(route('internships.store'), {
            preserveScroll: true,
            onSuccess: () => {
                resetApply('cv_file');
                setSelectedOpening(null);
            },
        });
    };

    // Form for admin creating opening
    const [editingOpening, setEditingOpening] = useState(null);
    const { data: opData, setData: setOpData, post: postOp, patch: patchOp, processing: opProcessing, reset: resetOp, errors: opErrors } = useForm({
        title: '',
        description: '',
        status: 'open',
    });

    const startEditOp = (op) => {
        setEditingOpening(op);
        setOpData({
            title: op.title,
            description: op.description,
            status: op.status,
        });
    };

    const cancelEditOp = () => {
        setEditingOpening(null);
        resetOp();
    };

    const submitOp = (e) => {
        e.preventDefault();
        if (editingOpening) {
            patchOp(route('openings.update', editingOpening.id), {
                preserveScroll: true,
                onSuccess: () => {
                    cancelEditOp();
                }
            });
        } else {
            postOp(route('openings.store', company.id), {
                preserveScroll: true,
                onSuccess: () => resetOp()
            });
        }
    };

    const openings = company.internship_openings || [];
    const activeOpenings = openings.filter(op => op.status === 'open');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('companies.index')} className="text-slate-500 hover:text-indigo-600 transition font-medium">
                        ← Kembali ke Daftar Mitra
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800">Profil Perusahaan & Lowongan Magang</h2>
                </div>
            }
        >
            <Head title={`Profil: ${company.name}`} />

            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
                
                {/* Global Flash Success Banner */}
                {flash?.success && (
                    <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-emerald-900 shadow-sm animate-fade-in">
                        <span className="text-xl mt-0.5">🎉</span>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-emerald-950">Berhasil!</h4>
                            <p className="text-xs mt-0.5 leading-relaxed text-emerald-800">{flash.success}</p>
                        </div>
                    </div>
                )}

                {/* Main Profile Cover Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    <div className="h-32 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    </div>
                    
                    <div className="relative px-8 pb-8">
                        <div className="absolute -top-12 left-8 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                            {company.logo_url ? (
                                <img src={company.logo_url} alt={company.name} className="h-full w-full object-contain" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-3xl font-black text-indigo-600">
                                    {company.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="pt-16">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">{company.name}</h1>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                            {company.industry}
                                        </span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-sm text-slate-500 font-medium">Mitra Resmi Learn2Work</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-3">Tentang Perusahaan</h3>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                            {company.description}
                                        </p>
                                    </div>

                                    {/* STUDENT VIEW: List Available Eager Internship Openings */}
                                    {user?.role === 'student' && (
                                        <div className="pt-6 border-t border-slate-100">
                                            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                <span>💼</span> Lowongan Magang Tersedia
                                            </h3>

                                            {activeOpenings.length === 0 ? (
                                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
                                                    <p className="text-xs text-slate-400 italic">Belum ada posisi magang aktif yang dibuka oleh perusahaan ini saat ini.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {activeOpenings.map((opening) => (
                                                        <div key={opening.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200 transition">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div>
                                                                    <h4 className="font-bold text-slate-800 text-base">{opening.title}</h4>
                                                                    <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 mt-1">
                                                                        ● Status Aktif / Dibuka
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleApplyClick(opening)}
                                                                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition shrink-0"
                                                                >
                                                                    Lamar Posisi Ini
                                                                </button>
                                                            </div>
                                                            <p className="mt-3 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                                                                {opening.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Drawer Form Application CV upload specific to Opening */}
                                            {selectedOpening && (
                                                <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/30 p-6 animate-fade-in">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div>
                                                            <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                                                                <span>📄</span> Formulir Pendaftaran Magang
                                                            </h4>
                                                            <p className="text-xs text-indigo-800 font-medium mt-0.5">
                                                                Melamar untuk: <strong className="underline">{selectedOpening.title}</strong>
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => setSelectedOpening(null)}
                                                            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition"
                                                        >
                                                            ✕ Batal
                                                        </button>
                                                    </div>

                                                    <form onSubmit={handleApplySubmit} className="space-y-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                                Unggah Curriculum Vitae (CV) <span className="text-rose-500">*</span>
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept=".pdf"
                                                                onChange={(e) => setApplyData('cv_file', e.target.files[0])}
                                                                required
                                                                className="w-full text-xs text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:transition cursor-pointer border border-slate-200 rounded-xl p-2 bg-white"
                                                            />
                                                            <p className="mt-1.5 text-[11px] text-slate-500">
                                                                Format wajib <strong>PDF</strong>. Ukuran maksimal <strong>2MB</strong>.
                                                            </p>
                                                            {applyErrors.cv_file && (
                                                                <p className="mt-1 text-xs font-semibold text-rose-600">{applyErrors.cv_file}</p>
                                                            )}
                                                        </div>

                                                        <div className="flex justify-end gap-2 pt-2">
                                                            <button
                                                                type="submit"
                                                                disabled={applying || !applyData.cv_file}
                                                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                                            >
                                                                {applying ? 'Mengirim Lamaran...' : 'Kirim Lamaran Sekarang'}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                                
                                <div className="space-y-6">
                                    <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-4 text-sm">Informasi Kontak</h4>
                                        <div className="space-y-4">
                                            {company.website_url ? (
                                                <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-medium text-indigo-600 hover:underline">
                                                    <span className="text-base">🌐</span>
                                                    <span className="truncate">{company.website_url}</span>
                                                </a>
                                            ) : (
                                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                                    <span className="text-base opacity-50">🌐</span>
                                                    <span>Website tidak tersedia</span>
                                                </div>
                                            )}
                                            
                                            {company.contact_email ? (
                                                <div className="flex items-center gap-3 text-xs text-slate-600">
                                                    <span className="text-base">📧</span>
                                                    <span className="truncate">{company.contact_email}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                                    <span className="text-base opacity-50">📧</span>
                                                    <span>Email tidak tersedia</span>
                                                </div>
                                            )}

                                            {company.address && (
                                                <div className="flex items-start gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                                                    <span className="text-base mt-0.5">📍</span>
                                                    <span className="leading-relaxed">{company.address}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white shadow-lg shadow-indigo-600/20">
                                        <h4 className="font-bold text-sm mb-2">Peluang Karir Eksklusif</h4>
                                        <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                                            Selesaikan kuis pembelajaran untuk memenuhi kriteria verifikasi kompetensi.
                                        </p>
                                        <Link href={route('courses.index')} className="block w-full rounded-xl bg-white/10 py-2.5 text-center text-xs font-bold hover:bg-white/20 transition border border-white/10">
                                            Cari Kursus Terkait
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ADMIN ROLE ONLY: Internship Openings / Slots Management Panel */}
                {isAdmin && (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">💼</span>
                                <h3 className="text-lg font-bold text-slate-800">Manajemen Lowongan / Posisi Magang Mitra</h3>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Kelola pembukaan, penutupan, atau pembaruan deskripsi posisi magang untuk disajikan kepada siswa.
                            </p>
                        </div>

                        {/* Add / Edit Opening Form */}
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                                    {editingOpening ? '📝 Edit Posisi Magang' : '➕ Tambah Posisi Magang Baru'}
                                </h4>
                                {editingOpening && (
                                    <button onClick={cancelEditOp} className="text-xs font-bold text-slate-400 hover:text-slate-600">
                                        Batal Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={submitOp} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Judul Posisi</label>
                                    <input
                                        type="text"
                                        value={opData.title}
                                        onChange={e => setOpData('title', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-xs text-slate-800 outline-none transition focus:border-indigo-400 bg-white"
                                        placeholder="Cth: Frontend Engineer Intern..."
                                        required
                                    />
                                    {opErrors.title && <p className="mt-1 text-[10px] text-red-500">{opErrors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Status Awal</label>
                                    <select
                                        value={opData.status}
                                        onChange={e => setOpData('status', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-xs text-slate-800 outline-none transition focus:border-indigo-400 bg-white"
                                    >
                                        <option value="open">🟢 Buka Magang (Open)</option>
                                        <option value="closed">🔴 Tutup Magang (Closed)</option>
                                    </select>
                                    {opErrors.status && <p className="mt-1 text-[10px] text-red-500">{opErrors.status}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Kualifikasi / Deskripsi Pekerjaan</label>
                                    <textarea
                                        value={opData.description}
                                        onChange={e => setOpData('description', e.target.value)}
                                        rows="3"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-xs text-slate-800 outline-none transition focus:border-indigo-400 bg-white"
                                        placeholder="Tuliskan persyaratan keahlian, tugas magang, atau informasi lainnya..."
                                        required
                                    ></textarea>
                                    {opErrors.description && <p className="mt-1 text-[10px] text-red-500">{opErrors.description}</p>}
                                </div>

                                <div className="md:col-span-3 flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={opProcessing}
                                        className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition disabled:opacity-50"
                                    >
                                        {opProcessing ? 'Menyimpan...' : (editingOpening ? 'Simpan Perubahan' : '+ Tambahkan Posisi')}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Openings Grid / Table */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Daftar Lowongan yang Telah Dibuat</h4>
                            
                            {openings.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">Belum ada posisi magang yang ditambahkan.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {openings.map((op) => (
                                        <div key={op.id} className={`rounded-2xl border p-5 relative transition ${op.status === 'open' ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-200 bg-slate-50/50'}`}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2 ${op.status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                        {op.status === 'open' ? '● Magang Dibuka' : '● Magang Ditutup'}
                                                    </span>
                                                    <h5 className="font-bold text-slate-800 text-sm">{op.title}</h5>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1">
                                                    <Link
                                                        href={route('openings.toggle', op.id)}
                                                        method="patch"
                                                        as="button"
                                                        preserveScroll
                                                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition border ${op.status === 'open' ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                                                    >
                                                        {op.status === 'open' ? 'Tutup' : 'Buka'}
                                                    </Link>
                                                    
                                                    <button
                                                        onClick={() => startEditOp(op)}
                                                        className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 transition"
                                                        title="Edit"
                                                    >
                                                        📝
                                                    </button>

                                                    <Link
                                                        href={route('openings.destroy', op.id)}
                                                        method="delete"
                                                        as="button"
                                                        preserveScroll
                                                        onClick={(e) => {
                                                            if (!confirm('Hapus posisi magang ini secara permanen?')) e.preventDefault();
                                                        }}
                                                        className="rounded-lg p-1.5 text-rose-400 hover:text-rose-600 transition"
                                                        title="Hapus"
                                                    >
                                                        🗑
                                                    </Link>
                                                </div>
                                            </div>

                                            <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                                                {op.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
