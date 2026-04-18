import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ courses }) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        description: '',
        price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manajemen Kursus</h2>}
        >
            <Head title="Kursus" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Form Buat Kursus */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Buat Kursus Baru</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Judul Kursus</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                            <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                        </div>
                        <button type="submit" disabled={processing} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Simpan Kursus</button>
                    </form>
                </div>

                {/* Daftar Kursus */}
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Daftar Kursus</h3>
                    <ul className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <li key={course.id} className="py-4 flex justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{course.title}</p>
                                    <p className="text-sm text-gray-500">{course.description}</p>
                                </div>
                                <div className="text-sm text-gray-900 font-semibold">Rp {course.price.toLocaleString('id-ID')}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}