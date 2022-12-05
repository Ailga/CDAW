<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EnergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        function getListEnergy(){
            $listEnergy = array(
                "normal" => "https://www.pokepedia.fr/images/thumb/b/bf/Miniature_Type_Normal_EV.png/80px-Miniature_Type_Normal_EV.png",
                "fighting" => "https://www.pokepedia.fr/images/thumb/9/96/Miniature_Type_Combat_EV.png/80px-Miniature_Type_Combat_EV.png",
                "flying" => "https://www.pokepedia.fr/images/thumb/9/99/Miniature_Type_Vol_EV.png/80px-Miniature_Type_Vol_EV.png",
                "poison" => "https://www.pokepedia.fr/images/thumb/1/1c/Miniature_Type_Poison_EV.png/80px-Miniature_Type_Poison_EV.png",
                "ground" => "https://www.pokepedia.fr/images/thumb/4/40/Miniature_Type_Sol_EV.png/80px-Miniature_Type_Sol_EV.png",
                "rock" => "https://www.pokepedia.fr/images/thumb/f/fe/Miniature_Type_Roche_EV.png/80px-Miniature_Type_Roche_EV.png",
                "bug" => "https://www.pokepedia.fr/images/thumb/a/a9/Miniature_Type_Insecte_EV.png/80px-Miniature_Type_Insecte_EV.png",
                "ghost" => "https://www.pokepedia.fr/images/thumb/b/bc/Miniature_Type_T%C3%A9n%C3%A8bres_EV.png/80px-Miniature_Type_T%C3%A9n%C3%A8bres_EV.png",
                "steel" => "https://www.pokepedia.fr/images/thumb/2/27/Miniature_Type_Acier_EV.png/80px-Miniature_Type_Acier_EV.png",
                "fire" => "https://www.pokepedia.fr/images/thumb/c/c7/Miniature_Type_Feu_EV.png/80px-Miniature_Type_Feu_EV.png",
                "water" => "https://www.pokepedia.fr/images/thumb/3/3d/Miniature_Type_Eau_EV.png/80px-Miniature_Type_Eau_EV.png",
                "grass" => "https://www.pokepedia.fr/images/thumb/d/d9/Miniature_Type_Plante_EV.png/80px-Miniature_Type_Plante_EV.png",
                "electric" => "https://www.pokepedia.fr/images/thumb/6/6d/Miniature_Type_%C3%89lectrik_EV.png/80px-Miniature_Type_%C3%89lectrik_EV.png",
                "psychic" => "https://www.pokepedia.fr/images/thumb/8/81/Miniature_Type_Psy_EV.png/80px-Miniature_Type_Psy_EV.png",
                "ice" => "https://www.pokepedia.fr/images/thumb/e/e7/Miniature_Type_Glace_EV.png/80px-Miniature_Type_Glace_EV.png",
                "dragon" => "https://www.pokepedia.fr/images/thumb/3/3d/Miniature_Type_Dragon_EV.png/80px-Miniature_Type_Dragon_EV.png",
                "dark" => "https://www.pokepedia.fr/images/thumb/9/93/Miniature_Type_Obscur_EB.png/80px-Miniature_Type_Obscur_EB.png",
                "fairy" => "https://www.pokepedia.fr/images/thumb/5/58/Miniature_Type_F%C3%A9e_EV.png/80px-Miniature_Type_F%C3%A9e_EV.png"
            );
            return $listEnergy;
        }
        function createTableFromList($listEnergy){
            foreach($listEnergy as $nameEnergy => $pathImg){
                DB::table('energy')->insert([
                    'name' => $nameEnergy,
                    'pathIcon' => $pathImg,
                   ]);
                echo "Debug : Énergie " . $nameEnergy . " créée ✅\n";
            }
            
        }

        //On appel la fonction principale
        createTableFromList(getListEnergy());
    }
}

