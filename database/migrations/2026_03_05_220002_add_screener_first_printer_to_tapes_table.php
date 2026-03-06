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
        Schema::table('tapes', function (Blueprint $table) {
            $table->string('screener', 10)->nullable();
            $table->string('first_printer', 10)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tapes', function (Blueprint $table) {
            $table->dropColumn(['screener', 'first_printer']);
        });
    }
};
