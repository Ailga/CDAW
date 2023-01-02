<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{


    /**
     * The table associated with the model.
     *
     * @var string
     */

    protected $table = 'battle';
    
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
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'duration',
        'mode',
        'pokemonJoueur1',
        'pokemonJoueur2',
        'winner',
        'id_user1',
        'id_user2'
    ];


    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'd/m/Y H:i:s';
    

    /**
     * The names of the columns used to store the timestamps.
     *
     * 
     */ 
    const CREATED_AT = 'created_at';

    public function user1()
    {
        return $this->belongsTo(User::class, 'id_user1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'id_user2');
    }
}
