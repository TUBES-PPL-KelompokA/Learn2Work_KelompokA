<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_AssignGuruUpdateTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_update_assign_guru()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $teacher1 = User::factory()->create([
            'name' => 'Agus', 
            'role' => 'teacher'
        ]);
        $teacher2 = User::factory()->create([
            'name' => 'Budi', 
            'role' => 'teacher'
        ]);
        
        Course::create([
            'title' => 'Dasar HTML',
            'description' => 'Pengenalan HTML',
            'price' => 0,
            'duration_days' => 10, 
            'level' => 'Beginner',
            'teacher_id' => $teacher1->id,
        ]);

        $this->browse(function (Browser $browser) use ($admin, $teacher2) {
            $browser->loginAs($admin)
                    ->visit('/admin/assignments')
                    ->waitForText('Agus', 10)
                    ->select('select', (string) $teacher2->id)
                    ->waitForText('Penugasan guru berhasil diperbarui.', 10)
                    ->assertSee('Budi');
        });
    }
}