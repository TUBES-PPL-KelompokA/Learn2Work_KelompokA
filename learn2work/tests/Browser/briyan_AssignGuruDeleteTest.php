<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_AssignGuruDeleteTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_delete_assign_guru()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $teacher = User::factory()->create([
            'name' => 'Agus', 
            'role' => 'teacher'
        ]);
        
        Course::create([
            'title' => 'Dasar CSS',
            'description' => 'Pengenalan CSS',
            'price' => 0,
            'duration_days' => 10, 
            'level' => 'Beginner',
            'teacher_id' => $teacher->id,
        ]);

        $this->browse(function (Browser $browser) use ($admin) {
            $browser->loginAs($admin)
                    ->visit('/admin/assignments')
                    ->waitForText('Agus', 10)
                    ->click('button[title="Copot Penugasan"]')
                    ->acceptDialog()
                    ->waitForText('Guru berhasil dicopot dari kursus ini.', 10)
                    ->assertSee('Belum Ada Guru Ditugaskan');
        });
    }
}