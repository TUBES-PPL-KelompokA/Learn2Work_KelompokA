<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentLearningController extends Controller
{
     // Halaman Dashboard Student (Kumpulan kursus yang dibeli)
     public function dashboard()
     {
         $enrollments = Enrollment::with('course')->where('user_id', Auth::id())->get();
         return Inertia::render('Student/Dashboard', [
             'enrollments' => $enrollments
         ]);
     }
 
     // Halaman Ruang Belajar (Menampilkan Modul)
     public function learn(Course $course, Module $module = null)
     {
         // Pastikan siswa benar-benar sudah beli kursus ini
         $enrollment = Enrollment::where('user_id', Auth::id())->where('course_id', $course->id)->firstOrFail();
         
         // Ambil semua modul yang ada di kursus ini (urut dari yang pertama)
         $course->load(['modules' => function($q) { $q->orderBy('order_number', 'asc'); }]);
 
         // Tentukan modul mana yang sedang dibuka (berdasarkan parameter atau progress terakhir)
         $activeModule = $module ? $module : ($enrollment->current_module_id ? Module::find($enrollment->current_module_id) : $course->modules->first());
 
         return Inertia::render('Student/Learn', [
             'course' => $course,
             'activeModule' => $activeModule,
             'enrollment' => $enrollment
         ]);
     }
 
     // Fungsi untuk lanjut ke modul berikutnya (Akses Berurutan)
     public function nextModule(Course $course, Module $nextModule)
     {
         $enrollment = Enrollment::where('user_id', Auth::id())->where('course_id', $course->id)->firstOrFail();
         
         // Update progress siswa ke modul yang baru
         $enrollment->update(['current_module_id' => $nextModule->id]);
         
         return redirect()->route('student.learn', ['course' => $course->id, 'module' => $nextModule->id]);
     }
}
