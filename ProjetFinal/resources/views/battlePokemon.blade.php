<head>
  <title>Battle Pokemon</title>
  <script type = "text/javascript" src = "{{asset('js/battle/main.js')}}"></script>
  <link rel = "stylesheet" type = "text/css" href = "{{asset('css/battle/main.css')}}" />
  <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js" integrity="sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI" crossorigin="anonymous"></script>

</head>
<script>
  $(function() {
    let ip_address = "127.0.0.1";
    let socket_port = '3000';
    let socket = io(ip_address + ':' + socket_port);

    let msgInput = $('#messagePlayerServer');

    msgInput.keypress(function (e) { 
      let message = $(this).html();
      console.log(message);
      if(e.which == 13 && ! e.shiftKey) {
        socket.emit('sendDataToServer', message);
        msgInput.text('');
        return false;
      }
    });

    socket.on('sendDataToClient', (message) => {
      $('#messageBroadcast').text('');
      $('#messageBroadcast').text(`${message}`);
    });
   
  });


</script>
<h1>Info débug temp </h1>

<h5>Message server input : </h5>
<div id="messagePlayerServer" contenteditable ="">
  Aucun
</div>
<h5>Message server broadcast : </h5>
<div id="messageBroadcast">
  Aucun
</div>


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
let objPokemonPlayer = <?php echo $pokemonPlayer->toJson();?>

let objPokemonOpponent = <?php echo $pokemonOpponent->toJson();?>

let playerOnline = false;

setObjPokemonPlayer(objPokemonPlayer);
setObjPokemonOpponent(objPokemonOpponent);

if("{{$infoPlayerConnected}}" !== null){
  playerOnline = true;
}

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
      Que doit faire {{$pokemonPlayer->name}}?
    </div>
    <div class="actions">
      <button onclick = "chooseActionPlayerTour('Opponent', 'attaqueNormale')">Attaque normale</button>
      <button onclick = "chooseActionPlayerTour('Opponent', 'attaqueSpeciale')">Attaque spéciale</button>
      <button onclick = "chooseActionPlayerTour('Opponent', 'defenseSpecial')">Défense spéciale</button>
    </div>
    <div class = "continue">
      <button onclick = "enDev()">Continue</button>
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
      <div id="name">
        Name :  {{$infoPlayerConnected->name}}
      </div>
      <div id="level">
        Level : {{$infoPlayerConnected->level}}
      </div>
      <h4>Notification player : </h4>
      <div id="notification">
        Que doit faire {{$pokemonPlayer->name}}?
      </div>
    </div>

    <div id="infoOpponent">
      <h2>Opponent</h2>
      <div id="statutOpponent">
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
