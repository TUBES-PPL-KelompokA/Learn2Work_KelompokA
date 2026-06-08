<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            // Menambahkan kolom status dan bukti pembayaran
            $table->string('payment_proof')->nullable()->after('course_id');
            $table->enum('status', ['pending', 'active', 'rejected'])->default('pending')->after('payment_proof');
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropColumn(['payment_proof', 'status']);
        });
    }
};