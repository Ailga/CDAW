<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{


    /**
     * The table associated with the model.
     *
     * @var string
     */

    protected $table = 'pokemon';
    
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
    
    public function energy() {
        return $this->belongsTo(Energy::class, 'id_energy', 'id');
    }

    /**
     * Fonction de test
     */
    public function test(){ 
        $test = 'ce que tu veux';
        return $test;
    }
}
