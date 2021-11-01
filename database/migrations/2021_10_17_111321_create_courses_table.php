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
            $table->string('title', 250);
            $table->string('source_name', 250)->nullable();
            $table->string('source_url');
            $table->string('image', 250)->nullable();
            $table->enum('status', ['DRAFT', 'PUBLISHED', 'DELETED'])
                ->default('DRAFT');
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
