<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function store(Request $request, $module_id)
    {
        $request->validate([
            'title' => 'required|string',
            'min_score' => 'required|integer|min:0|max:100',
        ]);
    }

    public function show(Quiz $quiz)
    {
        $quiz->load('questions');
        return Inertia::render('Quizzes/Builder', [
            'quiz' => $quiz,
        ]);
    }
}
