<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['quiz_id', 'type', 'question_text', 'options', 'correct_answer', 'feedback'];
    protected function casts(): array {
        return [
            'options' => 'array',
        ];
    }
    public function quiz() { return $this->belongsTo(Quiz::class); }
}
