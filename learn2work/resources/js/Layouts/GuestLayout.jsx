import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* ── LEFT PANEL (branding) ── */}
            <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden p-12 lg:flex">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

                <div className="relative z-10 text-center text-white">
                    <Link href="/" className="mb-12 inline-flex items-center gap-3">
                        <span className="text-4xl">🎯</span>
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                            Learn2Work
                        </span>
                    </Link>

                    <h2 className="text-4xl font-bold leading-tight">
                        Belajar Hari Ini,<br />
                        <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                            Berkarir Esok Hari
                        </span>
                    </h2>
                    <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-md mx-auto">
                        Platform pembelajaran terstruktur yang menghubungkan Anda dengan industri secara langsung.
                    </p>

                    {/* Feature bullets */}
                    <div className="mt-10 flex flex-col gap-4 text-left">
                        {[
                            { icon: '✅', text: 'Kurikulum berbasis kebutuhan industri' },
                            { icon: '✅', text: 'Kuis interaktif & penilaian essay otomatis' },
                            { icon: '✅', text: 'Terhubung langsung dengan 30+ perusahaan mitra' },
                        ].map((f) => (
                            <div key={f.text} className="flex items-center gap-3">
                                <span className="text-xl">{f.icon}</span>
                                <span className="text-white/70">{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL (form) ── */}
            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
                {/* Mobile logo */}
                <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
                    <span className="text-2xl">🎯</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Learn2Work
                    </span>
                </Link>

                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
                    {children}
                </div>

                <p className="mt-6 text-center text-xs text-white/30">
                    © {new Date().getFullYear()} Learn2Work. Hak cipta dilindungi.
                </p>
            </div>
        </div>
    );
}
