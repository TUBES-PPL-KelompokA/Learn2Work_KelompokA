import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Learn({ course, activeModule, enrollment }) {
    const { post, processing } = useForm();

    // Mencari indeks modul yang sedang aktif untuk menentukan modul berikutnya
    const activeIndex = course.modules.findIndex(m => m.id === activeModule?.id);
    const nextModule = activeIndex >= 0 && activeIndex < course.modules.length - 1 
                        ? course.modules[activeIndex + 1] : null;

    const handleNext = () => {
        if (nextModule) {
            post(route('student.next', { course: course.id, nextModule: nextModule.id }));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ruang Belajar: {course.title}</h2>}>
            <Head title={course.title} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
                
                {/* Sidebar: Daftar Modul */}
                <div className="w-full md:w-1/3 bg-white p-4 shadow sm:rounded-lg h-fit">
                    <h3 className="font-bold text-lg mb-4">Daftar Modul</h3>
                    <ul className="space-y-2">
                        {course.modules.map((mod, index) => {
                            // Simulasi akses berurutan: jika urutan modul ini lebih besar dari current_module (index), anggap terkunci
                            const isLocked = enrollment.current_module_id !== null && index > course.modules.findIndex(m => m.id === enrollment.current_module_id);
                            const isActive = activeModule?.id === mod.id;

                            return (
                                <li key={mod.id} className={`p-3 rounded-md border ${isActive ? 'bg-indigo-50 border-indigo-500' : 'bg-gray-50'} ${isLocked ? 'opacity-50' : ''}`}>
                                    {isLocked ? (
                                        <span className="flex items-center text-gray-500">🔒 Modul {mod.order_number}: {mod.title}</span>
                                    ) : (
                                        <Link href={route('student.learn', { course: course.id, module: mod.id })} className="flex items-center text-indigo-700 hover:underline">
                                            📖 Modul {mod.order_number}: {mod.title}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Konten Utama: Materi Belajar */}
                <div className="w-full md:w-2/3 bg-white p-6 shadow sm:rounded-lg">
                    {activeModule ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">{activeModule.title}</h2>
                            <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-200 rounded flex items-center justify-center p-4">
                                {activeModule.content_url ? (
                                    <a href={activeModule.content_url} target="_blank" className="text-blue-600 underline text-lg">Buka Materi / Video Disini</a>
                                ) : (
                                    <span className="text-gray-500">Tidak ada lampiran materi</span>
                                )}
                            </div>

                            <div className="mt-8 pt-4 border-t flex justify-end">
                                {nextModule ? (
                                    <button onClick={handleNext} disabled={processing} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                                        Selesai & Lanjut Modul Berikutnya ➡️
                                    </button>
                                ) : (
                                    <span className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-bold">🎉 Kursus Selesai!</span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10 text-gray-500">Pilih modul di sebelah kiri untuk mulai belajar.</div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
