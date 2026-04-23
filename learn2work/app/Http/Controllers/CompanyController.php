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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'description' => 'required|string',
            'logo_url' => 'nullable|url',
        ]);

        PartnerCompany::create($request->all());

        return back()->with('message', 'Perusahaan Mitra berhasil ditambahkan!');
    }
}