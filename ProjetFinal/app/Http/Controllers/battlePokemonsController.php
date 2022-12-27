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
        //$pokemonPlayer2 = Pokemon::where('name',$namePokemonPlayer)->first();
        $pokemonsPlayer = Pokemon::inRandomOrder()->limit(3)->get(); //On choisi un pokemon au hasard
        return view('battlePokemon', ['pokemonsPlayer' => $pokemonsPlayer, 'infoPlayerConnected' => $infoPlayerConnected]);
    }
}
