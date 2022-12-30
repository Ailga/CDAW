<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;

class battlePokemonsController extends Controller
{
    function do_battle()
    {
        $infoPlayerConnected = auth()->user();
        $pokemonsPlayer = Pokemon::inRandomOrder()->limit(3)->get(); //On choisi un pokemon au hasard
        return view('battle/main', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected]);
    }

    function battle_end($request)
    {
        $requestData = $request->all();
        echo "test battle end = " . $requestData;
    }
}
