<?php

namespace Tests\Browser;

use App\Models\Course;
use App\Models\Module;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Bahaa_CreateTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function testCreate(): void
    {
        $teacher = User::factory()->create([
            'name' => 'Teacher Learn2Work',
            'email' => 'teacher@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'teacher',
        ]);

        $course = Course::create([
            'teacher_id' => $teacher->id,
            'title' => 'Pembelajaran Website',
            'description' => 'Mempelajari pondasi awal pembuatan website.',
            'price' => 150000,
            'duration_days' => 30,
        ]);

        Module::create([
            'course_id' => $course->id,
            'title' => 'Pembelajaran Website',
            'text_content' => 'Dasar-dasar HTML dan CSS untuk membangun halaman web.',
            'order_number' => 1,
        ]);

        $student = User::factory()->create([
            'name' => 'Student Learn2Work',
            'email' => 'student@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $this->browse(function (Browser $browser) use ($student, $course) {
            $browser->visit('/login')
                    ->type('email', $student->email)
                    ->type('password', 'password')
                    ->press('Masuk')
                    ->waitForText('Kursus Saya', 10)
                    ->visit('/courses')
                    ->waitForText('Katalog Kursus', 10)
                    ->assertSee($course->title)
                    ->press('Daftar')
                    ->waitForText('Pembayaran Kursus', 10)
                    ->assertSee('Bayar Sekarang')
                    ->press('Bayar Sekarang')
                    ->waitForText('📋 Daftar Modul', 10)
                    ->assertSee($course->title);
        });
    }
}
