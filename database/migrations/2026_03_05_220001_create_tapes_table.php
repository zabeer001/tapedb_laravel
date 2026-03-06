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
        Schema::create('tapes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('name', 191)->nullable();
            $table->string('title', 191)->nullable();
            $table->string('year', 50)->nullable();
            $table->string('distributor', 255)->nullable();
            $table->text('case_desc')->nullable();
            $table->text('seal')->nullable();
            $table->text('sticker')->nullable();
            $table->text('watermarks')->nullable();
            $table->text('etching')->nullable();
            $table->text('notes')->nullable();
            $table->string('qa_checked', 10)->nullable();
            $table->string('guard_color', 255)->nullable();
            $table->string('upc', 255)->nullable();
            $table->string('img1', 255)->nullable();
            $table->string('img2', 255)->nullable();
            $table->string('img3', 255)->nullable();
            $table->string('img4', 255)->nullable();
            $table->string('img5', 255)->nullable();
            $table->string('img6', 255)->nullable();
            $table->boolean('approved')->default(false);
            $table->dateTime('created_at')->useCurrent();

            $table->index('user_id', 'user_id_idx');
            $table->index('name', 'name_idx');
            $table->index('year', 'year_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tapes');
    }
};
