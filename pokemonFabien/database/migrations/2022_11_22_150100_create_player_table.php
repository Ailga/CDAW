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
            $table->id();                     //ID du joueur (différent de celui de l'utilisateur)
            $table->unsignedBigInteger('id_user');  //ID du compte utilisateur (différent du joueur)
            $table->string('name');           //nom du joueur ou pseudo
            $table->string('level');                    //niveau du joueur
            $table->json('energies');                   //liste de nom d'energies
            $table->integer('battle_won');              //nombre de combat gagnés
            $table->integer('battle_lost');             //nombre de combats perdus

            $table->foreign('id')->references('id')->on('users');
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
