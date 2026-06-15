<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Adif_ReadProgresBelajar extends DuskTestCase
{
    public function test_read_progress_belajar(): void
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('http://127.0.0.1:8000/login')

                ->type('email', 'student@learn2work.com')
                ->type('password', 'password')

                ->press('Masuk')

                ->pause(3000)

                ->visit('http://127.0.0.1:8000/my-dashboard')

                ->pause(3000)

                ->assertSee('Kursus Saya')
                ->assertSee('Coding')
                ->assertSee('100%')

                ->screenshot('PBI17_Read_Progress_Belajar');
        });
    }
}