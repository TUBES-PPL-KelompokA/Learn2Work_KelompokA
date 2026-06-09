<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
    protected $fillable = ['user_id', 'partner_company_id', 'internship_opening_id', 'cv_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function partnerCompany()
    {
        return $this->belongsTo(PartnerCompany::class, 'partner_company_id');
    }

    public function internshipOpening()
    {
        return $this->belongsTo(InternshipOpening::class);
    }
}
