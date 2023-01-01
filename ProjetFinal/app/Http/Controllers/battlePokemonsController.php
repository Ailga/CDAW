<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;
use App\Models\User;
use App\Http\Requests\UserUpdateRequest;

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
        $user = User::find($profilUpdate->get('id'));
        $user->level = $profilUpdate->get('level');
        $user->battle_won = $profilUpdate->get('battle_won');
        $user->battle_lost = $profilUpdate->get('battle_lost');
        $user->save();
        return $user;
    }

    public function battle_end_get()
    {
        return view('battle/end');
    }
}
