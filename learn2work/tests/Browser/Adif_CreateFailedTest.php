<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class Adif_CreateFailedTest extends DuskTestCase
{
    /**
     * @group CreateFail
     */
    public function test_example(): void
    {
        $this->browse(function (Browser $browser) {

            $user = User::factory()->create(['role' => 'admin']);

            $browser->loginAs($user)
                ->visit('/courses')
                ->pause(3000)

                ->type('title', '')
                ->type('description', '')
                ->type('price', '')

                ->press('Simpan Kursus')
                ->pause(2000)

                ->assertDontSee('Failed Test Course');
        });
    }
}