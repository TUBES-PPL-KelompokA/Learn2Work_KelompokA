<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseAssignmentController extends Controller
{   
    public function index()
    {
        $courses = Course::with('teacher')->get();
        $teachers = User::where('role', 'teacher')->get();

        return Inertia::render('Admin/Assignments/Index', [
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $course = Course::findOrFail($request->course_id);
        
        if($course->teacher_id !== null){
            return back()->withErrors(['course_id' => 'Kursus sudah memiliki guru. Gunakan fitur edit untuk mengganti.']);
        }

        $course->update(['teacher_id' => $request->user_id]);
        return back()->with('success', 'Guru berhasil ditugaskan ke kursus.');
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',
        ]);

        $course->update(['teacher_id' => $request->teacher_id]);
        return back()->with('success', 'Penugasan guru berhasil diperbarui.');
    }
}
