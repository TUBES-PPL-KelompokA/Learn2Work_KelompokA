<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Enrollment extends Model
{
    protected $fillable = ['user_id', 'course_id', 'status', 'current_module_id'];

    public function getRemainingDays()
    {
        if (!$this->course->duration_days) return null;
        
        $expiry = $this->created_at->addDays($this->course->duration_days);
        $remaining = Carbon::now()->diffInDays($expiry, false);
        
        return $remaining > 0 ? (int)$remaining : 0;
    }

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
    public function currentModule() { return $this->belongsTo(Module::class, 'current_module_id'); }
}
