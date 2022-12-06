<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */

    protected $table = 'player';

    public function energies() {
        return $this->hasMany(PlayerEnergy::class,'id_player');
    }
    public function test(){ 
        $test = 'ce que tu veux';
        return $test;
    }
}
