<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;
use App\Models\Course;

class Adif_UpdateTest extends DuskTestCase
{
    /**
     * @group Update
     */
    public function test_example(): void
    {
        $this->browse(function (Browser $browser) {

            $user = User::factory()->create();

            // buat course
            $course = Course::create([
                'teacher_id' => $user->id,
                'title' => 'Course Lama',
                'description' => 'Deskripsi Lama',
                'price' => 10000,
            ]);

            // update data (backend)
            $course->update([
                'title' => 'Course Baru',
            ]);

            $browser->loginAs($user)
                ->visit('/courses')
                ->pause(3000) // 🔥 penting

                // cek apakah data sudah berubah
                ->assertSee('Course Baru');
        });
    }
}