<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player', function (Blueprint $table) {
            $table->id('id_player');                     //ID du joueur (différent de celui de l'utilisateur)
            $table->unsignedBigInteger('id_user');  //ID du compte utilisateur (différent du joueur)
            $table->string('name');           //nom du joueur ou pseudo
            $table->string('level');                    //niveau du joueur
            $table->integer('battle_won');              //nombre de combat gagnés
            $table->integer('battle_lost');             //nombre de combats perdus

            $table->foreign('id_player')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player');
    }
}
