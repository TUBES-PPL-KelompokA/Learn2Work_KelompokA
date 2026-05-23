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
    }
}
