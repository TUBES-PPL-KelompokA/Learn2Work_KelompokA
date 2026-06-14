<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use App\Models\PartnerCompany;
use App\Models\InternshipApplication;

class Bahaa_PendaftaranMagangDeleteTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function student_can_withdraw_their_application()
    {
        $student = User::create([
            'name' => 'Student Delete',
            'email' => 'student.delete@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $company = PartnerCompany::create([
            'name' => 'Delete Company',
            'industry' => 'Tech',
            'description' => 'Company for delete test',
        ]);

        $app = InternshipApplication::create([
            'user_id' => $student->id,
            'partner_company_id' => $company->id,
            'internship_opening_id' => null,
            'cv_path' => 'tests/Browser/test_files/test_cv.pdf',
        ]);
        $this->browse(function (Browser $browser) use ($student, $company, $app) {
            $browser->loginAs($student)
                ->visit(route('internships.index'))
                ->press('Batalkan')
                ->acceptDialog()
                ->waitForText('Pendaftaran magang berhasil dibatalkan.')
                ->assertSee('Pendaftaran magang berhasil dibatalkan.');
        });
    }
}
