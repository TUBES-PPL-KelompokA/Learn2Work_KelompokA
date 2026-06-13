<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_AssignGuruCreateTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_create_assign_guru()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $teacher = User::factory()->create([
            'name' => 'Guru Pertama', 
            'role' => 'teacher'
        ]);
        
        Course::create([
            'title' => 'Kursus Laravel',
            'description' => 'Laravel pada Web Development',
            'price' => 0,
            'duration' => '10 Jam',
            'level' => 'Beginner',
            'teacher_id' => null,
        ]);

        $this->browse(function (Browser $browser) use ($admin, $teacher) {
            $browser->loginAs($admin)
                    ->visit('/admin/assignments')
                    ->select('select', (string) $teacher->id)
                    ->waitForText('Penugasan guru berhasil diperbarui.')
                    ->assertSee('Guru Pertama');
        });
    }
}