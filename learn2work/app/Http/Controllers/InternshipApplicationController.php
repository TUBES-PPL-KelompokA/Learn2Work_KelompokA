<?php

namespace App\Http\Controllers;

use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class InternshipApplicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'partner_company_id' => 'required|exists:partner_companies,id',
            'internship_opening_id' => 'nullable|exists:internship_openings,id',
            'cv_file' => 'required|file|mimes:pdf|max:2048', // Wajib PDF
        ]);

        $cvPath = $request->file('cv_file')->store('internship_cvs', 'public');

        InternshipApplication::create([
            'user_id' => Auth::id(),
            'partner_company_id' => $request->partner_company_id,
            'internship_opening_id' => $request->internship_opening_id,
            'cv_path' => $cvPath,
        ]);

        // Sesuai revisi: Proses bisnis magang berhenti di sini, beri tahu siswa untuk cek email
        return redirect()->back()->with('success', 'Pendaftaran berhasil dikirim! Proses seleksi selanjutnya akan diinformasikan oleh pihak perusahaan melalui email pribadi Anda. Silakan cek inbox secara berkala.');
    }

    // List applications for the authenticated student
    public function index()
    {
        $applications = InternshipApplication::with(['partnerCompany', 'internshipOpening'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return view('internships.index', compact('applications'));
    }

    public function edit(InternshipApplication $internshipApplication)
    {
        if (auth()->id() !== $internshipApplication->user_id && auth()->user()->role !== 'admin') {
            abort(403);
        }
        return view('internships.edit', ['application' => $internshipApplication]);
    }

    public function update(Request $request, InternshipApplication $internshipApplication)
    {
        if (auth()->id() !== $internshipApplication->user_id) abort(403);

        $request->validate([
            'cv_file' => 'required|file|mimes:pdf|max:2048',
        ]);

        // delete old file if exists
        if ($internshipApplication->cv_path && Storage::disk('public')->exists($internshipApplication->cv_path)) {
            Storage::disk('public')->delete($internshipApplication->cv_path);
        }

        $cvPath = $request->file('cv_file')->store('internship_cvs', 'public');
        $internshipApplication->update(['cv_path' => $cvPath]);

        return redirect()->route('internships.index')->with('success', 'CV berhasil diperbarui.');
    }

    public function destroy(InternshipApplication $internshipApplication)
    {
        if (auth()->id() !== $internshipApplication->user_id && auth()->user()->role !== 'admin') abort(403);

        // delete file
        if ($internshipApplication->cv_path && Storage::disk('public')->exists($internshipApplication->cv_path)) {
            Storage::disk('public')->delete($internshipApplication->cv_path);
        }

        $internshipApplication->delete();
        return redirect()->route('internships.index')->with('success', 'Pendaftaran magang berhasil dibatalkan.');
    }
}