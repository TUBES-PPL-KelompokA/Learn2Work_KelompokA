<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use App\Models\PartnerCompany;
use App\Models\InternshipApplication;

class Bahaa_PendaftaranMagangDeleteNegativeTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function non_owner_cannot_see_delete_button()
    {
        $owner = User::create([
            'name' => 'Owner Student',
            'email' => 'owner.student@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $company = PartnerCompany::create([
            'name' => 'Delete Test Company',
            'industry' => 'Tech',
            'description' => 'Company for delete negative test',
        ]);

        $application = InternshipApplication::create([
            'user_id' => $owner->id,
            'partner_company_id' => $company->id,
            'internship_opening_id' => null,
            'cv_path' => 'tests/Browser/test_files/test_cv.pdf',
        ]);

        $otherUser = User::create([
            'name' => 'Other Student',
            'email' => 'other.student@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $this->browse(function (Browser $browser) use ($otherUser, $application) {
            $browser->loginAs($otherUser)
                ->visit(route('internships.index'))
                ->assertDontSee('Batalkan');
        });

        $this->assertDatabaseHas('internship_applications', [
            'id' => $application->id,
        ]);
    }
}
