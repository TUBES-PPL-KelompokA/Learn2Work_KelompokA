<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTestNeg extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
    public function testLoginNeg(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->type('email', 'user@example.com')
                ->type('password', 'wrongpassword')
                ->press('Masuk')
                ->waitForText('These credentials do not match our records.')
                ->assertSee('These credentials do not match our records.');
        });
    }
}
