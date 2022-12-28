<head>
  <title>Battle Pokemon</title>
  <link rel = "stylesheet" type = "text/css" href = "{{asset('css/battle/main.css')}}" />
  <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js" integrity="sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI" crossorigin="anonymous"></script>
  <script type = "text/javascript" src = "{{asset('js/battle/variables.js')}}"></script>
  <script type = "text/javascript" src = "{{asset('js/battle/mainv2.js')}}"></script>
</head>

<h1>Battle pokémon </h1>

<script>
// On envoie les objets pokemon sous format JSON au fichier js
let objListePokemonsPlayer = <?php echo $pokemonsPlayer->toJson();?>

let objPokemonPlayer = objListePokemonsPlayer[0];

let objPlayer = <?php echo $infoPlayerConnected->toJson();?>

let playerOnline = false;

setObjPlayer(objPlayer);
//setObjPokemonPlayer(objPokemonPlayer);
setObjListePokemonPlayer(objListePokemonsPlayer);
//setObjPokemonOpponent(objPokemonOpponent);


if("{{$infoPlayerConnected}}" !== null){
  playerOnline = true;
}

</script>

<br<br>
<div class="ecranRecherchePlayers">
  <div class="messageLancementCombat">
      Lancement dans 5 
  </div>
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
    Level {{$infoPlayerConnected->level}}
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
  
</div>

<div class="ecranGaucheJeu">
  <div class="game">
    <div class="opponent">
      <div class="stats">
        <div class="top">
          <div class="pokeballs">
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
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
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
            <div class="pokeball"></div>
          </div>
          <div id = "myHP" class="hp-count">{{$pokemonsPlayer[0]->pv_max}}</div>
        </div>
        <span class="name">
          {{$pokemonsPlayer[0]->name}}
        </span>
        <span class="level">
          {{$pokemonsPlayer[0]->level}}
        </span>
      </div>
      <img class="pokemon" src="{{$pokemonsPlayer[0]->pathImg}}" alt="A sprite of the player pokemon" />
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
  <h2>Mode combat : XXXX </h2>
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
        Name :  {{$infoPlayerConnected->name}}
      </div>
      <div id="level">
        Level : {{$infoPlayerConnected->level}}
      </div>
    </div>

    <div id="infoOpponent">
      <h2>Opponent</h2>
      <div id="statutOpponent">
        Status : Offline
      </div>
      <div id="statutCombat" style="color: red">
        État : Pas prêt
      </div>
      <div id="name">
        Name :  XXXXX
      </div>
      <div id="level">
        Level : XXXXX
      </div>
    </div>
  </div>
</div>  
