<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        // Hanya menampilkan kursus milik teacher yang sedang login (sementara)
        $courses = Course::with('teacher')->latest()->get();
        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $price = $request->price;
        $level = $request->level ?: ($price == 0 ? 'basic' : 'premium');

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'level' => 'nullable|string',
            'duration_days' => ($level === 'basic') ? 'nullable|integer' : 'required|integer|min:1',
        ]);

        Course::create([
            'teacher_id' => Auth::id(), // Otomatis ambil ID yang sedang login
            'title' => $request->title,
            'description' => $request->description,
            'price' => $price,
            'level' => $level,
            'duration_days' => ($level === 'basic') ? null : $request->duration_days,
        ]);

        return redirect()->route('courses.index')->with('message', 'Kursus berhasil dibuat!');
    }

    public function update(Request $request, Course $course)
    {
        if (Auth::user()->role === 'teacher' && $course->teacher_id !== Auth::id()) {
            abort(403, 'Akses ditolak. Kursus ini dikelola secara eksklusif oleh pengajar lain.');
        }

        $price = $request->price;
        $level = $request->level ?: ($price == 0 ? 'basic' : 'premium');

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'level' => 'nullable|string',
            'duration_days' => ($level === 'basic') ? 'nullable|integer' : 'required|integer|min:1',
        ]);

        $course->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $price,
            'level' => $level,
            'duration_days' => ($level === 'basic') ? null : $request->duration_days,
        ]);

        return redirect()->back()->with('message', 'Kursus berhasil diperbarui!');
    }

    public function show(Course $course)
    {

        // Menampilkan detail kursus beserta modulnya (diurutkan berdasarkan nomor)
        $course->load(['modules' => function ($query) {
            $query->with('quiz')->orderBy('order_number', 'asc');
        }, 'teacher']);
        
        $isEnrolled = false;
        if (Auth::check()) {
            $isEnrolled = Enrollment::where('user_id', Auth::id())
                ->where('course_id', $course->id)
                ->exists();
        }
        
        return Inertia::render('Courses/Show', [
            'course' => $course,
            'isEnrolled' => $isEnrolled
        ]);
    }

    public function destroy(Course $course)
    {
        if (Auth::user()->role === 'teacher' && $course->teacher_id !== Auth::id()) {
            abort(403, 'Akses ditolak. Kursus ini dikelola secara eksklusif oleh pengajar lain.');
        }

        $course->delete();
        return redirect()->route('courses.index');
    }

    // Method untuk admin meng-assign guru ke kursus
    public function assignTeacher(Request $request, Course $course)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',
        ]);

        // Verifikasi bahwa user yang dipilih benar-benar memiliki role 'teacher'
        $teacher = \App\Models\User::findOrFail($request->teacher_id);
        if ($teacher->role !== 'teacher') {
            return back()->withErrors(['teacher_id' => 'User yang dipilih bukan seorang guru.']);
        }

        $course->update([
            'teacher_id' => $request->teacher_id
        ]);

        return back()->with('success', 'Guru berhasil di-assign ke kursus ini.');
    }
}