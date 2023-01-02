@extends('footer')
@extends('navigation-menu')

<head>
    <link rel="stylesheet" href="{{asset('css/dashboard.css')}}">
    
</head>

@section('menu')

<div class="container mt-5 mb-5">
            <div class="row no-gutters">
                <div class="col-md-4 col-lg-4"><img src="{{$infoPlayerConnected->profile_photo_path}}"></div>
                <div class="col-md-8 col-lg-8">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 class="display-5">Bienvenue {{$infoPlayerConnected->name}}</h3><i class="fa fa-facebook"></i><i class="fa fa-google"></i><i class="fa fa-youtube-play"></i><i class="fa fa-dribbble"></i><i class="fa fa-linkedin"></i></div>
                        <div class="p-3 bg-black text-white">
                            <h6>Level {{$infoPlayerConnected->level}}</h6>
                        </div>
                        <div class="d-flex flex-row text-white">
                            <div class="p-4 bg-primary text-center skill-block">
                                <h4>{{$infoPlayerConnected->battle_won}}</h4>
                                <h6>Battles gagnées</h6>
                            </div>
                            <div class="p-3 bg-success text-center skill-block">
                                <h4>{{$infoPlayerConnected->battle_lost}}</h4>
                                <h6>Battles perdues</h6>
                            </div>
                            <div class="p-3 bg-warning text-center skill-block">
                                <h4>{{$infoPlayerConnected->created_at}}</h4>
                                <h6>Membre depuis</h6>
                            </div>
                            <div class="p-3 bg-danger text-center skill-block">
                                <h4>{{$infoPlayerConnected->updated_at}}</h4>
                                <h6>Dernière connexion</h6>
                            </div>
                        </div>
                    </div>
                <div>
                    <br>
                    <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span class="d-flex align-items-center">
                            <a href="{{ url('/battle') }}">Combattre</a>
                        </span>
                    </button>
                              Lancer une recherche de combat pour affronter un adversaire !
                    <br><br>

                    <button class="btn btn-tertiary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span class="d-flex align-items-center">
                            <a href="{{ url('/battle') }}">Edit profile</a>
                        </span>
                    </button>
                              Modifier les informations relatives à votre profil
                    <br><br>
                    @auth
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button class="btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                            <span class="d-flex align-items-center">
                                Déconnexion
                            </span>
                        </button>
                              Déconnecter vous de la session
                    </form>
                    @endauth
                </div>
                </div>
                

            </div>
        </div>
@section('footer')
    </body>