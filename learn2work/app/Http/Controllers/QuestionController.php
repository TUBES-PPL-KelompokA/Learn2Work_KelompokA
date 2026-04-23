<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(Request $request, $quiz_id)
    {
        $request->validate([
            'type' => 'required|in:pg,essay',
            'question_text' => 'required|string',
        ]);
    }
}
