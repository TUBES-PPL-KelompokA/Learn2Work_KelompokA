<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            if (!Schema::hasColumn('enrollments', 'payment_proof')) {
                $table->string('payment_proof')->nullable()->after('course_id');
            }
            $table->string('status')->default('pending')->change();
        });
    }

    public function down(): void
    {
        Schema::table('enrollments', function (Blueprint $table) {
            if (Schema::hasColumn('enrollments', 'payment_proof')) {
                $table->dropColumn('payment_proof');
            }
            $table->string('status')->default('paid')->change();
        });
    }
};