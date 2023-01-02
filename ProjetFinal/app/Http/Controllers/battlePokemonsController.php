<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;
use App\Models\User;
use App\Models\Battle;
use App\Models\Energy;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\BattleRequest;

class battlePokemonsController extends Controller
{
    public function do_battle()
    {
        $ernegyRandomIfWin = Energy::inRandomOrder()->limit(1)->get(); //On choisi une énergie au hasard, au cas où le joueur gagne
        $infoPlayerConnected = auth()->user();
        $pokemonsPlayer = Pokemon::inRandomOrder()->limit(3)->get(); //On choisi un pokemon au hasard
        return view('battle/main', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected, 'ernegyRandomIfWin' => $ernegyRandomIfWin]);
    }

    public function battle_end_post(UserUpdateRequest $profilUpdate)
    {
        $user = User::find($profilUpdate->id);
        $user->level = $profilUpdate->level;
        $user->battle_won = $profilUpdate->battle_won;
        $user->battle_lost = $profilUpdate->battle_lost;
        $user->save();
        return $user;
    }

    public function battle_save(BattleRequest $battleRequest)
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

    public function battle_end_get()
    {
        return view('battle/end');
    }
}
