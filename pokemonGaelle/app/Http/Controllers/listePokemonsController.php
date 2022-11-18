<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class listePokemonsController extends Controller
{
    function appel_template($prenom){
        return view('listePokemon', ['prenom' => $prenom]);
    }
    //
}
