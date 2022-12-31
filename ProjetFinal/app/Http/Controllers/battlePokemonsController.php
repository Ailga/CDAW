<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;
use App\Models\User;
use App\Http\Requests\TestRequest;

class battlePokemonsController extends Controller
{
    public function do_battle()
    {
        $infoPlayerConnected = auth()->user();
        $pokemonsPlayer = Pokemon::inRandomOrder()->limit(3)->get(); //On choisi un pokemon au hasard
        return view('battle/main', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected]);
    }

    public function battle_end_post(TestRequest $profilUpdate)
    {
        //$profilUpdate->user()->fill($profilUpdate->validated());
        //$profilUpdate->user()->save();
        echo "dans controller";
        //echo "test battle end = " . print_r($profilUpdate);
        //return $profilUpdate;
    }

    public function battle_end_get()
    {
        return view('battle/end');
    }
}
