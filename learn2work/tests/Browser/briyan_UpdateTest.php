<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_UpdateTest extends DuskTestCase
{   
    /**
     * TC.Update.005 - Positive: Update soal berhasil
     */
    public function test_update_question_pos(): void
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
                ->waitForText('Quiz: Modul 1', 10)
                ->waitForText('Sebutkan keunggulan Laravel', 10)
                ->pause(1000); 

            $browser->script("
                let buttons = Array.from(document.querySelectorAll('button, a')).filter(el => el.textContent.includes('✏️'));
                if(buttons.length > 0) {
                    buttons[0].click(); 
                }
            "); 

            $browser->waitFor('textarea', 10) 
                ->pause(1000); 
                

            $browser->script("
                let ta = document.querySelector('textarea');
                let nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
                nativeSetter.call(ta, 'Apa yang dimaksud dengan Laravel?');
                ta.dispatchEvent(new Event('input', { bubbles: true }));
                ta.dispatchEvent(new Event('change', { bubbles: true }));
            ");

            $browser->pause(1000);

            $browser->script("
                let simpanBtns = Array.from(document.querySelectorAll('button')).filter(el => el.textContent.includes('Simpan Pertanyaan') && el.offsetParent !== null);
                if(simpanBtns.length > 0) simpanBtns[0].click();
            ");

            $browser->waitForText('Apa yang dimaksud dengan Laravel?', 10)
                ->assertSee('Apa yang dimaksud dengan Laravel?');
        });
    }

    /**
     * TC.Update.006 - Negative: Gagal update karena input kosong
     */
    public function test_update_question_neg(): void
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
                ->waitForText('Quiz: Modul 1', 10)
                ->pause(1000); 

            $browser->script("
                let buttons = Array.from(document.querySelectorAll('button, a')).filter(el => el.textContent.includes('✏️'));
                if(buttons.length > 0) {
                    buttons[0].click(); 
                }
            "); 
            
            $browser->waitFor('textarea', 10) 
                ->pause(1000); 

            $browser->script("
                let ta = document.querySelector('textarea');
                let nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
                nativeSetter.call(ta, ''); // SENGAJA DIKOSONGKAN
                ta.dispatchEvent(new Event('input', { bubbles: true }));
                ta.dispatchEvent(new Event('change', { bubbles: true }));
            ");

            $browser->pause(1000);

            $browser->script("
                let simpanBtns = Array.from(document.querySelectorAll('button')).filter(el => el.textContent.includes('Simpan Pertanyaan') && el.offsetParent !== null);
                if(simpanBtns.length > 0) simpanBtns[0].click();
            ");

            $browser->waitForText('The question text field is required', 10)
                ->assertSee('The question text field is required');
        });
    }    
}