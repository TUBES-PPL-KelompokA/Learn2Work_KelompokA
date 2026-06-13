<?php

namespace Tests\Browser;

use App\Models\User;
use App\Models\Course;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_AssignGuruDeleteNegativeTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_negative_delete_button_hidden_if_no_teacher()
    {
       
        $admin = User::factory()->create(['role' => 'admin']);
    
        Course::create([
            'title' => 'Dasar CSS',
            'description' => 'Pengenalan CSS',
            'price' => 0,
            'duration_days' => 10,
            'level' => 'Beginner',
            'teacher_id' => null, 
        ]);

        $this->browse(function (Browser $browser) use ($admin) {
            $browser->loginAs($admin)
                    ->visit('/admin/assignments')
                    ->waitForText('Belum Ada Guru Ditugaskan', 10)
                    ->assertMissing('button[title="Copot Penugasan"]');
        });
    }
}