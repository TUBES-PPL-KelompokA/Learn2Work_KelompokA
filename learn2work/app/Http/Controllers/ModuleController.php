<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    public function store(Request $request, $course_id)
    {
        $course = Course::findOrFail($course_id);
        if (Auth::user()->role === 'teacher' && $course->teacher_id !== Auth::id()) {
            abort(403, 'Akses ditolak. Anda bukan pengajar yang ditugaskan pada kursus ini.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content_url' => 'nullable|url',
            'text_content' => 'nullable|string',
        ]);

        $orderNumber = Module::where('course_id', $course_id)->max('order_number') + 1;

        Module::create([
            'course_id' => $course_id,
            'title' => $request->title,
            'content_url' => $request->content_url,
            'text_content' => $request->text_content,
            'order_number' => $orderNumber,
        ]);

        return back(); // Kembali ke halaman detail kursus
    }

    public function update(Request $request, Module $module)
    {
        $module->load('course');
        if (Auth::user()->role === 'teacher' && $module->course->teacher_id !== Auth::id()) {
            abort(403, 'Akses ditolak. Anda bukan pengajar yang ditugaskan pada kursus ini.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content_url' => 'nullable|url',
            'text_content' => 'nullable|string',
        ]);

        $module->update($request->only(['title', 'content_url', 'text_content']));

        return back();
    }

    public function destroy(Module $module)
    {
        $module->load('course');
        if (Auth::user()->role === 'teacher' && $module->course->teacher_id !== Auth::id()) {
            abort(403, 'Akses ditolak. Anda bukan pengajar yang ditugaskan pada kursus ini.');
        }

        $courseId = $module->course_id;
        $module->delete();

        // Susun ulang penomoran urutan agar tetap urut mulai dari 1
        $remainingModules = Module::where('course_id', $courseId)
            ->orderBy('order_number', 'asc')
            ->get();

        foreach ($remainingModules as $index => $mod) {
            $mod->update(['order_number' => $index + 1]);
        }

        return back();
    }
}