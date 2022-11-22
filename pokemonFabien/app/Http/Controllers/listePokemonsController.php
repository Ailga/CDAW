<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class listePokemonsController extends Controller
{
    function affiche_bestiaire(){
        $infosPokemon = DB::table('pokemon')->get();
        return view('listePokemon', ['infosPokemon' => $infosPokemon]);
    }
}
