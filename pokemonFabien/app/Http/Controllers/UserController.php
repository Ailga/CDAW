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
    //
}
