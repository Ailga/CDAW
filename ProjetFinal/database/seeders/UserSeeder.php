<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Energy;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pathImgsProfil = ["https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png", "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", "https://journalducoin-com.exactdn.com/app/uploads/2021/12/shutterstock_2075490577.jpg", "https://cdn.shortpixel.ai/spai/q_lossless+ret_img+to_webp/https://media.label.photo/2021/08/photo-de-profil-en-solo-Jennifer-Lescouet.jpg"];
        $nombreMaxUser = 10;    //On créer 10 users différents avec un password "password"

        for ($i = 1; $i <= $nombreMaxUser; $i++) {                
            $user = new User();
            $user->name = 'User' . $i;
            $user->email = 'user' . $i . '@example.com';
            $user->password = bcrypt('password');
            $user->level = mt_rand(0,10);
            $user->battle_won = mt_rand(0,30);
            $user->battle_lost = mt_rand(0,30);
            $user->profile_photo_path = $pathImgsProfil[array_rand($pathImgsProfil)];
            $user->save();

            echo "Debug : User n°" . $i . "/$nombreMaxUser créé ✅\n";
        }
    }
}

?>