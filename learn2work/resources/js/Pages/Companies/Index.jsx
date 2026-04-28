import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ companies }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        industry: '',
        description: '',
        logo_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('companies.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Data Perusahaan Mitra</h2>}>
            <Head title="Mitra Perusahaan" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
                
                {/* Form Tambah Perusahaan */}
                <div className="w-full md:w-1/3 bg-white p-6 shadow sm:rounded-lg h-fit">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tambah Mitra Baru</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Nama Perusahaan</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Industri / Sektor</label>
                            <input type="text" placeholder="Cth: Teknologi, Perbankan" value={data.industry} onChange={e => setData('industry', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Deskripsi</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required rows="3"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">URL Logo (Opsional)</label>
                            <input type="url" value={data.logo_url} onChange={e => setData('logo_url', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                        </div>
                        <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Simpan Mitra</button>
                    </form>
                </div>