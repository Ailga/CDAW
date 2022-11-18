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
            $pathImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; // + 1.png par exemple
            $getListPokemon = file_get_contents($url);
            if($getListPokemon !=false){
                $listPokemonObj = json_decode($getListPokemon);
                $resultsPokemon = $listPokemonObj->{'results'};
                for($index = 1; $index <= $numberPokemon; $index++)
                {
                    $pokemon = $resultsPokemon[$index - 1];
                    $imgPokemon = $pathImg . $index . ".png";
                    list($energyPokemon, $pv_max) = getInfoFromPokemon($url . strval($index));
                    createTableFromAPI($pokemon->{'name'}, $energyPokemon, $pv_max, 0, $imgPokemon);
                }
            }else{
                echo "Erreur : Impossible d'avoir la liste des pokemons";
            }
        }

        //On récupère d'autres info comme le hp ou l'energie d'un pokemon
        function getInfoFromPokemon($urlPokemon)
        {
            $getInfosPokemon = file_get_contents($urlPokemon);
            if($getInfosPokemon != false){
                $getInfosPokemonObj = json_decode($getInfosPokemon);
                $energyPokemon = $getInfosPokemonObj->{'types'}[0]->{'type'}->{'name'};
                $pv_max = $getInfosPokemonObj->{'stats'}[0]->{'base_stat'};
                return array($energyPokemon, $pv_max);
            }else{
                echo "Erreur : Impossible d'avoir des infos sur le pokemon";
            }
        }

        //On insert dans la table une nouvelle ligne
        function createTableFromAPI($name, $energy, $pv_max, $level, $pathImg)
        {
            DB::table('pokemon')->insert([
                'name' => $name,
                'energy' => $energy,
                'pv_max' => $pv_max,
                'level' => $level,
                'pathImg' => $pathImg
               ]);
        }
        
        //On appel la fonction principale
        getPokemonFromAPI("https://pokeapi.co/api/v2/pokemon/", 20);    // 20 pokemons max
    }
}
