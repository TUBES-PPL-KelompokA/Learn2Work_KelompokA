<?php 
 
namespace App\Http\Controllers; 
 
use App\Models\Course; 
use App\Models\Enrollment; 
use Illuminate\Support\Facades\Auth; 
use Barryvdh\DomPDF\Facade\Pdf; // Asumsi menggunakan dompdf/barryvdh 
 
class CertificateController extends Controller 
{ 
    public function download(Course $course) 
    { 
        $user = Auth::user(); 
 
        // Cek apakah student tersebut terdaftar di kursus ini 
        $enrollment = Enrollment::where('user_id', $user->id) 
                                ->where('course_id', $course->id) 
                                ->first(); 
 
        // Validasi Sesuai Revisi: Hanya bisa unduh jika status enrollment 'completed' 
        if (!$enrollment || $enrollment->status !== 'completed') { 
            abort(403, 'Anda belum menyelesaikan kursus ini sepenuhnya.'); 
        } 
 
        // Data yang dilempar ke view PDF 
        $data = [ 
            'student_name' => $user->name, 
            'course_name' => $course->title, 
            'completion_date' => $enrollment->updated_at->format('d F Y'), 
            'certificate_id' => 'L2W-' . str_pad($enrollment->id, 5, '0', STR_PAD_LEFT) 
        ]; 
 
        // View 'pdf.certificate' akan dibuat di Vue/Blade nanti di tahap Antigravity 
        $pdf = Pdf::loadView('pdf.certificate', $data) 
                  ->setPaper('a4', 'landscape'); 
 
        return $pdf->download('Sertifikat-' . $course->title . '-' . $user->name . '.pdf'); 
    } 
}