<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_UpdateTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testUpdate(): void
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

                ->press('✏️')
                ->type('@company-name', 'PT. Shopee')
                ->type('@industry', 'E-commerce')
                ->type('@contact-email', 'shopee@shopee.com')
                ->type('@website-url', 'https://www.shopee.com')
                ->type('@description', 'Shopee adalah marketplace online di Indonesia')
                ->press('Simpan Perubahan');
        });
    }
}