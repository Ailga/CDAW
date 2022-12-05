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
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('id_energy')-> nullable();
            $table->integer('pv_max');
            $table->integer('level');
            $table->integer('weight');
            $table->integer('height');
            $table->integer('scoreNormalAttack');
            $table->integer('scoreSpecialAttack');
            $table->integer('scoreSpecialDefense');
            $table->string('pathImg');

            $table->foreign('id_energy')->references('id_energy')->on('energy');
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
