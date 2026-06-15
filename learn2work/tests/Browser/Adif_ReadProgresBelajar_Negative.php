<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Adif_ReadProgresBelajar_Negative extends DuskTestCase
{
    /**
     * PBI 17 Negative
     */
    public function test_student_belum_login(): void
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('http://127.0.0.1:8000/my-dashboard')

                ->pause(3000)

                ->assertPathIs('/login')

                ->screenshot('PBI17_Negative_Belum_Login');
        });
    }
}