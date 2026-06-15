<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Adif_DownloadSertifikat_Negative extends DuskTestCase
{
    /**
     * PBI 18 Negative
     */
    public function test_sertifikat_tidak_muncul_jika_belum_selesai(): void
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('/login')

                ->type('email', 'student@learn2work.com')
                ->type('password', 'password')

                ->press('Masuk')

                ->pause(3000)

                ->visit('/my-dashboard')

                ->pause(3000)

                ->assertDontSee('Unduh Sertifikat')

                ->screenshot('PBI18_Negative_Sertifikat_Tidak_Muncul');
        });
    }
}