<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_PembayaranNeg extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testPembayaranNeg(): void
    {
        $user = User::factory()->create([
            'role' => 'student'
        ]);

        $this->browse(function (Browser $browser) use($user):void {
            $browser->loginAs($user)
                ->visit('/dashboard')
                ->waitForText('Jelajahi')
                ->pause(1000)          
                ->clickLink('Jelajahi')
                ->waitForLocation('/courses', 10) 
                ->assertPathIs('/courses')
                ->clickLink('Daftar')
                ->waitForLocation('/courses/4/payment', 10)
                ->assertPathIs('/courses/4/payment')
                ->attach('#proof', 'C:\Users\Nann\Downloads\bukti_bayar.png')
                ->pause(1000)
                ->click('button[type="submit"]')
                ->pause(1000)
                ->assertSee('The payment proof field must not be greater than 2048 kilobytes.');
        });
    }
}