<head>
  <title>Battle Pokemon</title>
  <script type = "text/javascript" src = "{{asset('js/battle/main.js')}}"></script>
  <link rel = "stylesheet" type = "text/css" href = "{{asset('css/battle/main.css')}}" />
</head>
<h1>Info débug temp </h1>
<h2>Pokemon Joueur</h2>
<ul>
  <li>Name : {{$pokemonPlayer->name}}</li>
  <li>Energy : {{$pokemonPlayer->energy->name}}</li>
  <li>Icon energy : <img src="{{$pokemonPlayer->energy->pathIcon}}"/></li>
  <li>Hp : {{$pokemonPlayer->pv_max}}</li>
</ul>

<h2>Pokemon Adversaire </h2>
<ul>
  <li>Name : {{$pokemonOpponent->name}}</li>
  <li>Energy : {{$pokemonOpponent->energy->name}}</li>
  <li>Icon energy : <img src="{{$pokemonOpponent->energy->pathIcon}}"/></li>
  <li>Hp : {{$pokemonOpponent->pv_max}}</li>
</ul>

<script>
// On envoie les objets pokemon sous format JSON au fichier js
var objPokemonPlayer = <?php echo $pokemonPlayer->toJson();?>

var objPokemonOpponent = <?php echo $pokemonOpponent->toJson();?>

setObjPokemonPlayer(objPokemonPlayer);
setObjPokemonOpponent(objPokemonOpponent);

</script>

<br<br>
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
          <div id = "apHP" class="hp-count">{{$pokemonOpponent->pv_max}}</div>
        </div>
        <span class="name">
          {{$pokemonOpponent->name}}
        </span>
        <span class="level">
          {{$pokemonOpponent->level}}
        </span>
      </div>
      <img class="pokemon" src="{{$pokemonOpponent->pathImg}}" alt ="A sprite of the opponent pokemon" />
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
          <div id = "myHP" class="hp-count">{{$pokemonPlayer->pv_max}}</div>
        </div>
        <span class="name">
          {{$pokemonPlayer->name}}
        </span>
        <span class="level">
          {{$pokemonPlayer->level}}
        </span>
      </div>
      <img class="pokemon" src="{{$pokemonPlayer->pathImg}}" alt="A sprite of the player pokemon" />
    </div>
  </div>
  
  <div class="box">
    <div id = "message" class="message">
      Que doit faire {{$pokemonOpponent->name}}?
    </div>
    <div class="actions">
      <button onclick = "waterCannon()">Attaque normale</button>
      <button onclick = "waterPulse()">Attaque spéciale</button>
      <button onclick = "surf()">Défense spéciale</button>
    </div>
    <div class = "continue">
      <button onclick = "compPokemon()">Continue</button>
    </div>
  </div>
</div>
<div class="ecranDroiteJeu">
  <h2>Mode combat : XXXX </h2>
  <div class="boxNotificationCombat">
    <div id="infoPlayer">
      <h2>Player</h2>
      <div id="statut">
        Status : Offline
      </div>
      <div id="name">
        Name :  XXXXX
      </div>
      <div id="level">
        Level : XXXXX
      </div>
      <h4>Notification player : </h4>
      <div id="notification">
        Que doit faire {{$pokemonPlayer->name}}?
      </div>
    </div>

    <div id="infoOpponent">
      <h2>Opponent</h2>
      <div id="statut">
        Status : Offline
      </div>
      <div id="name">
        Name :  XXXXX
      </div>
      <div id="level">
        Level : XXXXX
      </div>
      <h4>Notification opponent : </h4>
      <div id="notification">
        Que doit faire {{$pokemonOpponent->name}}?
      </div>
    </div>
  </div>
</div>  
