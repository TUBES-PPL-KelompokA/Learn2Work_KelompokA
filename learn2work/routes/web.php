<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentLearningController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/courses/{course}/certificate/download', [CertificateController::class, 'download'])
    ->middleware('auth');
    
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('companies', CompanyController::class)->only(['index', 'store', 'destroy', 'show', 'update']);

    Route::resource('courses', CourseController::class);

    // Route khusus untuk Modul
    Route::post('/courses/{course}/modules', [ModuleController::class, 'store'])->name('modules.store');
    Route::patch('/modules/{module}', [ModuleController::class, 'update'])->name('modules.update');
    Route::delete('/modules/{module}', [ModuleController::class, 'destroy'])->name('modules.destroy');

    Route::post('/modules/{module}/quizzes', [QuizController::class, 'store'])->name('quizzes.store');
    Route::get('/quizzes/{quiz}', [QuizController::class, 'show'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store'])->name('questions.store');
    Route::patch('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
    Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');

    // Rute Pendaftaran & Belajar
    Route::get('/courses/{course}/payment', [EnrollmentController::class, 'payment'])->name('enrollments.payment');
    Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store'])->name('enrollments.store');
    Route::get('/my-dashboard', [StudentLearningController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/learn/{course}/{module?}', [StudentLearningController::class, 'learn'])->name('student.learn');
    // Penilaian & Feedback
    Route::get('/submissions', [App\Http\Controllers\QuizSubmissionController::class, 'index'])->name('submissions.index');
    Route::patch('/submissions/{submission}', [App\Http\Controllers\QuizSubmissionController::class, 'update'])->name('submissions.update');
    Route::get('/quizzes/{quiz}/take', [App\Http\Controllers\QuizSubmissionController::class, 'take'])->name('quizzes.take');
    Route::post('/quizzes/{quiz}/submit', [App\Http\Controllers\QuizSubmissionController::class, 'store'])->name('quizzes.submit');

    Route::post('/learn/{course}/next/{nextModule}', [StudentLearningController::class, 'nextModule'])->name('student.next');
});

require __DIR__ . '/auth.php';