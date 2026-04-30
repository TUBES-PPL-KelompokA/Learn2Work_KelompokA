import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: '🎓',
            title: 'Belajar Terstruktur',
            desc: 'Materi disusun secara berurutan, memastikan fondasi yang kuat sebelum melangkah ke level berikutnya.',
        },
        {
            icon: '📝',
            title: 'Kuis Interaktif',
            desc: 'Uji pemahaman Anda dengan kuis pilihan ganda dan essay yang dirancang oleh pengajar berpengalaman.',
        },
        {
            icon: '🏢',
            title: 'Koneksi Industri',
            desc: 'Terhubung langsung dengan perusahaan mitra dan buka peluang magang terbaik di bidangmu.',
        },
        {
            icon: '🚀',
            title: 'Sertifikasi Kompetensi',
            desc: 'Dapatkan sertifikat yang diakui industri setelah menyelesaikan seluruh program kursus.',
        },
    ];

    const steps = [
        { num: '01', title: 'Daftar Akun', desc: 'Buat akun gratis sebagai Student atau Teacher dalam hitungan detik.' },
        { num: '02', title: 'Pilih Kursus', desc: 'Jelajahi katalog kursus yang dikurasi khusus sesuai kebutuhan industri.' },
        { num: '03', title: 'Belajar & Kerjakan Kuis', desc: 'Ikuti modul secara berurutan dan buktikan pemahamanmu melalui kuis.' },
        { num: '04', title: 'Raih Peluang Kerja', desc: 'Hubungkan profilmu dengan perusahaan mitra dan apply internship.' },
    ];

    return (
        <>
            <Head title="Learn2Work — Belajar, Berkembang, Berkarir" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white font-sans">

                {/* ── NAVBAR ── */}
                <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Learn2Work
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg px-5 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/20 transition hover:bg-white/10"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── HERO ── */}
                <section className="relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400"></span>
                            Platform Pembelajaran Berbasis Industri
                        </div>
                        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                            Belajar yang{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Benar-Benar
                            </span>{' '}
                            Mempersiapkanmu Bekerja
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
                            Learn2Work menjembatani kesenjangan antara pendidikan dan dunia kerja dengan kurikulum
                            terstruktur, kuis adaptif, dan koneksi langsung ke perusahaan mitra.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href={route('register')}
                                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-indigo-500/40"
                            >
                                Mulai Belajar Gratis
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                            <Link
                                href={route('login')}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/5"
                            >
                                Sudah punya akun? Masuk
                            </Link>
                        </div>

                        {/* Stats Row */}
                        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {[
                                { val: '50+', label: 'Kursus Tersedia' },
                                { val: '1.200+', label: 'Pelajar Aktif' },
                                { val: '30+', label: 'Perusahaan Mitra' },
                                { val: '95%', label: 'Tingkat Kepuasan' },
                            ].map((s) => (
                                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <div className="text-3xl font-extrabold text-white">{s.val}</div>
                                    <div className="mt-1 text-sm text-white/50">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <div className="mb-14 text-center">
                        <h2 className="text-3xl font-bold md:text-4xl">Mengapa Learn2Work?</h2>
                        <p className="mt-4 text-white/50">Dirancang untuk mencetak talenta siap industri</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-indigo-500/50 hover:bg-indigo-500/10"
                            >
                                <div className="mb-4 text-4xl">{f.icon}</div>
                                <h3 className="mb-2 font-semibold text-white group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── HOW IT WORKS ── */}
                <section className="border-y border-white/10 bg-white/5 py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-14 text-center">
                            <h2 className="text-3xl font-bold md:text-4xl">Cara Kerja Platform</h2>
                            <p className="mt-4 text-white/50">4 langkah sederhana menuju karir impianmu</p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {steps.map((s, i) => (
                                <div key={s.num} className="relative flex flex-col gap-4">
                                    {i < steps.length - 1 && (
                                        <div className="absolute top-6 left-full hidden h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent lg:block" />
                                    )}
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/30">
                                        {s.num}
                                    </div>
                                    <h3 className="font-semibold text-white">{s.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="mx-auto max-w-7xl px-6 py-24 text-center">
                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 shadow-2xl shadow-indigo-600/30">
                        <h2 className="text-3xl font-extrabold md:text-4xl">Siap Memulai Perjalananmu?</h2>
                        <p className="mt-4 text-indigo-200">
                            Bergabung dengan ribuan pelajar yang sudah mengubah karir mereka melalui Learn2Work.
                        </p>
                        <Link
                            href={route('register')}
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                        >
                            Daftar Sekarang — Gratis 🎉
                        </Link>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="border-t border-white/10 py-8 text-center text-sm text-white/30">
                    <p>© {new Date().getFullYear()} Learn2Work — Platform Pembelajaran Berbasis Industri</p>
                </footer>
            </div>
        </>
    );
}
