<?php

namespace App\Http\Controllers;

use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

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
}