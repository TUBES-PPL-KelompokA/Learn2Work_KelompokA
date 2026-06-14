<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use App\Models\PartnerCompany;
use App\Models\InternshipApplication;

class Bahaa_PendaftaranMagangReadTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function student_can_view_their_applications()
    {
        $student = User::create([
            'name' => 'Student Read',
            'email' => 'student.read@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $company = PartnerCompany::create([
            'name' => 'Read Company',
            'industry' => 'Tech',
            'description' => 'Company for read test',
        ]);

        $app = InternshipApplication::create([
            'user_id' => $student->id,
            'partner_company_id' => $company->id,
            'internship_opening_id' => null,
            'cv_path' => 'tests/Browser/test_files/test_cv.pdf',
        ]);

        $this->browse(function (Browser $browser) use ($student, $company) {
            $browser->loginAs($student)
                ->visit(route('internships.index'))
                ->assertSee('Daftar Pendaftaran Magang Saya')
                ->assertSee('Read Company');
        });
    }
}
