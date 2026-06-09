<?php

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
use App\Http\Controllers\CourseAssignmentController;
use App\Http\Controllers\InternshipApplicationController;
use App\Http\Controllers\CertificateController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $props = [];
    if (auth()->check() && auth()->user()->role === 'admin') {
        $props['total_applications'] = \App\Models\InternshipApplication::count();
        $props['total_students'] = \App\Models\User::where('role', 'student')->count();
        $props['total_teachers'] = \App\Models\User::where('role', 'teacher')->count();
        $props['total_companies'] = \App\Models\PartnerCompany::count();
        $props['total_courses'] = \App\Models\Course::count();
        $props['free_courses_count'] = \App\Models\Course::where('price', 0)->count();
        $props['paid_courses_count'] = \App\Models\Course::where('price', '>', 0)->count();
        $props['total_openings'] = \App\Models\InternshipOpening::count();
        $props['active_openings_count'] = \App\Models\InternshipOpening::where('status', 'open')->count();
        
        $props['pending_payments'] = \App\Models\Enrollment::with(['user', 'course'])
            ->where('status', 'pending')
            ->latest()
            ->get();
            
        $props['course_metrics'] = \App\Models\Course::withCount(['enrollments'])->latest()->get();
        $props['recent_companies'] = \App\Models\PartnerCompany::withCount('internshipOpenings')->latest()->take(4)->get();
        $props['teacher_metrics'] = \App\Models\User::where('role', 'teacher')->withCount('courses')->take(5)->get();
    }
    return Inertia::render('Dashboard', $props);
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
    Route::post('/courses/{course}/enroll-free', [EnrollmentController::class, 'enrollFree'])->name('enrollments.free');
    Route::get('/my-dashboard', [StudentLearningController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/learn/{course}/{module?}', [StudentLearningController::class, 'learn'])->name('student.learn');
    // Penilaian & Feedback
    Route::get('/submissions', [App\Http\Controllers\QuizSubmissionController::class, 'index'])->name('submissions.index');
    Route::patch('/submissions/{submission}', [App\Http\Controllers\QuizSubmissionController::class, 'update'])->name('submissions.update');
    Route::get('/quizzes/{quiz}/take', [App\Http\Controllers\QuizSubmissionController::class, 'take'])->name('quizzes.take');
    Route::post('/quizzes/{quiz}/submit', [App\Http\Controllers\QuizSubmissionController::class, 'store'])->name('quizzes.submit');

    Route::post('/learn/{course}/next/{nextModule}', [StudentLearningController::class, 'nextModule'])->name('student.next');

    // Rute CRUD Assign Guru
    Route::get('/admin/assignments', [CourseAssignmentController::class, 'index'])->name('assignments.index');
    Route::post('/admin/assignments', [CourseAssignmentController::class, 'store'])->name('assignments.store');
    Route::patch('/admin/assignments/{course}', [CourseAssignmentController::class, 'update'])->name('assignments.update');
    Route::delete('/admin/assignments/{course}', [CourseAssignmentController::class, 'destroy'])->name('assignments.destroy');

    // Rute Verifikasi Admin
    Route::get('/admin/verifikasi-pembayaran', [EnrollmentController::class, 'indexAdmin'])->name('admin.payments.index');
    Route::patch('/admin/verifikasi-pembayaran/{enrollment}/approve', [EnrollmentController::class, 'approve'])->name('admin.payments.approve');
    Route::get('/admin/proofs/{enrollment}', function (\App\Models\Enrollment $enrollment) {
        if (auth()->user()->role !== 'admin') abort(403);
        $path = storage_path('app/public/' . $enrollment->payment_proof);
        if (!file_exists($path)) abort(404, 'File bukti transfer tidak ditemukan.');
        return response()->file($path);
    })->name('admin.proofs.show');

    // Rute Magang & Lowongan Mitra
    Route::post('/internships', [InternshipApplicationController::class, 'store'])->name('internships.store');
    
    Route::post('/companies/{company}/openings', [CompanyController::class, 'storeOpening'])->name('openings.store');
    Route::patch('/openings/{opening}', [CompanyController::class, 'updateOpening'])->name('openings.update');
    Route::delete('/openings/{opening}', [CompanyController::class, 'destroyOpening'])->name('openings.destroy');
    Route::patch('/openings/{opening}/toggle', [CompanyController::class, 'toggleOpening'])->name('openings.toggle');

    // Rute Selesai Kursus & Unduh Sertifikat
    Route::post('/courses/{course}/complete', [EnrollmentController::class, 'complete'])->name('enrollments.complete');
    Route::get('/courses/{course}/certificate', [CertificateController::class, 'download'])->name('certificate.download');
});

require __DIR__ . '/auth.php';