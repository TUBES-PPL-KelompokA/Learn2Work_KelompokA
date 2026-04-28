<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function store(Request $request, Course $course)
    {
        // Cek apakah user sudah pernah beli kursus ini
        $exists = Enrollment::where('user_id', Auth::id())->where('course_id', $course->id)->exists();
        
        if (!$exists) {
            // Cari modul pertama untuk titik awal belajar
            $firstModule = $course->modules()->orderBy('order_number', 'asc')->first();

            Enrollment::create([
                'user_id' => Auth::id(),
                'course_id' => $course->id,
                'status' => 'paid',
                'current_module_id' => $firstModule ? $firstModule->id : null,
            ]);
        }

        // Arahkan langsung ke ruang belajar
        return redirect()->route('student.learn', $course->id);
    }
}
