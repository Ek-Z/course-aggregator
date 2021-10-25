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
                'programmingLanguage_id' => rand(1, 5),
                'source' => $faker->text(5),
                'title' => $faker->text(15),
                'description' => $faker->sentence(rand(3, 20)),
            ];
        }
        return $data;
    }
}
