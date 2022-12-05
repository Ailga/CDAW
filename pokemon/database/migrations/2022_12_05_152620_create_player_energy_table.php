<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerEnergyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_energy', function (Blueprint $table) {
            $table->unsignedBigInteger('id_energy')-> nullable();
            $table->unsignedBigInteger('id_player')-> nullable();
            $table->foreign('id_player')->references('id_player')->on('player');
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
        Schema::dropIfExists('player_energy');
    }
}
