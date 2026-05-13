<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class CertificateController extends Controller
{
    public function download(Course $course)
    {
        $user = Auth::user();

        // Cek apakah student terdaftar di kursus
        $enrollment = Enrollment::where('user_id', $user->id)
                                ->where('course_id', $course->id)
                                ->first();

        // Validasi progress selesai
        if (!$enrollment || $enrollment->status !== 'completed') {
            abort(403, 'Anda belum menyelesaikan kursus ini sepenuhnya.');
        }
    }
}