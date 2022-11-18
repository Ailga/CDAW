<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PokemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        function getPokemonFromAPI($url, $numberPokemon)
        {
            //On récupère la liste des pokemons (qui contient que le nom et le lien des détails)
            $getListPokemon = file_get_contents($url);
            if($getListPokemon !=false){
                $listPokemonObj = json_decode($getListPokemon);
                $resultsPokemon = $listPokemonObj->{'results'};
                for($index = 0; $index <= $numberPokemon; $index++)
                {
                    $pokemon = $resultsPokemon[$index];
                    
                }
            }else{
                echo "Erreur : Impossible d'avoir la liste des pokemons";
            }
        }


        //Etape 1
        function createTableFromAPI()
        {
            DB::table('pokemon')->insert([
                'name' => "Dracaufeu",
                'energy' => "feu",
                'pv_max' => 100,
                'level' => 1,
                'pathImg' => "C/Users"
               ]);
        }
        
    }
}
