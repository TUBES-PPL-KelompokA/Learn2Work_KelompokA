<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseAssignmentAndEnrollmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_unassign_teacher_from_course(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $teacher = User::factory()->create(['role' => 'teacher']);
        
        $course = Course::create([
            'teacher_id' => $teacher->id,
            'title' => 'Test Course',
            'description' => 'Test Description',
            'price' => 100000,
            'level' => 'premium',
            'duration_days' => 30,
        ]);

        $response = $this
            ->actingAs($admin)
            ->delete("/admin/assignments/{$course->id}");

        $response->assertRedirect();
        
        $course->refresh();
        $this->assertNull($course->teacher_id);
    }

    public function test_student_cannot_enroll_in_same_course_twice(): void
    {
        $student = User::factory()->create(['role' => 'student']);
        
        $course = Course::create([
            'teacher_id' => null,
            'title' => 'Test Course',
            'description' => 'Test Description',
            'price' => 100000,
            'level' => 'premium',
            'duration_days' => 30,
        ]);

        // First enrollment (creates one)
        Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'status' => 'pending',
        ]);

        // Attempting to access payment page for already enrolled course should redirect back to course show
        $response = $this
            ->actingAs($student)
            ->get("/courses/{$course->id}/payment");

        $response->assertRedirect(route('courses.show', $course->id));

        // Attempting to POST payment for already enrolled course should redirect back to course show
        $response = $this
            ->actingAs($student)
            ->post("/courses/{$course->id}/enroll", [
                'payment_proof' => \Illuminate\Http\UploadedFile::fake()->image('proof.jpg')
            ]);

        $response->assertRedirect(route('courses.show', $course->id));
        
        // Assert there is still only 1 enrollment record in database
        $this->assertEquals(1, Enrollment::where('user_id', $student->id)->where('course_id', $course->id)->count());
    }

    public function test_admin_creates_course_without_teacher(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this
            ->actingAs($admin)
            ->post("/courses", [
                'title' => 'Admin Course',
                'description' => 'Admin Course Description',
                'price' => 200000,
                'level' => 'premium',
                'duration_days' => 60,
            ]);

        $response->assertRedirect(route('courses.index'));
        
        $course = Course::where('title', 'Admin Course')->first();
        $this->assertNotNull($course);
        $this->assertNull($course->teacher_id);
    }
}
