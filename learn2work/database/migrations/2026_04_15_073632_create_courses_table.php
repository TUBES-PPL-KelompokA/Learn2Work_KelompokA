<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel users khusus untuk teacher
            $table->foreignId('teacher_id')->constrained('users')->cascadeOnDelete(); 
            $table->string('title');
            $table->text('description');
            $table->integer('price'); // Harga kursus (karena sistem beli putus)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};