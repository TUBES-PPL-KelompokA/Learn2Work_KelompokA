<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class RegisterTestNeg extends DuskTestCase
{
    public function testRegisterNeg(): void
    {
        $email = 'jinan@example.com';

        User::where('email', $email)->delete();

        User::factory()->create([
            'email' => $email
        ]);

        $this->browse(function (Browser $browser) use ($email): void {
            $browser->visit('/register')
                ->type('name', 'jinan')
                ->type('email', $email)
                ->type('password', 'password')
                ->type('password_confirmation', 'password')
                ->press('Buat Akun')
                ->waitForText('The email has already been taken.')
                ->assertSee('The email has already been taken.');
        });
    }
}