<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEnergyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_energy', function (Blueprint $table) {
            $table->unsignedBigInteger('id_energy')-> nullable();
            $table->unsignedBigInteger('id_user')-> nullable();
            $table->foreign('id_user')->references('id')->on('users');
            $table->foreign('id_energy')->references('id')->on('energy');
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
