<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_DeleteTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testDelete(): void
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
                ->press('🗑️')
                ->acceptDialog();
        });
    }
}