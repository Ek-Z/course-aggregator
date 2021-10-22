<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('programmingLanguage_id')
                ->constrained('programming_languages')
                ->cascadeOnDelete();
            $table->string('title', 191);
            $table->string('author', 191)->nullable();
            $table->string('image', 255)->nullable();
            $table->enum('status', ['DRAFT', 'PUBLISHED', 'DELETED'])
                ->default('DRAFT');
            $table->boolean('isActive')
                ->default(1);
            $table->softDeletes();
            $table->text('description')->nullable();
            $table->enum('language', ['English', 'Русский'])
                ->default('Русский');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
