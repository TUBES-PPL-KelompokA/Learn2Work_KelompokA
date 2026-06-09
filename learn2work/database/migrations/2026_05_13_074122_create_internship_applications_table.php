<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('partner_company_id')->constrained('partner_companies')->cascadeOnDelete();
            $table->string('cv_path');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('internship_applications');
    }
};