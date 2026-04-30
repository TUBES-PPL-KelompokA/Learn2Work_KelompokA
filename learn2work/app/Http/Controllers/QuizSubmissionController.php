<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizSubmissionController extends Controller
{
    public function index()
    {
        $query = QuizSubmission::with(['user', 'quiz.module.course']);

        // Jika teacher, tampilkan semua (karena kursus dibuat admin tapi dikelola teacher)
        // Atau bisa dibatasi nanti jika sudah ada sistem assignment teacher
        
        $submissions = $query->latest()->get();

        return Inertia::render('Teacher/Submissions', [
            'submissions' => $submissions
        ]);
    }

    public function take(Quiz $quiz)
    {
        $quiz->load(['questions', 'module.course']);
        
        return Inertia::render('Quizzes/Take', [
            'quiz' => $quiz
        ]);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $score = 0;
        $totalQuestions = $quiz->questions->count();
        if ($totalQuestions === 0) $totalQuestions = 1; // Prevent division by zero

        $pgQuestions = $quiz->questions->where('type', 'pg');
        $essayQuestions = $quiz->questions->where('type', 'essay');

        // Hitung skor otomatis untuk PG
        foreach ($pgQuestions as $q) {
            $studentAnswer = collect($request->answers)->firstWhere('question_id', $q->id);
            if ($studentAnswer && isset($studentAnswer['answer']) && $studentAnswer['answer'] === $q->correct_answer) {
                $score += (100 / $totalQuestions);
            }
        }

        $submission = QuizSubmission::create([
            'user_id' => Auth::id(),
            'quiz_id' => $quiz->id,
            'score' => (int)round($score),
            'answers' => $request->answers,
            'status' => $essayQuestions->count() > 0 ? 'pending' : 'graded',
        ]);

        return redirect()->route('student.learn', [
            'course' => $quiz->module->course_id,
            'module' => $quiz->module_id
        ])->with('success', 'Quiz berhasil dikumpulkan!');
    }

    public function update(Request $request, QuizSubmission $submission)
    {
        $request->validate([
            'teacher_feedback' => 'required|string',
        ]);

        $submission->update([
            'teacher_feedback' => $request->teacher_feedback,
            'status' => 'graded'
        ]);

        return back()->with('message', 'Feedback berhasil dikirim!');
    }
}
