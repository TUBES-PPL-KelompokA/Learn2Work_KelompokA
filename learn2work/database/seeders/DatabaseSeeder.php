<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create Admin User
        User::factory()->create([
            'name' => 'Admin Learn2Work',
            'email' => 'admin@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Create a Teacher User
        User::factory()->create([
            'name' => 'Teacher Learn2Work',
            'email' => 'teacher@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'teacher',
        ]);

        // Create a Student User
        User::factory()->create([
            'name' => 'Student Learn2Work',
            'email' => 'student@learn2work.com',
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);
    }
}
