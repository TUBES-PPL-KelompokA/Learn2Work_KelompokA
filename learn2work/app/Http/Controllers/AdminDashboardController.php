<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Statistik Kompleks Menengah Ke Atas
        $totalPendapatan = Enrollment::where('status', 'active')->join('courses', 'enrollments.course_id', '=', 'courses.id')->sum('courses.price'); // Asumsi ada kolom price
        $pembayaranPending = Enrollment::where('status', 'pending')->count();
        $totalSiswa = User::where('role', 'student')->count();
        
        $transaksiTerbaru = Enrollment::with(['user', 'course'])
                            ->orderBy('created_at', 'desc')
                            ->take(5)
                            ->get();