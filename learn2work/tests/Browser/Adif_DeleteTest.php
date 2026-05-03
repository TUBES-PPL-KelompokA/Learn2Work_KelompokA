<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;
use App\Models\Course;
use App\Models\Module;

class Adif_DeleteTest extends DuskTestCase
{
    /**
     * @group Delete
     */
    public function test_example(): void
    {
        $this->browse(function (Browser $browser) {

            // 🔥 pastikan user ada
            $user = User::factory()->create();

            // 🔥 buat course
            $course = Course::create([
                'teacher_id' => $user->id,
                'title' => 'Course Testing',
                'description' => 'Deskripsi Testing',
                'price' => 10000,
            ]);

            // 🔥 buat module
            $module = Module::create([
                'course_id' => $course->id,
                'title' => 'Module 1',
                'content_url' => 'https://youtube.com',
                'order_number' => 1,
            ]);

            $browser->loginAs($user)
                ->visit("/courses/{$course->id}")
                ->pause(3000)

                // pastikan module muncul
                ->assertSee('Module 1')

                // klik hapus
                ->press('Hapus')
                ->pause(2000)

                // pastikan sudah hilang
                ->assertDontSee('Module 1');
        });
    }
}