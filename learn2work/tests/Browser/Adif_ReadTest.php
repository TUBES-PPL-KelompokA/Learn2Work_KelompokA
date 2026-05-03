<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;
use App\Models\Course;

class Adif_ReadTest extends DuskTestCase
{
    /**
     * @group Read
     */
    public function test_example(): void
    {
        $this->browse(function (Browser $browser) {

            // 🔥 pastikan user ada
            $user = User::factory()->create();

            // 🔥 buat data course
            $course = Course::create([
                'teacher_id' => $user->id,
                'title' => 'Course Testing',
                'description' => 'Deskripsi Testing',
                'price' => 10000,
            ]);

            $browser->loginAs($user)
                ->visit('/courses')
                ->pause(3000)

                // cek apakah course tampil
                ->assertSee('Course Testing')
                ->assertSee('Deskripsi Testing');
        });
    }
}