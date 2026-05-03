<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class briyan_DeleteTest extends DuskTestCase
{   
    /**
     * TC.Delete.007 - Positive: Menghapus soal
     */
    public function test_delete_question_pos(): void
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

                ->waitForText('Apa yang dimaksud dengan Laravel?', 10)
                ->pause(1000); 

            $browser->script("
                window.confirm = function() { return true; };

                let elements = Array.from(document.querySelectorAll('*')).filter(el => el.textContent.trim() === 'Apa yang dimaksud dengan Laravel?' && el.children.length === 0);
                
                if (elements.length > 0) {
                    let textNode = elements[0];
                    let row = textNode.closest('.bg-white') || textNode.parentElement.parentElement.parentElement;
                    
                    row.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                    row.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

                    let buttons = Array.from(row.querySelectorAll('button, a, svg'));
                    if (buttons.length > 0) {
                        // Kalau klik svg gagal, dia bakal klik parent button-nya
                        let target = buttons[buttons.length - 1];
                        if(target.tagName.toLowerCase() === 'svg') target = target.closest('button, a') || target;
                        target.click();
                    }
                }
            ");

            $browser->pause(2000) 
                ->waitUntilMissingText('Apa yang dimaksud dengan Laravel?', 10)
                ->assertDontSee('Apa yang dimaksud dengan Laravel?');
        });
    }

    /**
     * TC.Delete.008 - Negative: Batal menghapus soal
     */
    public function test_delete_question_neg(): void
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
                window.confirm = function() { return false; };

                let deleteBtns = Array.from(document.querySelectorAll('button, a, span, div')).filter(el => el.textContent.includes('🗑️') || el.innerHTML.includes('🗑️'));
                
                if (deleteBtns.length > 0) {
                    let target = deleteBtns[0];

                    let row = target.closest('.bg-white') || target.parentElement.parentElement;
                    if(row) {
                        row.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                        row.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                    }

                    if(target.tagName.toLowerCase() === 'svg') target = target.closest('button, a') || target;
                    target.click();
                }
            ");

            $browser->pause(1500)
                ->assertSee('Pertanyaan #'); 
        });
    }
}