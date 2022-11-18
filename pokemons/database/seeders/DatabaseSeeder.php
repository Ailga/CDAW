<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*DB::table('energy')->insert([
            'name' => Str::random(10)
           ]);*/
        //Energy::factory(10)->create();
        $this->call(EnergySeeder::class);
    }
}
