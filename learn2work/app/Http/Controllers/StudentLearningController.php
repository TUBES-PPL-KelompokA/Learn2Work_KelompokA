<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use App\Models\Enrollment;
use App\Models\QuizSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentLearningController extends Controller
{
     // Halaman Dashboard Student (Kumpulan kursus yang dibeli)
     public function dashboard()
     {
         $enrollments = Enrollment::with(['course.modules' => function($query) {
             $query->orderBy('order_number', 'asc');
         }])->where('user_id', Auth::id())->get();
         
         $enrollments->each(function($enrollment) {
             $enrollment->remaining_days = $enrollment->getRemainingDays();
             
             $modulesCount = $enrollment->course->modules->count();
             if ($modulesCount === 0) {
                 $enrollment->progress_percent = 0;
             } elseif ($enrollment->status === 'completed') {
                 $enrollment->progress_percent = 100;
             } else {
                 $currentModId = $enrollment->current_module_id;
                 if (!$currentModId) {
                     $enrollment->progress_percent = 0;
                 } else {
                     $position = 0;
                     foreach ($enrollment->course->modules as $idx => $mod) {
                         if ($mod->id === $currentModId) {
                             $position = $idx;
                             break;
                         }
                     }
                     $enrollment->progress_percent = round(($position / $modulesCount) * 100);
                 }
             }
         });

         return Inertia::render('Student/Dashboard', [
             'enrollments' => $enrollments
         ]);
     }
 
     // Halaman Ruang Belajar (Menampilkan Modul)
     public function learn(Course $course, Module $module = null)
     {
         // Pastikan siswa benar-benar sudah beli kursus ini
         $enrollment = Enrollment::where('user_id', Auth::id())->where('course_id', $course->id)->firstOrFail();
         
         // Jika status masih pending, blokir akses ke modul
         if (!in_array($enrollment->status, ['paid', 'active', 'completed'])) {
             return redirect()->route('student.dashboard')->with('error', 'Akses ditolak. Pendaftaran/Pembayaran Anda sedang dalam proses verifikasi oleh Admin.');
         }

         // Ambil semua modul yang ada di kursus ini (urut dari yang pertama)
         $course->load(['modules' => function($q) { $q->orderBy('order_number', 'asc'); }]);
 
        // Tentukan modul mana yang sedang dibuka (berdasarkan parameter atau progress terakhir)
        $unlockedModuleId = $enrollment->current_module_id ?: $course->modules->first()?->id;
        $unlockedIndex = $course->modules->search(fn($m) => $m->id === $unlockedModuleId);
        if ($unlockedIndex === false) $unlockedIndex = 0;

        if ($module) {
            $requestedIndex = $course->modules->search(fn($m) => $m->id === $module->id);
            if ($requestedIndex !== false && $requestedIndex > $unlockedIndex) {
                return redirect()->route('student.learn', ['course' => $course->id, 'module' => $unlockedModuleId])
                    ->with('error', 'Anda harus mempelajari modul secara berurutan. Selesaikan modul sebelumnya terlebih dahulu.');
            }
        }

        $activeModuleId = $module ? $module->id : $unlockedModuleId;
        $activeModule = Module::with(['quiz' => function($q) {
            $q->with('questions');
        }])->find($activeModuleId);

        $submission = null;
        $hasEssay = false;
        if ($activeModule && $activeModule->quiz) {
            $submission = QuizSubmission::where('user_id', Auth::id())
                ->where('quiz_id', $activeModule->quiz->id)
                ->latest()
                ->first();
            
            $hasEssay = $activeModule->quiz->questions->where('type', 'essay')->count() > 0;
        }
 
         return Inertia::render('Student/Learn', [
             'course' => $course,
             'activeModule' => $activeModule,
             'enrollment' => $enrollment,
             'submission' => $submission,
             'hasEssay' => $hasEssay
         ]);
     }
 
     // Fungsi untuk lanjut ke modul berikutnya (Akses Berurutan)
     public function nextModule(Course $course, Module $nextModule)
     {
         $enrollment = Enrollment::where('user_id', Auth::id())->where('course_id', $course->id)->firstOrFail();
         
         // Ambil modul saat ini untuk cek kuis
         $currentModule = Module::with(['quiz.questions'])->find($enrollment->current_module_id ?: $course->modules->first()->id);
         
         if ($currentModule && $currentModule->quiz) {
             $submission = QuizSubmission::where('user_id', Auth::id())
                 ->where('quiz_id', $currentModule->quiz->id)
                 ->latest()
                 ->first();
             
             $hasEssay = $currentModule->quiz->questions->where('type', 'essay')->count() > 0;
             
             // Jika tidak ada essay dan skor < 80, maka dilarang lanjut
             if (!$hasEssay && (!$submission || $submission->score < 80)) {
                 return back()->with('error', 'Selesaikan quiz dengan skor minimal 80 untuk lanjut.');
             }
         }

         // Update progress siswa ke modul yang baru
         $enrollment->update(['current_module_id' => $nextModule->id]);
         
         return redirect()->route('student.learn', ['course' => $course->id, 'module' => $nextModule->id]);
     }
}
