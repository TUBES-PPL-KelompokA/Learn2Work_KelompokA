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
}