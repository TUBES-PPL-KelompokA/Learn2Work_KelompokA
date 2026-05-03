import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ companies }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user?.role === 'admin';

    const [editingCompany, setEditingCompany] = useState(null);
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: '',
        industry: '',
        description: '',
        contact_email: '',
        website_url: '',
        logo_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingCompany) {
            patch(route('companies.update', editingCompany.id), {
                onSuccess: () => {
                    reset();
                    setEditingCompany(null);
                }
            });
        } else {
            post(route('companies.store'), { onSuccess: () => reset() });
        }
    };

    const startEdit = (company) => {
        setEditingCompany(company);
        setData({
            name: company.name,
            industry: company.industry,
            description: company.description,
            contact_email: company.contact_email || '',
            website_url: company.website_url || '',
            logo_url: company.logo_url || '',
        });
    };

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">🏢 Mitra Perusahaan</h2>
                    <span className="text-sm text-slate-500">{companies.length} mitra bergabung</span>
                </div>
            }
        >
            <Head title="Mitra Perusahaan" />

            <div className="px-4 py-8 sm:px-6 lg:px-8 space-y-8">
                
                {/* Hero Section (Look like Upskill/Professional) */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:p-12">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-extrabold md:text-4xl">Terhubung dengan Industri Impian Anda</h1>
                        <p className="mt-4 text-lg text-slate-300">
                            Kami bekerja sama dengan berbagai perusahaan terkemuka untuk memberikan akses pembelajaran yang relevan dan peluang karir yang nyata bagi para siswa.
                        </p>
                    </div>
                    {/* Abstract background shapes */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
                </div>

                {/* Form Tambah Perusahaan (Hanya Admin) */}
                {isAdmin && (
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-800">{editingCompany ? '📝 Edit Mitra' : '✨ Tambah Mitra Baru'}</h3>
                                <p className="text-sm text-slate-500 mt-1">Kelola jaringan kemitraan industri Learn2Work</p>
                            </div>
                            {editingCompany && (
                                <button 
                                    onClick={() => { setEditingCompany(null); reset(); }}
                                    className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                                >
                                    Batal Edit
                                </button>
                            )}
                        </div>
                        <div className="p-6">
                            <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Perusahaan</label>
                                    <input 
                                        type="text" 
                                        dusk="company-name"
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        placeholder="Cth: PT. Teknologi Maju"
                                        required 
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Industri / Sektor</label>
                                    <input 
                                        type="text" 
                                        dusk="industry"
                                        placeholder="Cth: Teknologi, Perbankan" 
                                        value={data.industry} 
                                        onChange={e => setData('industry', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        required 
                                    />
                                    {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Kontak</label>
                                    <input 
                                        type="email" 
                                        dusk="contact-email"
                                        value={data.contact_email} 
                                        onChange={e => setData('contact_email', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        placeholder="kontak@perusahaan.com"
                                        required
                                    />
                                    {errors.contact_email && <p className="mt-1 text-xs text-red-500">{errors.contact_email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Website URL</label>
                                    <input 
                                        type="url" 
                                        dusk="website-url"
                                        value={data.website_url} 
                                        onChange={e => setData('website_url', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        placeholder="https://..."
                                        required
                                    />
                                    {errors.website_url && <p className="mt-1 text-xs text-red-500">{errors.website_url}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">URL Logo (Opsional)</label>
                                    <input 
                                        type="url" 
                                        dusk="logo-url"
                                        value={data.logo_url} 
                                        onChange={e => setData('logo_url', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="lg:col-span-1 flex items-end">
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : (editingCompany ? 'Simpan Perubahan' : 'Simpan Mitra')}
                                    </button>
                                </div>
                                <div className="md:col-span-2 lg:col-span-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat</label>
                                    <textarea
                                        dusk="description" 
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)} 
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" 
                                        required 
                                        rows="2"
                                        placeholder="Berikan deskripsi singkat tentang perusahaan..."
                                    ></textarea>
                                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Daftar Perusahaan Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {companies.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                            <div className="mb-4 text-6xl">🏢</div>
                            <h3 className="text-lg font-semibold text-slate-700">Belum ada mitra terdaftar</h3>
                            <p className="mt-2 text-sm text-slate-500">Daftar mitra perusahaan akan segera hadir.</p>
                        </div>
                    ) : (
                        companies.map((company) => (
                            <div key={company.id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2 shadow-inner group-hover:border-indigo-100 transition-colors">
                                            {company.logo_url ? (
                                                <img src={company.logo_url} alt={company.name} className="h-full w-full object-contain" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-xl font-bold text-indigo-600">
                                                    {company.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            {company.industry}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{company.name}</h3>
                                    <p className="mt-2 text-sm text-slate-500 line-clamp-3 flex-1 leading-relaxed">
                                        {company.description}
                                    </p>

                                    <div className="mt-4 space-y-2">
                                        {company.contact_email && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>📧</span> {company.contact_email}
                                            </div>
                                        )}
                                        {company.website_url && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>🌐</span> 
                                                <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline truncate">
                                                    {company.website_url}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                                        <Link 
                                            href={route('companies.show', company.id)}
                                            className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                                        >
                                            Lihat Profil →
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            {isAdmin && (
                                                <button
                                                    onClick={() => startEdit(company)}
                                                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                            {isAdmin && (
                                                <Link 
                                                    href={route('companies.destroy', company.id)} 
                                                    method="delete" 
                                                    as="button" 
                                                    className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                                    onClick={(e) => {
                                                        if (!confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    🗑️
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}