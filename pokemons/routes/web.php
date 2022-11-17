<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',function(){return view('listePokemon');});


Route::get('/{prenom}/{nom}', function ($prenom, $nom) {
    $listePokemon="Liste des Pokemons";
    echo $prenom.$listePokemon;
    //return "Hello World";
    /*return view('welcome');*/

})->where('prenom','[A-Za-z]+')->where('nom','[A-Za-z]+');

Route::get('/{prenom}', 'listePokemonsController@appel_template', function ($prenom) {
    

});
