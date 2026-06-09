<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnerCompany extends Model
{
    protected $fillable = ['name', 'industry', 'description', 'address', 'contact_email', 'website_url', 'logo_url'];

    public function internshipApplications()
    {
        return $this->hasMany(InternshipApplication::class, 'partner_company_id');
    }

    public function internshipOpenings()
    {
        return $this->hasMany(InternshipOpening::class);
    }
}
