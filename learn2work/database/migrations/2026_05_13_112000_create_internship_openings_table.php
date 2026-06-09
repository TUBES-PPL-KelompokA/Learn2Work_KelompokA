<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('internship_openings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partner_company_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('status')->default('open'); // 'open' or 'closed'
            $table->timestamps();
        });

        Schema::table('internship_applications', function (Blueprint $table) {
            $table->foreignId('internship_opening_id')->nullable()->constrained()->cascadeOnDelete()->after('partner_company_id');
        });
    }

    public function down(): void
    {
        Schema::table('internship_applications', function (Blueprint $table) {
            $table->dropForeign(['internship_opening_id']);
            $table->dropColumn('internship_opening_id');
        });

        Schema::dropIfExists('internship_openings');
    }
};
