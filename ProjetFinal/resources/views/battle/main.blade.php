@extends('navigation-menu')

<head>
  <title>Battle Pokemon</title>
  <link rel = "stylesheet" type = "text/css" href = "{{asset('css/battle/main.css')}}" />
  <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js" integrity="sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI" crossorigin="anonymous"></script>
  <script type = "text/javascript" src = "{{asset('js/battle/variables.js')}}"></script>
  <script type = "text/javascript" src = "{{asset('js/battle/main.js')}}"></script>
  <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
  @section('menu')

  <h1>Battle pokémon </h1>

  <div id="explicationsCombat">
  <h1>Battle pokémon </h1>
    <h3> Mode combat : Choix aléatoire + tour par tour </h3>
    <p>
      Dans ce mode de combat, vous affrontez un adversaire qui possède comme vous <b>3 pokémons</b> tirés aléatoirement.
      <br>Vous n'avez <b>pas de limite de temps</b>, c'est une fonctionnalité en développement mais vous pouvez tout de même savoir des infos sur le temps (total et par tour).
      <br>Vous verrez des <b>pokéballs rouge</b>, elles indiquent le nombre de pokémons restants.
      <br>Vous pouvez savoir à droite sous <b>État</b> si l'adversaire est prêt.
      <br><br><b>Ne l'oubliez pas, ne perdez pas tous vos pokémons, sinon c'est fini pour vous !</b>
    </p>
  </div>

  <script>
  // On envoie les objets pokemon sous format JSON au fichier js
  let objListePokemonsPlayer = <?php echo $pokemonsPlayer->toJson();?>

  let objPokemonPlayer = objListePokemonsPlayer[0];

  let objPlayer = <?php echo $infoPlayerConnected->toJson();?>

  let objEnergy = <?php echo $energyRandomIfWin->toJson();?>

  let playerOnline = false;

  setObjPlayer(objPlayer);
  setObjListePokemonPlayer(objListePokemonsPlayer);
  setObjEnergy(objEnergy);


  if("{{$infoPlayerConnected}}" !== null){
    playerOnline = true;
  }

  </script>

  <br<br>
  <div class="ecranRecherchePlayers">
    <div class="playerGauche">
    <img class="imgPlayerGauche" id="imgPlayerGauche" src="{{$infoPlayerConnected->profile_photo_path}}">
      <script>
        if("{{$infoPlayerConnected->profile_photo_path}}" == ''){
          const imgPlayerGauche = document.getElementById("imgPlayerGauche");
          imgPlayerGauche.src = "{{asset('/img/battle/imgPhotoProfil.jpg')}}";
        }
      </script>
      
      <div class="namePlayer">
      {{$infoPlayerConnected->name}}
      <br>
      Niveau {{$infoPlayerConnected->level}}
      </div>
    </div>
    <div class="imgVSCentre">
      <img class="imgVS" src="{{asset('/img/battle/battleVersus.gif')}}"/>
    </div>
    <div class="imgSearchCentre">
      <img class="imgSearch" src="{{asset('/img/battle/battleSearchPlayer.gif')}}"/>
    </div>
    <div class="playerDroite">
      <img class="imgPlayerDroite" src="{{asset('img/battle/imgPhotoProfil.jpg')}}">
      <div class="namePlayer">
        Recherche
      </div>
    </div>
    <div class="messageLancementCombat">
        Lancement dans 5 
    </div>
    
  </div>

  <div class="ecranGaucheJeu">
    <div class="game">
      <div class="opponent">
        <div class="stats">
          <div class="top">
            <div class="pokeballs">
              <div class="pokeball" id="opponentBall0"></div>
              <div class="pokeball" id="opponentBall1"></div>
              <div class="pokeball" id="opponentBall2"></div>
            </div>
            <div id = "apHP" class="hp-count">pokemonOpponent pv_max</div>
          </div>
          <span class="name" id="pokemonOpponentName">
            pokemonOpponent name
          </span>
          <span class="level" id="pokemonOpponentLevel">
            pokemonOpponent level
          </span>
        </div>
        <img class="pokemon" id="pokemonOpponentImg" src="" alt ="A sprite of the opponent pokemon" />
      </div>
      <div class="player">
        <div class="stats">
          <div class="top">
            <div class="pokeballs">
              <div class="pokeball" id="playerBall0"></div>
              <div class="pokeball" id="playerBall1"></div>
              <div class="pokeball" id="playerBall2"></div>
            </div>
            <div id = "myHP" class="hp-count">{{$pokemonsPlayer[0]->pv_max}}</div>
          </div>
          <span class="name" id="name">
            {{$pokemonsPlayer[0]->name}}
          </span>
          <span class="level" id="level">
            {{$pokemonsPlayer[0]->level}}
          </span>
        </div>
        <img class="pokemon" id="pokemonPlayerImg" src="{{$pokemonsPlayer[0]->pathImg}}" alt="A sprite of the player pokemon" />
      </div>
    </div>
    
    <div class="box">
      <div id = "message" class="message">
        Que doit faire {{$pokemonsPlayer[0]->name}}?
      </div>
      <div class="actions">
        <button id="attaqueNormale" onclick = "chooseActionPlayerTour('attaqueNormale')">Attaque normale</button>
        <button id="attaqueSpeciale" onclick = "chooseActionPlayerTour('attaqueSpeciale')">Attaque spéciale</button>
        <button id="defenseSpeciale" onclick = "chooseActionPlayerTour('defenseSpeciale')">Défense spéciale</button>
      </div>
      <div class = "continue">
        <button id="btnContinue" onclick = "actionContinue()">Continuer</button>
      </div>
    </div>
  </div>
  <div class="ecranDroiteJeu">
    <div class="boxNotificationCombat">
      <div id="infoPlayer">
        <h2>Player</h2>
        <div id="statutPlayer">
          <script>
          if(playerOnline){
            const statusPlayer = document.getElementById("statutPlayer");
            statusPlayer.innerHTML = "Status : Online ✅";
            statusPlayer.style.color = "green";
          }else{
            const statusPlayer = document.getElementById("statutPlayer"); 
            statusPlayer.innerHTML = "Status : Offline ❌";
            statusPlayer.style.color = "red";
          }
          </script>
        </div>
        <div id="statutCombat" style="color: red">
          État : Pas prêt
        </div>
        <div id="name">
          Pseudo :  {{$infoPlayerConnected->name}}
        </div>
        <div id="level">
          Niveau : {{$infoPlayerConnected->level}}
        </div>
      </div>

      <div id="infoOpponent">
        <br>
        <h2>Adversaire</h2>
        <div id="statutOpponent">
          Status : Offline
        </div>
        <div id="statutCombat" style="color: red">
          État : Pas prêt
        </div>
        <div id="name">
          Pseudo :  XXXXX
        </div>
        <div id="level">
          Niveau : XXXXX
        </div>
      </div>

        
      <div id="Time">
        <br>
        <h2>Temps </h2>
        Temps total : <div id="TotalTime"> </div>
        Temps du tour : <div id="TourTime"> </div>
      </div>
    </div>
  </div>  

</body>
