<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnerCompany extends Model
{
    protected $fillable = ['name', 'industry', 'description', 'logo_url'];
}
