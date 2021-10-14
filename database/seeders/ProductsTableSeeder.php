<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory;
use Illuminate\Support\Facades\DB;



class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert($this->getData());
    }

    public function getData()
    {
        $faker = Factory::create();
        $data = [];

        // Create 20 product records
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'title' => $faker->text(20),
                'description' => $faker->sentence(rand(10, 100)),
            ];
        }
        return $data;
    }
}
