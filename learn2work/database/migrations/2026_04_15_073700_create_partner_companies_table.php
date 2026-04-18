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
        Schema::create('partner_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Perusahaan
            $table->string('industry'); // Bidang Industri
            $table->text('description'); // Deskripsi Perusahaan
            $table->string('logo_url')->nullable(); // Link logo perusahaan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_companies');
    }
};
