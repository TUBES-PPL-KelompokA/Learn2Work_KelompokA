<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        Course::create([
            'teacher_id' => Auth::id(), // Otomatis ambil ID yang sedang login
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return redirect()->route('courses.index')->with('message', 'Kursus berhasil dibuat!');
    }

    public function show(Course $course)
    {
        // Menampilkan detail kursus beserta modulnya (diurutkan berdasarkan nomor)
        $course->load(['modules' => function ($query) {
            $query->orderBy('order_number', 'asc');
        }]);
        
        return Inertia::render('Courses/Show', [
            'course' => $course
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index');
    }
}