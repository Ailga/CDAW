<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\battlePokemonsController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/battle', 'battlePokemonsController@do_battle');
    Route::post('/battle/save', 'battlePokemonsController@battle_save');
    Route::post('/battle/main', 'battlePokemonsController@battle_end_post');
});

Route::get('/listeBattle', 'battlePokemonsController@affiche_liste');

Route::get('/listePokemon', 'listePokemonsController@affiche_bestiaire');

Route::get('/listePlayer', 'UserController@affiche_liste');

Route::get('/user/{name}','UserController@affiche_userEnergy');

Route::get('/joueurs', function () {
    return view('autresJoueurs');
});

require __DIR__.'/auth.php';
