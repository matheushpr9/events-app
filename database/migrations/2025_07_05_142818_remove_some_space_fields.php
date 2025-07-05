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
        Schema::table('spaces', function (Blueprint $table) {
            $table->dropColumn('price_per_person_buffet');
        });
        Schema::table('spaces', function (Blueprint $table) {
            $table->dropColumn('rating');
        });
        Schema::table('spaces', function (Blueprint $table) {
            $table->dropColumn('reviews_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('spaces', function (Blueprint $table) {
            $table->decimal('price_per_person_buffet', 8, 2)->nullable();
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('reviews_count')->default(0);
        });
    }
};
