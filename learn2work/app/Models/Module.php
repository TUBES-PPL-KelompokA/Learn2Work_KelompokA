<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Course;

class Module extends Model
{
    protected $fillable = ['course_id', 'title', 'content_url', 'order_number'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}