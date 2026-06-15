<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class Adif_DownloadSertifikat extends DuskTestCase
{
    /**
     * PBI 18 - Download Sertifikat
     */
    public function test_download_sertifikat(): void
    {
        $this->browse(function (Browser $browser) {

            $browser->visit('http://127.0.0.1:8000/login')

                // Login Student
                ->type('email', 'student@learn2work.com')
                ->type('password', 'password')
                ->press('Masuk')

                ->pause(3000)

                // Masuk ke Kursus Saya
                ->clickLink('Kursus Saya')

                ->pause(3000)

                // Validasi kursus selesai
                ->assertSee('Coding')
                ->assertSee('100%')

                // Klik Lanjut Belajar
                ->clickLink('Lanjut Belajar')

                ->pause(3000)

                // Validasi halaman kursus
                ->assertSee('Hasil Evaluasi')
                ->assertSee('100')
                ->assertSee('Selesai')

                // Validasi tombol sertifikat
                ->assertSee('Unduh Sertifikat')

                // Klik download sertifikat
                ->clickLink('Unduh Sertifikat')

                ->pause(5000)

                ->screenshot('PBI18_Download_Sertifikat');
        });
    }
}