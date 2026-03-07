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
            $table->index(['user_id', 'qa_checked'], 'tapes_user_qa_idx');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->index('role', 'users_role_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tapes', function (Blueprint $table) {
            $table->dropIndex('tapes_user_qa_idx');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('users_role_idx');
        });
    }
};
