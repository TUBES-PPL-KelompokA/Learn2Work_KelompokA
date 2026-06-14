<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use App\Models\PartnerCompany;
use App\Models\InternshipApplication;

class Bahaa_PendaftaranMagangUpdateTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function student_can_update_their_application_cv()
    {
        $student = User::create([
            'name' => 'Student Update',
            'email' => 'student.update@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $company = PartnerCompany::create([
            'name' => 'Update Company',
            'industry' => 'Tech',
            'description' => 'Company for update test',
        ]);

        $app = InternshipApplication::create([
            'user_id' => $student->id,
            'partner_company_id' => $company->id,
            'internship_opening_id' => null,
            'cv_path' => 'tests/Browser/test_files/test_cv.pdf',
        ]);

        $filePath = base_path('tests/Browser/test_files/test_cv.pdf');

        $this->browse(function (Browser $browser) use ($student, $company, $app, $filePath) {
            $browser->loginAs($student)
                ->visit(route('internships.edit', $app->id))
                ->attach('input[name=cv_file]', $filePath)
                ->press('Perbarui CV')
                ->waitForText('CV berhasil diperbarui.')
                ->assertSee('CV berhasil diperbarui.');
        });
    }
}
