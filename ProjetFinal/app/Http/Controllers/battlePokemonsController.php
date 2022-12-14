<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;
use App\Models\User;
use App\Models\Battle;
use App\Models\Energy;
use App\Models\UserEnergy;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\BattleRequest;

class battlePokemonsController extends Controller
{
    function do_battle()
    {
        $infoPlayerConnected = auth()->user();   
        $energyPlayer =  $infoPlayerConnected->energies[0]->id_energy;
        echo $energyPlayer;
         
        $energyRandomIfWin = Energy::inRandomOrder()->limit(1)->get()[0]; //On choisi une énergie au hasard, au cas où le joueur gagne
        $pokemonsPlayer = Pokemon::
                                    where('level', '<=', $infoPlayerConnected->level)
                                    ->where('id_energy', '=', $energyPlayer)
                                    ->inRandomOrder()
                                    ->limit(3)
                                    ->get(); //On choisi un pokemon au hasard
        return view('battle/main', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected, 'energyRandomIfWin' => $energyRandomIfWin]);
    }

    function battle_end_post(UserUpdateRequest $profilUpdate)
    {
        $user = User::find($profilUpdate->id);
        if($profilUpdate->energyIfWinID != 0)
        {
            $energyWin = Energy::find($profilUpdate->energyIfWinID);
            $userEnergy = UserEnergy::create([
                'id_energy' => $profilUpdate->energyIfWinID,
                'id_user' => $profilUpdate->id
            ]);
        }
        $user->level = $profilUpdate->level;
        $user->battle_won = $profilUpdate->battle_won;
        $user->battle_lost = $profilUpdate->battle_lost;
        $user->save();
        return $user;
    }

    function battle_save(BattleRequest $battleRequest)
    {
        $battleData = $battleRequest->json()->all();
        $battle = Battle::create([
            'duration' => $battleData['duration'],
            'mode' => $battleData['mode'],
            'pokemonJoueur1' => json_encode($battleData['pokemonJoueur1']),
            'pokemonJoueur2' => json_encode($battleData['pokemonJoueur2']),
            'winner' => $battleData['winner'],
            'id_user1' => $battleData['id_user1'],
            'id_user2' => $battleData['id_user2']
        ]);
        return $battle;
    }

    function affiche_liste(){
        $infosBattle = Battle::with('user1', 'user2')->get();
        if(!$infosBattle){
            throw new Exception('Impossible de receuillir les informations de la BDD');
        }
        return view('listeBattle', ['infosBattle' => $infosBattle]);
    }

}
