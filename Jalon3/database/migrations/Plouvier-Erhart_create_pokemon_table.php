<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePokemonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemon', function (Blueprint $table) {
            $table->string('name')->unique();
            $table->string('energy');
            $table->integer('pv_max');
            $table->integer('level');
            $table->integer('weight');
            $table->integer('height');
            $table->string('NameSpecialAttack');
            $table->integer('ScoreSpecialAttack');
            $table->string('NameNormalAttack');
            $table->integer('ScoreNormalAttack');
            $table->string('NameSpecialDefense');
            $table->integer('ScoreSpecialDefense');
            $table->string('pathImg');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pokemon');
    }
}