<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_AssignGuruReadTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_read_assign_guru()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $course = Course::create([
            'title' => 'Kursus Laravel',
            'description' => 'Penggunaan Laravel untuk Web Development',
            'price' => 0,
            'duration' => '10 Jam',
            'level' => 'Beginner',
            'teacher_id' => null,
        ]);

        $this->browse(function (Browser $browser) use ($admin, $course) {
            $browser->loginAs($admin)
                    ->visit('/admin/assignments')
                    ->assertSee('Manajemen Penugasan Guru')
                    ->assertSee($course->title)
                    ->assertSee('Belum Ada Guru Ditugaskan');
        });
    }
}