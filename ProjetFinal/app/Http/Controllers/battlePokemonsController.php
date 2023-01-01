<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;
use App\Models\User;
use App\Models\Battle;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\BattleRequest;

class battlePokemonsController extends Controller
{
    public function do_battle()
    {
        $infoPlayerConnected = auth()->user();
        $pokemonsPlayer = Pokemon::inRandomOrder()->limit(3)->get(); //On choisi un pokemon au hasard
        return view('battle/main', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected]);
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
        $battle = new Battle;
        $battle->duration = $battleRequest->duration;
        $battle->mode = $battleRequest->mode;
        $battle->pokemonJoueur1 = $battleRequest->pokemonJoueur1;
        $battle->pokemonJoueur2 = $battleRequest->pokemonJoueur2;
        $battle->winner = $battleRequest->winner;
        $battle->id_user1 = $battleRequest->id_user1;
        $battle->id_user2 = $battleRequest->id_user2;
        //$battle->save();
        //return $battle;
    }

    public function battle_end_get()
    {
        return view('battle/end');
    }
}
