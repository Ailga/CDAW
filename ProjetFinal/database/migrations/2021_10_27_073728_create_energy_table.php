<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnergyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('energy', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestampTz('added_at')->nullable();          //On créer une colonne avec une date et une timezone pour l'ajout de l'énergie'
            $table->string('pathIcon');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('energy');
    }
}
