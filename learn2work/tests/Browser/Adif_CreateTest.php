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
            $user = User::factory()->create();

            $browser->loginAs($user)
                ->visit('/courses')
                ->pause(3000)

                // DEBUG: cek apakah benar masuk halaman
                ->assertPathIs('/courses')

                // isi form (pakai selector umum dulu)
                ->type('input', 'Test Course')
                ->keys('input', '{tab}', 'Ini course testing', '{tab}', '10000')

                ->press('Simpan Kursus')
                ->pause(2000)

                ->assertSee('Test Course');
        });
    }
}