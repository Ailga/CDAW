<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;

class listePokemonsController extends Controller
{
    function affiche_bestiaire(){
        $infosPokemon = Pokemon::get();
        if(!$infosPokemon){
            throw new Exception('Impossible de receuillir les informations de la BDD');
        }
        return view('listePokemon', ['infosPokemon' => $infosPokemon]);
    }
}
