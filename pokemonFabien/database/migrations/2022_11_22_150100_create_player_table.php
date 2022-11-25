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
            $table->string('name')->unique();           //nom du joueur ou pseudo
            $table->string('level');                    //niveau du joueur
            $table->json('energies');                   //liste de nom d'energies
            $table->integer('battle_won');              //nombre de combat gagnés
            $table->integer('battle_lost');             //nombre de combats perdus
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
