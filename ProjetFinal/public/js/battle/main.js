var player = {};
var opponent = {};
var tourBattle = {};

let ip_address = "127.0.0.1";
let socket_port = '3000';
let socket = io(ip_address + ':' + socket_port);

function setObjPokemonPlayer(jsonPokemon){
  tourBattle.player = {};
  player.pokemon = {}
  player.pokemon.availableNormalAttack, player.pokemon.availableSpecialAttack, player.pokemon.availableSpecialDefense = true;
  player.pokemon = jsonPokemon;
  player.pokemon.hp = player.pokemon.pv_max;
  player.pokemon.availableNormalAttack = true;
  player.pokemon.availableSpecialAttack = true;
  player.pokemon.availableSpecialDefense = true;
  tourBattle.player.pokemon = player.pokemon;
  console.log("obj pokemon player set ! pokemon : " + player.pokemon.name);
}

function setObjPokemonOpponent(jsonPokemon){
  opponent.pokemon = {};
  opponent.pokemon = jsonPokemon;
  opponent.pokemon.hp = opponent.pokemon.pv_max;
  opponent.pokemon.availableNormalAttack = true;
  opponent.pokemon.availableSpecialAttack = true; 
  opponent.pokemon.availableSpecialDefense = true;
  console.log("obj pokemon opponent set ! pokemon : " + opponent.pokemon.name);
}

function notifyMessage(whichPlayer, message){
  console.log("Notification : " + " Pour  " + whichPlayer + ", message : " + message);
  $("#info" + whichPlayer)[0].children.notification.innerText = message;
}


function chooseActionPlayerTour(whichPlayer, typeAttack){
  let actionPlayer = {};
  console.log("fonction chooseActionPlayerTour appelée avec param : " + typeAttack);
  player.pokemon.actionTour = typeAttack;
  if(typeAttack == "attaqueNormale" && player.pokemon.availableNormalAttack){
    player.pokemon.availableNormalAttack = true;
    player.pokemon.availableSpecialDefense = false;
    actionPlayer.score = player.pokemon.scoreNormalAttack;
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "attaqueSpeciale" && player.pokemon.availableSpecialAttack){
    player.pokemon.availableSpecialAttack = true;
    player.pokemon.availableSpecialDefense = false;
    actionPlayer.score = player.pokemon.scoreSpecialAttack;
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "defenseSpeciale" && player.pokemon.availableSpecialDefense){
    player.pokemon.availableSpecialDefense = true;
    actionPlayer.score = player.pokemon.scoreSpecialDefense;
  }
  actionPlayer.type = typeAttack;
  prepareAction(actionPlayer);

}

function actionContinue(){
  console.log("btn continue clicked");
  tourBattle.player.status = "OK";
  $("#infoPlayer")[0].children.statutCombat.innerText = "État : Prêt";
  $("#infoPlayer #statutCombat").css("color", "green");
  let message = {};
  message.type = "infoBattle";
  message.infoBattle = tourBattle;
  socket.emit('sendDataToOpponent', message);
}

function prepareAction(actionPlayer){
  tourBattle.player.action = actionPlayer;
  $("#message")[0].innerText = "Cliquez sur continuer";
  $("#btnContinue").addClass("btnEnabled");
  $("#attaqueNormale").addClass("btnClicked");
  $("#attaqueSpeciale").addClass("btnDisabled");
  $("#defenseSpeciale").addClass("btnDisabled");
}

function doAttackv2(actionPlayer){
  let message = {};
  message.type = "action";
  message.actionPlayer = actionPlayer;
  opponent.pokemon.hp = opponent.pokemon.hp - message.actionPlayer.score;
  $(".opponent")[0].children[0].children[0].children.apHP.innerText = opponent.pokemon.hp;
  socket.emit('sendDataToOpponent', message);
}

socket.on('sendDataToPlayer', (message) => {
  if(message.type == "action"){
    player.pokemon.hp =player.pokemon.hp - message.actionPlayer.score;
    $(".player")[0].children[0].children[0].children.myHP.innerText = player.pokemon.hp;
    if(player.pokemon.hp <=0){
      alert("Votre pokemon " + player.pokemon.name + " est mort !");
    }
  }else if(message.type == "infoBattle"){
    console.log("info battle = " + message.infoBattle);
    if(message.infoBattle.player.status == 'OK'){
      console.log("Opponent ready");
      opponent.pokemon.status = "OK";
      $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
      $("#infoOpponent #statutCombat").css("color", "green");
    }
  }
});







function doAttack(whichPlayer, typeAttack){
  let stillAlive = true;
  if(typeAttack == "attaqueNormale"){
    if(player.pokemon.availableNormalAttack){
      // Attaque normale possible
      notifyMessage(whichPlayer, "Pokemon " + player.pokemon.name + " fait sont attaque normale ! Dégats : " + player.pokemon.scoreNormalAttack);
      stillAlive = isAliveAfterAttack(whichPlayer, opponent.pokemon, player.pokemon.scoreNormalAttack);
    }else{
      // TODO Pas d'attaque normale possible
    }    
  }else if(typeAttack == "attaqueSpeciale"){
    if(player.pokemon.availableSpecialAttack){
      // Attaque spéciale possible
      notifyMessage(whichPlayer, "Pokemon " + player.pokemon.name +" fait sont attaque spéciale ! Dégats : " + player.pokemon.scoreSpecialAttack);
      stillAlive = isAliveAfterAttack(whichPlayer, opponent.pokemon, player.pokemon.scoreSpecialAttack);
      player.pokemon.availableSpecialAttack = false;
    }else{
      // TODO Pas d'attaque normale possible
      alert("impossible de faire l'attaque spéciale");
    } 
  }
}


function doDefense(whichPlayer, pokemon, degatAttaque){
  if(pokemon.availableSpecialDefense){
    // Défense possible
    let degatDefense = pokemon.scoreSpecialDefense - degatAttaque;
    let newPokemonHp = pokemon.hp - degatDefense;
    notifyMessage(whichPlayer, "Pokemon fait sa défense spéciale ! Dégats reçu : " + degatDefense);
    pokemon.availableSpecialDefense = false;
    pokemon.hp = newPokemonHp;
  }else{
  // Pas de défense possible
  notifyMessage(whichPlayer, "Pokemon "+ pokemon.name + " ne peut pas se défendre, hp = " + pokemon.hp + " et dégat attaque = " + degatAttaque);
  pokemon.hp = pokemon.hp - degatAttaque;
  }
}



function isAliveAfterAttack(whichPlayer, pokemon, scoreDegat){
  doDefense("Opponent", pokemon, scoreDegat);
  if(whichPlayer == "Player"){
    $(".player")[0].children[0].children[0].children.myHP.innerText = pokemon.hp;
  }else{
    $(".opponent")[0].children[0].children[0].children.apHP.innerText = pokemon.hp;
  }
  if(pokemon.hp <=0){
    alert("Pokemon " + pokemon.name + " mort");
    notifyMessage(whichPlayer, "Pokemon " + pokemon.name + " mort");
    return false;
  }else{
    notifyMessage(whichPlayer, "Pokemon " + pokemon.name + " attaqué !");
    return true;
  }
}

