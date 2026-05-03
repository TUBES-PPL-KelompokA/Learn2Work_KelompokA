<?php

namespace Tests\Browser;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Module;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Bahaa_ReadTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function testRead(): void
    {
        $teacher = User::factory()->create([
            'name' => 'Teacher Learn2Work',
            'email' => 'teacher@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'teacher',
        ]);

        $student = User::factory()->create([
            'name' => 'Student Learn2Work',
            'email' => 'student@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $course = Course::create([
            'teacher_id' => $teacher->id,
            'title' => 'Pembelajaran Website',
            'description' => 'Mempelajari pondasi awal pembuatan website.',
            'price' => 150000,
            'duration_days' => 30,
        ]);

        $module = Module::create([
            'course_id' => $course->id,
            'title' => 'Pembelajaran Website',
            'text_content' => 'Dasar-dasar HTML dan CSS untuk membangun halaman web.',
            'order_number' => 1,
        ]);

        $this->browse(function (Browser $browser) use ($student, $course) {
            $browser->loginAs($student)
                    ->visit("/courses/{$course->id}")
                    ->waitForLink('Lanjut Belajar →', 10)
                    ->assertSee('Lanjut Belajar')
                    ->clickLink('Lanjut Belajar →')
                    ->waitForText('📋 Daftar Modul', 10)
                    ->assertSee('📋 Daftar Modul');
        });
    }
}
