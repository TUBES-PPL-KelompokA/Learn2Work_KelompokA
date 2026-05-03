<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTestPos extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
    public function testLoginPos(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->type('email', 'jinan@example.com')
                ->type('password', 'password')
                ->press('Masuk');
        });
    }
}
