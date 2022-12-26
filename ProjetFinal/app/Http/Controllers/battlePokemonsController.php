<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;

class battlePokemonsController extends Controller
{
    function do_battle(){
        /**
         * TODO 
         */
        $infoPlayerConnected = auth()->user();
        $pokemonPlayer = Pokemon::inRandomOrder()->limit(1)->get()[0];      //On choisi un pokemon au hasard
        //$pokemonPlayer2 = Pokemon::where('name',$namePokemonPlayer)->first();
        return view('battlePokemon', ['pokemonPlayer' => $pokemonPlayer, 'infoPlayerConnected' => $infoPlayerConnected]);
    }
}
