<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\User;
use App\Models\PartnerCompany;

class Bahaa_PendaftaranMagangApplyTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test */
    public function student_can_apply_to_an_opening()
    {
        $student = User::create([
            'name' => 'Student Apply',
            'email' => 'student.apply@example.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $company = PartnerCompany::create([
            'name' => 'Apply Company',
            'industry' => 'Tech',
            'description' => 'Company for apply test',
        ]);

        $opening = $company->internshipOpenings()->create([
            'title' => 'Internship Slot Apply',
            'description' => 'Test opening for apply',
            'status' => 'open',
        ]);

        $filePath = base_path('tests/Browser/test_files/test_cv.pdf');

        $this->browse(function (Browser $browser) use ($student, $company, $filePath) {
            $browser->loginAs($student)
                ->visit(route('companies.show', $company->id))
                ->press('Lamar Posisi Ini')
                ->attach('input[type=file]', $filePath)
                ->press('Kirim Lamaran Sekarang')
                ->waitForText('Pendaftaran berhasil dikirim!')
                ->assertSee('Pendaftaran berhasil dikirim!');
        });
    }
}
