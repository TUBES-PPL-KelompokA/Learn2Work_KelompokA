<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use App\Models\Quiz;
use Illuminate\Support\Facades\Hash;

trait briyan_QuizTestBase
{
    protected $teacher;
    protected $quiz;

    public function setupQuizContext()
    {
        
        $this->teacher = User::create([
            'name' => 'Teacher Briyan',
            'email' => 'teacher' . uniqid() . '@learn2work.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

    
        $course = Course::create([
            'teacher_id' => $this->teacher->id,
            'title' => 'Web Dev',
            'description' => 'Full Stack',
            'price' => 199000,
            'duration_days' => 30,
        ]);

        $module = Module::create([
            'course_id' => $course->id,
            'title' => 'Modul Utama Testing',
            'order_number' => 1,
            'content_url' => 'https://youtu.be/skXQdq_BMkI?si=X1ooE-k7YxRbx0oV',
        ]);

        $this->quiz = Quiz::create([
            'module_id' => $module->id,
            'title' => 'Test Quiz',
            'min_score' => 80,
        ]);
    }
}