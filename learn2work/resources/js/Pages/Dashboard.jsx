import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;

    const roleLinks = {
        admin: [
            { label: 'Kelola Kursus', href: route('courses.index'), icon: '📚', desc: 'Tambah dan kelola kursus pembelajaran' },
            { label: 'Mitra Perusahaan', href: route('companies.index'), icon: '🏢', desc: 'Kelola data perusahaan mitra' },
        ],
        teacher: [
            { label: 'Kursus Saya', href: route('courses.index'), icon: '📚', desc: 'Kelola kursus yang Anda ajarkan' },
            { label: 'Penilaian', href: route('submissions.index'), icon: '📝', desc: 'Berikan feedback dan nilai pada essay siswa' },
        ],
        student: [
            { label: 'Ruang Belajar', href: route('student.dashboard'), icon: '🎓', desc: 'Lanjutkan perjalanan belajar Anda' },
            { label: 'Jelajahi Kursus', href: route('courses.index'), icon: '🔍', desc: 'Temukan kursus baru yang menarik' },
            { label: 'Mitra Perusahaan', href: route('companies.index'), icon: '🏢', desc: 'Lihat peluang magang di perusahaan mitra' },
        ],
    };

    const links = roleLinks[user?.role] || roleLinks.student;

    const roleLabel = {
        admin: 'Administrator',
        teacher: 'Pengajar',
        student: 'Peserta Didik',
    }[user?.role] || 'User';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl backdrop-blur-sm">
                                👋
                            </div>
                            <div>
                                <p className="text-sm font-medium text-indigo-200 uppercase tracking-wider">{roleLabel}</p>
                                <h1 className="text-2xl font-bold">Selamat Datang, {user?.name}!</h1>
                                <p className="mt-1 text-indigo-200">Apa yang ingin Anda lakukan hari ini?</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-indigo-300"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-3xl transition-colors group-hover:bg-indigo-100">
                                    {link.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {link.label}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{link.desc}</p>
                                </div>
                                <div className="mt-auto flex items-center text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                                    Buka →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
