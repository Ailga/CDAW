<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Player;

class PlayerController extends Controller
{
    function affiche_playerEnergy($name){
        $player = Player::where('name',$name)->first();
        echo $player->name;
        echo $player->test();
        //print_r($player->energies());
        foreach($player->energies() as $e){
            echo $e;
            echo $e->energy()->name;
        }
        return view('player',['player' => $player]);
    }
    //
}
