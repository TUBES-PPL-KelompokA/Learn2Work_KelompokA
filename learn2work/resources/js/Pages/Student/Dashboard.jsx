import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ enrollments }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kursus Saya</h2>}>
            <Head title="My Dashboard" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {enrollments.length === 0 ? (
                        <p className="text-gray-500">Anda belum membeli kursus apapun.</p>
                    ) : (
                        enrollments.map((enrollment) => (
                            <div key={enrollment.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-bold mb-2">{enrollment.course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">Status: {enrollment.status}</p>
                                <Link href={route('student.learn', enrollment.course.id)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full inline-block text-center">
                                    Lanjut Belajar
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
