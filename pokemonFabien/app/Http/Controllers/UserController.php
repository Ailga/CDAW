<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    function affiche_playerEnergy($name){
        echo $name;
        $user = User::where('name',$name)->first();
        echo $user->test();
        echo $user[0]->test();
        return view('user',['user' => $user]);
    }
    //
}
