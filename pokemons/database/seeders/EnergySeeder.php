<?php

namespace Database\Seeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('energy')->insert([
            'name' => Str::random(10)
           ]);

    }
}
