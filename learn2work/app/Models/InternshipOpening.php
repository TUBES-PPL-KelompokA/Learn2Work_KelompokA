<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipOpening extends Model
{
    protected $fillable = ['partner_company_id', 'title', 'description', 'status'];

    public function partnerCompany()
    {
        return $this->belongsTo(PartnerCompany::class);
    }

    public function applications()
    {
        return $this->hasMany(InternshipApplication::class);
    }
}
