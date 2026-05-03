<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class RegisterTestPos extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
    public function testRegisterPos(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->type('name', 'jinan')
                ->type('email', 'jinan@example.com')
                ->type('password', 'password')
                ->type('password_confirmation', 'password')
                ->press('Buat Akun');
        });
    }
}
