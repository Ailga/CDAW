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
     * Récupère le pokémon associé à l'ID stocké dans la colonne pokemonJoueur1 ou pokemonJoueur2 de la table battle.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function battlePokemon()
    {
        return $this->belongsTo(self::class, 'id');
    }
}
