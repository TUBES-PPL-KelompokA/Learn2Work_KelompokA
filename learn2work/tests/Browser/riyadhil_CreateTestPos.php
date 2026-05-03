<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_CreateTestPos extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testCreatePos(): void
    {
        $user = User::factory()->create([
            'role' => 'admin'
        ]);

        $this->browse(function (Browser $browser) use($user):void {
            $browser->loginAs($user)
                ->visit('/dashboard')
                ->waitForText('Mitra')
                ->pause(1000)          
                ->clickLink('Mitra')
                ->waitForLocation('/companies', 10) 
                ->assertPathIs('/companies')

                ->type('@company-name', 'PT. Tokopedia')
                ->type('@industry', 'E-commerce')
                ->type('@contact-email', 'tokopedia@example.com')
                ->type('@website-url', 'https://www.tokopedia.com')
                ->type('@description', 'Tokopedia adalah marketplace online di Indonesia')
                ->press('Simpan Mitra');
        });
    }
}