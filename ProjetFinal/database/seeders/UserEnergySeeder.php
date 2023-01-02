<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserEnergy;
use App\Models\Energy;

class UserEnergySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // On récupère tous les utilisateurs et les énergies
        $users = User::all();
        $energies = Energy::all();


        $nombreMaxEnergy = 17;
        $index = 0;
        $nombreUser = $users->count();


        // Pour chaque utilisateur, on choisi une énergie aléatoire et on crée une nouvelle entrée dans la table user_energy
        foreach ($users as $user) {
            $index++;
            $randomEnergy = $energies->random();
            UserEnergy::create([
                'id_user' => $user->id,
                'id_energy' => $randomEnergy->id
            ]);

            echo "Debug : UserEnergy n°" . $index . "/$nombreUser créé ✅\n";
        }
    }
}
