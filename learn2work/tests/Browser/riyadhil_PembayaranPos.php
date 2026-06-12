<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_PembayaranPos extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testPembayaranPos(): void
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
                ->attach('#proof', 'C:\Users\Nann\Downloads\telkom_schools.png')
                ->pause(1000)
                ->click('button[type="submit"]');
        });
    }
}