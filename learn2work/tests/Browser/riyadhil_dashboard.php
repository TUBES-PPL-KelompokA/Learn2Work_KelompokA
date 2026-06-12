<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use App\Models\User;

class riyadhil_dashboard extends DuskTestCase
{
    /**
     * A Dusk test example.
     */
        public function testDashboard(): void
    {
        $user = User::factory()->create([
            'role' => 'admin'
        ]);

        $this->browse(function (Browser $browser) use($user):void {
            $browser->loginAs($user)
                ->visit('/dashboard')
                ->assertPathIs('/dashboard');
        });
    }
}