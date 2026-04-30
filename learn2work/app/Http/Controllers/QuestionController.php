<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(Request $request, $quiz_id)
    {
        $request->validate([
            'type' => 'required|in:pg,essay',
            'question_text' => 'required|string',
        ]);
        Question::create([
            'quiz_id' => $quiz_id,
            'type' => $request->type,
            'question_text' => $request->question_text,
            'options' => $request->type === 'pg' ? $request->options : null,
            'correct_answer' => $request->correct_answer,
            'feedback' => $request->feedback,
        ]);
        return back();
    }
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'type' => 'required|in:pg,essay',
            'question_text' => 'required|string',
        ]);

        $question->update([
            'type' => $request->type,
            'question_text' => $request->question_text,
            'options' => $request->type === 'pg' ? $request->options : null,
            'correct_answer' => $request->correct_answer,
            'feedback' => $request->feedback,
        ]);

        return back();
    }

    public function destroy(Question $question)
    {
        $question->delete();
        return back();
    }
}
