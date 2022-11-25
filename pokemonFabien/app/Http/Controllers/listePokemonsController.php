<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class listePokemonsController extends Controller
{
    function affiche_bestiaire(){
        $infosPokemon = DB::table('pokemon')->get();
        if(!$infosPokemon){
            throw new Exception('Impossible de receuillir les informations de la BDD');
        }
        return view('listePokemon', ['infosPokemon' => $infosPokemon]);
    }
}
