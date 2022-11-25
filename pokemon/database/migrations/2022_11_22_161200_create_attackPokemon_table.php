<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttackPokemonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attackPokemon', function (Blueprint $table) {
            $table->string('name')->unique();
            $table->integer('score');
            $table->string('type');                 //Pour le type d'attaque comme "attackNormal", "attackSpecial", "defenseSpecial"

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attackPokemon');
    }
}
