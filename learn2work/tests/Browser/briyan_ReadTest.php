<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_ReadTest extends DuskTestCase
{
    /**
     * TC.Read.003 - Positive: User bisa membaca daftar soal
     */
    public function test_read_question_pos(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->driver->manage()->deleteAllCookies(); 

            $browser->visit('/login')
                ->waitFor('input[name="email"]', 10)
                ->type('email', 'teacher@learn2work.com')
                ->type('password', 'password')
                ->click('button[type="submit"]')
                ->waitForLocation('/dashboard', 10)

                ->visit('/quizzes/9')

                ->waitForText('Quiz: Modul 1', 15)

                ->waitForText('Sebutkan keunggulan Laravel dibandingkan framework lain!', 15) 
                ->assertSee('Sebutkan keunggulan Laravel dibandingkan framework lain!');
        });
    }

    /**
     * TC.Read.004 - Negative: User bisa membaca daftar soal
     */
    public function test_read_question_neg(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->driver->manage()->deleteAllCookies(); 

            $browser->visit('/login')
                ->waitFor('input[name="email"]', 10)
                ->type('email', 'teacher@learn2work.com')
                ->type('password', 'password')
                ->click('button[type="submit"]')
                ->waitForLocation('/dashboard', 10)

                ->visit('/quizzes/10')

                ->waitForText('Daftar Pertanyaan (0)', 15)
                ->waitForText('Belum ada pertanyaan. Mulai buat sekarang!', 15)
                ->assertSee('Belum ada pertanyaan. Mulai buat sekarang!');
        });
    }
}