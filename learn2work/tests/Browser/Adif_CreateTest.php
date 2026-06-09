<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class Adif_CreateTest extends DuskTestCase
{
    /**
     * @group Create
     */
    public function test_example(): void
    {
        $this->browse(function (Browser $browser) {

            // 🔥 pasti ada user
            $user = User::factory()->create(['role' => 'admin']);

            $browser->loginAs($user)
                ->visit('/courses')
                ->pause(3000)

                // DEBUG: cek apakah benar masuk halaman
                ->assertPathIs('/courses')

                // isi form
                ->type('title', 'Test Course')
                ->type('description', 'Ini course testing')
                ->type('price', '10000')
                ->type('duration_days', '30')

                ->press('Simpan Kursus')
                ->waitForText('Test Course', 10);
        });
    }
}