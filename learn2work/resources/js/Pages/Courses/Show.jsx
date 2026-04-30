import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ course }) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        content_url: '',
        order_number: '',
    });

    const submitModule = (e) => {
        e.preventDefault();
        post(route('modules.store', course.id), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Detail Kursus: {course.title}</h2>}>
            <Head title={course.title} />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Form Tambah Modul */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tambah Modul Baru</h3>
                    <form onSubmit={submitModule} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Judul Modul</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">URL Materi (Video/G-Drive)</label>
                                <input type="url" value={data.content_url} onChange={e => setData('content_url', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Urutan Ke-</label>
                                <input type="number" value={data.order_number} onChange={e => setData('order_number', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" required />
                            </div>
                        </div>
                        <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Tambah Modul</button>
                    </form>
                </div>

                {/* Daftar Modul */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Modul ({course.modules.length})</h3>
                    <ul className="divide-y divide-gray-200">
                        {course.modules.map((mod) => (
                            <li key={mod.id} className="py-4 flex justify-between">
                                <div>
                                    <span className="font-bold mr-2">Modul {mod.order_number}:</span>
                                    {mod.title}
                                </div>
                                <div className="space-x-4">
                                    <a href={mod.content_url} target="_blank" className="text-blue-600 hover:underline">Lihat Materi</a>
                                    <Link href={route('modules.destroy', mod.id)} method="delete" as="button" className="text-red-600 hover:underline">Hapus</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

