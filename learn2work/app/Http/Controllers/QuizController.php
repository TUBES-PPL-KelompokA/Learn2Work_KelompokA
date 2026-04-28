<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function store(Request $request, $module_id)
    {
        $request->validate([
            'title' => 'required|string',
            'min_score' => 'required|integer|min:0|max:100',
        ]);

        Quiz::create([
            'module_id' => $module_id,
            'title' => $request->title,
            'min_score' => $request->min_score,
        ]);
        return back();
    }

    public function show(Quiz $quiz)
    {
        $quiz->load('questions');
        return Inertia::render('Quizzes/Builder', [
            'quiz' => $quiz,
        ]);
    }
}
