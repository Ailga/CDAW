<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;

class battlePokemonsController extends Controller
{
    function do_battle($namePokemonPlayer, $namePokemonOpponent){
        /**
         * TODO 
         */
        $pokemonPlayer = Pokemon::where('name',$namePokemonPlayer)->first();
        $pokemonOpponent = Pokemon::where('name', $namePokemonOpponent)->first();
        return view('battlePokemon', ['pokemonPlayer' => $pokemonPlayer, 'pokemonOpponent' => $pokemonOpponent]);
    }
}
