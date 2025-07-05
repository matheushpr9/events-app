<?php

use App\Enums\SpaceLocalityEnum;
use App\Enums\SpaceTypeEnum;
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
        Schema::create('spaces', function (Blueprint $table) {
            $table->id();
            $table->integer('people_capacity');
            $table->float('price_per_person_buffet');
            $table->enum('type', SpaceTypeEnum::getValues());
            $table->enum('locality', SpaceLocalityEnum::getValues());
            $table->json('amenities')->nullable();
            $table->json('services')->nullable(); 
            $table->longText('description');
            $table->timestamps();
        });

        Schema::create('space_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('space_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spaces');
        Schema::dropIfExists('space_images');
    }
};
