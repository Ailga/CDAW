<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Energy;

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
                    $level = mt_rand(0, 10);                //Le niveau est nombre aléatoire en 0 et 10
                    list($energyPokemon, $pv_max, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale) = getInfoFromPokemon($url . "/" . strval($index));
                    createTableFromAPI($pokemon->{'name'}, $energyPokemon, $pv_max, $level, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale, $imgPokemon);
                    echo "Debug : Pokemon n°" . $index . "/$numberPokemon créé ✅\n";
                }
            }else{
                echo "Erreur : Impossible d'avoir la liste des pokemons";
            }
        }

        function getIdEnergy($energyPokemon){
            $energies=Energy::where('name',$energyPokemon)->get();
            foreach ($energies as $column_energy) {
                $id_energy=$column_energy->id;
            }
            return $id_energy;
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
                $id_energy=getIdEnergy($energyPokemon);
                return array($id_energy, $pv_max, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale);
            }else{
                echo "Erreur : Impossible d'avoir des infos sur le pokemon";
            }
        }

        //On insert dans la table une nouvelle ligne
        function createTableFromAPI($name, $energy, $pv_max, $level, $weight, $height, $scoreAttaqueNormale, $scoreAttaqueSpeciale, $scoreDefenseSpeciale, $pathImg)
        {
            DB::table('pokemon')->insert([
                'name' => $name,
                'id_energy' => $energy,
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
