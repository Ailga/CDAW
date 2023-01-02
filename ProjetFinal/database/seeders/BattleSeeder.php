<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Pokemon;
use App\Models\Battle;

class BattleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $nombreMaxBattle = 20;
        $pokemonIds = Pokemon::pluck('id')->toArray();

        $modes = ['AutoTour', 'ManualTour', 'FullAuto'];

        for ($i = 1; $i <= $nombreMaxBattle; $i++) {
            $user1 = User::inRandomOrder()->first();
            $user2 = User::inRandomOrder()->first();
            $battle = new Battle();
            $battle->duration = rand(1, 600);
            $battle->mode = $modes[array_rand($modes)];
            $battle->pokemonJoueur1 = json_encode(array_rand($pokemonIds, 3));
            $battle->pokemonJoueur2 = json_encode(array_rand($pokemonIds, 3));
            $battle->winner = [$user1, $user2][array_rand([$user1, $user2])]->name;
            $battle->id_user1 = $user1->id;
            $battle->id_user2 = $user2->id;
            $battle->save();

            echo "Debug : Battle n°" . $i . "/$nombreMaxBattle créé ✅\n";
        }
    }
}
