<?php

namespace App\Http\Controllers;

use App\Models\PartnerCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = PartnerCompany::latest()->get();
        return Inertia::render('Companies/Index', [
            'companies' => $companies
        ]);
    }

    public function show(PartnerCompany $company)
    {
        $company->load('internshipOpenings');
        return Inertia::render('Companies/Show', [
            'company' => $company
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'website_url' => 'nullable|url',
            'logo_url' => 'nullable|url',
        ]);

        PartnerCompany::create($request->all());

        return back()->with('message', 'Perusahaan Mitra berhasil ditambahkan!');
    }

    public function update(Request $request, PartnerCompany $company)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'website_url' => 'nullable|url',
            'logo_url' => 'nullable|url',
        ]);

        $company->update($request->all());

        return back()->with('message', 'Perusahaan Mitra berhasil diperbarui!');
    }

    public function destroy(PartnerCompany $company)
    {
        $company->delete();
        return back();
    }

    // Manajemen Lowongan Magang per Mitra
    public function storeOpening(Request $request, PartnerCompany $company)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:open,closed',
        ]);

        $company->internshipOpenings()->create($request->all());

        return back()->with('success', 'Lowongan magang berhasil ditambahkan!');
    }

    public function updateOpening(Request $request, \App\Models\InternshipOpening $opening)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:open,closed',
        ]);

        $opening->update($request->all());

        return back()->with('success', 'Lowongan magang berhasil diperbarui!');
    }

    public function destroyOpening(\App\Models\InternshipOpening $opening)
    {
        $opening->delete();
        return back()->with('success', 'Lowongan magang berhasil dihapus!');
    }

    public function toggleOpening(\App\Models\InternshipOpening $opening)
    {
        $opening->update([
            'status' => $opening->status === 'open' ? 'closed' : 'open'
        ]);
        return back()->with('success', 'Status lowongan berhasil diubah!');
    }
}