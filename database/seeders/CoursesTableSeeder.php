<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert($this->getData());
    }

    public function getData()
    {
        $faker = Factory::create();
        $data = [];
        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'author' => $faker->name(),
                'title' => $faker->text(20),
                'description' => $faker->sentence(rand(10, 100)),
            ];
        }
        return $data;
    }
}
