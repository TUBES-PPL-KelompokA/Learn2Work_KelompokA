<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EnrollmentController extends Controller
{
    // SISI STUDENT: Halaman Instruksi Pembayaran
    public function payment(Course $course)
    {
        return Inertia::render('Student/Payment', [
            'course' => $course
        ]);
    }

    // SISI STUDENT: Upload Bukti Bayar
    public function store(Request $request, Course $course)
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        $path = $request->file('payment_proof')->store('proofs', 'public');

        Enrollment::create([
            'user_id' => Auth::id(),
            'course_id' => $course->id,
            'payment_proof' => $path,
            'status' => 'pending',
        ]);

        return redirect()->route('dashboard')->with('success', 'Bukti berhasil diunggah, tunggu verifikasi admin.');
    }

    // SISI ADMIN: Daftar Transaksi Masuk
    public function indexAdmin()
    {
        // Memastikan hanya admin yang bisa akses
        if (Auth::user()->role !== 'admin') abort(403);

        return Inertia::render('Admin/Enrollments/Index', [
            'enrollments' => Enrollment::with(['user', 'course'])->where('status', 'pending')->get()
        ]);
    }

    // SISI ADMIN: Verifikasi Pembayaran
    public function approve(Enrollment $enrollment)
    {
        $enrollment->update(['status' => 'active']);
        return back()->with('success', 'Pembayaran disetujui, akses kursus telah dibuka.');
    }
}