<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseAssignmentController extends Controller
{
    // READ: Menampilkan halaman daftar penugasan
    public function index()
    {
        // Mengambil semua kursus beserta relasi gurunya
        $courses = Course::with('teacher')->get();
        // Mengambil daftar user yang role-nya 'teacher' untuk form dropdown
        $teachers = User::where('role', 'teacher')->get();

        return Inertia::render('Admin/Assignments/Index', [
            'courses' => $courses,
            'teachers' => $teachers
        ]);
    }

    // CREATE / STORE: Menugaskan guru ke kursus
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $course = Course::findOrFail($request->course_id);

        // Opsional: Cek jika kursus sudah punya guru, tolak create (harus via update)
        if ($course->teacher_id !== null) {
            return back()->withErrors(['course_id' => 'Kursus ini sudah memiliki guru. Gunakan fitur edit untuk mengganti.']);
        }

        $course->update(['teacher_id' => $request->teacher_id]);

        return back()->with('success', 'Guru berhasil ditugaskan ke kursus.');
    }

    // UPDATE: Mengganti guru yang bertugas
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'teacher_id' => 'required|exists:users,id',
        ]);

        $course->update(['teacher_id' => $request->teacher_id]);

        return back()->with('success', 'Penugasan guru berhasil diperbarui.');
    }

    // DELETE: Mencopot guru dari kursus
    public function destroy(Course $course)
    {
        $course->update(['teacher_id' => null]);

        return back()->with('success', 'Guru berhasil dicopot dari kursus ini.');
    }
}