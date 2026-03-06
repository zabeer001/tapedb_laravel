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
            $table->index('qa_checked', 'qa_checked_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tapes', function (Blueprint $table) {
            $table->dropIndex('qa_checked_idx');
        });
    }
};
