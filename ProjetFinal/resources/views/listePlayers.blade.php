@extends('template')
@extends('footer')
@extends('navigation-menu')
@section('content')

<head>
  <script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
  <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="{{asset('css/datatableStyles.css')}}">
</head>

<body>
  @section('menu')
  
<div class ="masthead">
<h1> Liste des joueurs </h1>
  <div class="container">
  
    <table id='myTable' class='display'>
    <thead><tr><th>Profil</th><th>Pseudo</th><th>Niveau</th><th>Battles gagnées</th><th>Battle perdues</th><th>Membre depuis</th><th>Dernière connexion</th></tr></thead>
    <tbody>
    @foreach($infosPlayers as $player)
    <tr>
      <td width=20px align='justify'>
        <img src="{{$player->profile_photo_path}}" height='90'>
      </td>
      <td width=20px align='center'>{{$player->name}}</td>
      <td width=10px align='center'>{{$player->level}}</td>
      <td width=90px align='center'>{{$player->battle_won}}</td>
      <td width=20px align='center'>{{$player->battle_lost}}</td>
      <td width=120px align='center'>{{$player->created_at}}</td>
      <td width=100px align='center'>{{$player->updated_at}}</td>
    </tr>
    @endforeach
    </tbody></table>
  </div>

</div>

@section('footer')

</body>

