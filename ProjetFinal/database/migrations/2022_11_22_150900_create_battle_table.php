<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBattleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('battle', function (Blueprint $table) {
            $table->id()->unique();
            $table->timestampTz('added_at');          //On créer une colonne avec une date et une timezone pour la mise en ligne du match
            $table->integer('duration');              //On créer une colonne avec la durée en seconde des matchs
            $table->string('mode');                   //Pour choisir le mode du combat comme "auto", "manuelTour", "autoTour"
            $table->json('pokemonJoueur1');           //Contient la liste des noms des pokemons utilisés pour le joueur 1
            $table->json('pokemonJoueur2');           //Contient la liste des noms des pokemons utilisés pour le joueur 2
            $table->string('winner');                 //Contient le pseudo du gagnant
            $table->unsignedBigInteger('id_user1');
            $table->unsignedBigInteger('id_user2');

            $table->foreign('id_user1')->references('id')->on('users');
            $table->foreign('id_user2')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('battle');
    }
}
