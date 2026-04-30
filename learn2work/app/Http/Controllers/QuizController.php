<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function store(Request $request, Module $module)
    {
        $request->validate([
            'title' => 'nullable|string',
            'min_score' => 'required|integer|min:0|max:100',
        ]);

        Quiz::create([
            'module_id' => $module->id,
            'title' => $request->title ?? ('Quiz: ' . $module->title),
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
