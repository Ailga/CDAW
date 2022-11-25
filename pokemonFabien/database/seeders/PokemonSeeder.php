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

        function getPokemonFromAPI($url, $limiteUrl, $numberPokemon)
        {
            //On récupère la liste des pokemons (qui contient que le nom et le lien des détails)
            $pathImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; // + 1.png par exemple
            $getListPokemon = file_get_contents($url . $limiteUrl);
            if($getListPokemon !=false){
                $listPokemonObj = json_decode($getListPokemon);
                $resultsPokemon = $listPokemonObj->{'results'};
                for($index = 1; $index <= $numberPokemon; $index++)
                {
                    $pokemon = $resultsPokemon[$index - 1];
                    $imgPokemon = $pathImg . $index . ".png";
                    list($energyPokemon, $pv_max, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale) = getInfoFromPokemon($url . "/" . strval($index));
                    createTableFromAPI($pokemon->{'name'}, $energyPokemon, $pv_max, 0, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale, $imgPokemon);
                    echo "Debug : Pokemon n°" . $index . "/$numberPokemon créé ✅\n";
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
                $scoreAttaqueNormale = $getInfosPokemonObj->{'stats'}[1]->{'base_stat'};
                $scoreAttaqueSpeciale = $getInfosPokemonObj->{'stats'}[3]->{'base_stat'};
                $scoreDefenseSpeciale = $getInfosPokemonObj->{'stats'}[4]->{'base_stat'};
                $weight = $getInfosPokemonObj->{'weight'};
                $height = $getInfosPokemonObj->{'height'};
                return array($energyPokemon, $pv_max, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale);
            }else{
                echo "Erreur : Impossible d'avoir des infos sur le pokemon";
            }
        }

        //On insert dans la table une nouvelle ligne
        function createTableFromAPI($name, $energy, $pv_max, $level, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale, $pathImg)
        {
            DB::table('pokemon')->insert([
                'name' => $name,
                'energy' => $energy,
                'pv_max' => $pv_max,
                'level' => $level,
                'weight' => $weight,
                'height' => $height,
                'scoreNormalAttack' => $scoreAttaqueNormale,
                'scoreSpecialAttack' => $scoreAttaqueSpeciale,
                'scoreSpecialDefense' => $scoreDefenseSpeciale,
                'pathImg' => $pathImg
               ]);
        }
        
        //On appel la fonction principale
        getPokemonFromAPI("https://pokeapi.co/api/v2/pokemon", "?limit=100000", 50);    // 50 pokemons max
    }
}
