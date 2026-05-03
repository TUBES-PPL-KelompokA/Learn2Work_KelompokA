<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_CreateTest extends DuskTestCase
{
    use DatabaseMigrations, briyan_QuizTestBase;

    protected function setUp(): void
    {

        parent::setUp();
        $this->setupQuizContext();
    }

    /**
     * TC.Create.001 - Positive: Menguji pembuatan soal essay 
     */
    public function test_create_question_pos()
    {

    $this->browse(function (Browser $browser) {
        $browser->visit('/login')
            ->type('email', 'teacher@learn2work.com')
            ->type('password', 'password')
            ->click('button[type="submit"]')
            ->waitForLocation('/dashboard')

            ->clickLink('Kursus Saya')
            ->waitForLocation('/courses')

            ->clickLink('Detail') 
            ->waitForLocation('/courses/3') 

            ->waitFor('.bg-amber-50')
            ->pause(1000) 
            ->click('.bg-amber-50') 
            
            ->waitForText('Quiz: Modul 1')
            ->pause(1500)
            ->press('Tambah Pertanyaan')

            ->waitForText('Essay')
            ->press('Essay')

            ->type('textarea', 'Sebutkan keunggulan Laravel dibandingkan framework lain!')

            ->press('Simpan Pertanyaan')

            ->waitForText('Sebutkan keunggulan Laravel dibandingkan framework lain!')
            ->assertSee('Sebutkan keunggulan Laravel dibandingkan framework lain!');
        });
    }

    /**
     * TC.Create.002 - Negative : Menguji pembuatan soal essay 
     */
    public function test_create_question_neg()
    {
    $this->browse(function (Browser $browser) {
        $browser->deleteCookies() 
            ->visit('/login')
            ->type('email', 'teacher@learn2work.com')
            ->type('password', 'password')
            ->click('button[type="submit"]')
            ->waitForLocation('/dashboard')
            ->assertSee('Teacher Learn2Work') 

            ->clickLink('Kursus Saya')
            ->waitForLocation('/courses')
            ->clickLink('Detail')
            ->waitFor('.bg-amber-50')
            ->click('.bg-amber-50') 
            
            ->waitForText('Quiz: Modul 1')
            ->press('Tambah Pertanyaan')
            ->press('Essay')
            ->type('textarea', '') 
            ->press('Simpan Pertanyaan')
            ->waitForText('Harap isi Bidang ini', 10);
        });
    }
}