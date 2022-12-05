<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlayerController extends Controller
{
    function affiche_playerEnergy($name){
        echo $name;
        $player = Player::where('name',$name)->first();
        echo $player->test();
        echo $player[0]->test();
        return view('player',['player' => $player]);
    }
    //
}
