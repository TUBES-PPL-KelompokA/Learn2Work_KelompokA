<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function store(Request $request, $course_id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content_url' => 'nullable|url',
            'order_number' => 'required|integer|min:1',
        ]);

        Module::create([
            'course_id' => $course_id,
            'title' => $request->title,
            'content_url' => $request->content_url,
            'order_number' => $request->order_number,
        ]);

        return back(); // Kembali ke halaman detail kursus
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return back();
    }
}