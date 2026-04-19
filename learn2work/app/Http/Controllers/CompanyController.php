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
}