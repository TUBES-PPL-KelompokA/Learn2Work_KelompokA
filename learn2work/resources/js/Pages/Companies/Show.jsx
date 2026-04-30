import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ company }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('companies.index')} className="text-slate-500 hover:text-indigo-600 transition">
                        ← Kembali
                    </Link>
                    <span className="text-slate-300">/</span>
                    <h2 className="font-bold text-slate-800">Detail Perusahaan</h2>
                </div>
            }
        >
            <Head title={`Profil: ${company.name}`} />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {/* Header/Cover color */}
                    <div className="h-32 bg-slate-900" />
                    
                    <div className="relative px-8 pb-8">
                        {/* Logo position */}
                        <div className="absolute -top-12 left-8 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                            {company.logo_url ? (
                                <img src={company.logo_url} alt={company.name} className="h-full w-full object-contain" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-3xl font-bold text-indigo-600">
                                    {company.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="pt-16">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-800">{company.name}</h1>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                            {company.industry}
                                        </span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-sm text-slate-500">Mitra Resmi Learn2Work</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Tentang Perusahaan</h3>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        {company.description}
                                    </p>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-4">Informasi Kontak</h4>
                                        <div className="space-y-4">
                                            {company.website_url ? (
                                                <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-indigo-600 hover:underline">
                                                    <span className="text-lg">🌐</span>
                                                    <span className="truncate">{company.website_url}</span>
                                                </a>
                                            ) : (
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <span className="text-lg opacity-50">🌐</span>
                                                    <span>Website tidak tersedia</span>
                                                </div>
                                            )}
                                            
                                            {company.contact_email ? (
                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <span className="text-lg">📧</span>
                                                    <span className="truncate">{company.contact_email}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <span className="text-lg opacity-50">📧</span>
                                                    <span>Email tidak tersedia</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-600/20">
                                        <h4 className="font-bold mb-2">Peluang Karir</h4>
                                        <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                                            Selesaikan kursus relevan untuk mendapatkan rekomendasi karir di {company.name}.
                                        </p>
                                        <Link href={route('courses.index')} className="block w-full rounded-xl bg-white/20 py-2 text-center text-xs font-bold hover:bg-white/30 transition">
                                            Cari Kursus Terkait
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
