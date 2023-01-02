<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{
    function affiche_userEnergy($name){
        $user = User::where('name',$name)->first();
        return view('user',['user' => $user]);
    }
    
    function affiche_liste(){
        $infosPlayers = User::get();
        if(!$infosPlayers){
            throw new Exception('Impossible de receuillir les informations de la BDD');
        }
        return view('listePlayers', ['infosPlayers' => $infosPlayers]);
    }

    function affiche_dashboard(){
        $infoPlayerConnected = auth()->user();
        return view('dashboard', ['infoPlayerConnected' => $infoPlayerConnected]);
    }
}
