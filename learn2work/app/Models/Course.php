<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['teacher_id', 'title', 'description', 'price', 'level', 'duration_days'];

    public function teacher() {
        return $this->belongsTo(\App\Models\User::class, 'teacher_id');
    }

    public function modules() {
        return $this->hasMany(Module::class);
    }

    public function enrollments() {
        return $this->hasMany(Enrollment::class);
    }
}