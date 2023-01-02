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
<h1> Liste des matchs </h1>
  <div class="container">
    <script>
      let durationSec;
      let textDuration;
      let battleID;
      let minutes;
      let secondes;
    </script>

    <table id='myTable' class='display'>
    <thead><tr><th>Date</th><th>Mode</th><th>Durée</th><th>Joueur1</th><th>Joueur2</th><th>Gagnant</th></tr></thead>
    <tbody>

    @foreach($infosBattle as $battle)
    <tr>
      <td width=20px align='center'>{{$battle->added_at}}</td>
      <td width=10px align='center'>{{$battle->mode}}</td>
      <td width=10px align='center' id={{$battle->id}}>
        <script>
          durationSec = <?php echo $battle->duration;?>;
          battleID = <?php echo $battle->id;?>;
          if(durationSec < 60)
          {
            textDuration = durationSec + " secs";
          }else
          {
            let minutes = Math.floor(durationSec / 60);
            let seconds = durationSec % 60;
            textDuration = minutes + " min et " + seconds + " sec";
          }
          document.getElementById(battleID).innerText = textDuration;

        </script>
      </td>
      <td width=20px align='center'>{{$battle->user1->name}}</td>
      <td width=20px align='center'>{{$battle->user2->name}}</td>
      <td width=20px align='center'>{{$battle->winner}}</td>
    </tr>
    @endforeach
    </tbody></table>

    <div id="legendeBattle">
      <i>Legende :
        <br>Signification des différents modes de combat : 
          <br><b>"AutoTour"</b> : Le choix des pokemons est tiré aléatoirement mais le combat est en tour par tour.
          <br><b>"ManualTour"</b> : Les joueurs vont s'affronter à tour de rôle. Un tour a une durée fixe de 30s.
          <br><b>"FullAuto"</b> : 3 pokemons sont tirés aléatoirement, l'ordre dans lequel les pokemons combattent est tirés aléatoirement.


      </i>
    
    </div>
  </div>

</div>

@section('footer')

</body>

