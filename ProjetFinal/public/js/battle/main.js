var playerPokemon = {}
var opponentPokemon = {};
var tourBattle = {};
playerPokemon.availableNormalAttack, playerPokemon.availableSpecialAttack, playerPokemon.availableSpecialDefense = true;
let ip_address = "127.0.0.1";
let socket_port = '3000';
let socket = io(ip_address + ':' + socket_port);

function setObjPokemonPlayer(jsonPokemon){
  tourBattle.player = {};
  playerPokemon = jsonPokemon;
  playerPokemon.hp = playerPokemon.pv_max;
  playerPokemon.availableNormalAttack = true;
  playerPokemon.availableSpecialAttack = true;
  playerPokemon.availableSpecialDefense = true;
  tourBattle.player.pokemon = playerPokemon;
  console.log("obj pokemon player set ! pokemon : " + playerPokemon.name);
}

function setObjPokemonOpponent(jsonPokemon){
  opponentPokemon = jsonPokemon;
  opponentPokemon.hp = opponentPokemon.pv_max;
  opponentPokemon.availableNormalAttack = true;
  opponentPokemon.availableSpecialAttack = true; 
  opponentPokemon.availableSpecialDefense = true;
  console.log("obj pokemon opponent set ! pokemon : " + opponentPokemon.name);
}

function notifyMessage(whichPlayer, message){
  console.log("Notification : " + " Pour  " + whichPlayer + ", message : " + message);
  $("#info" + whichPlayer)[0].children.notification.innerText = message;
}


function chooseActionPlayerTour(whichPlayer, typeAttack){
  let actionPlayer = {};
  console.log("fonction chooseActionPlayerTour appelée avec param : " + typeAttack);
  playerPokemon.actionTour = typeAttack;
  if(typeAttack == "attaqueNormale" && playerPokemon.availableNormalAttack){
    playerPokemon.availableNormalAttack = true;
    playerPokemon.availableSpecialDefense = false;
    actionPlayer.score = playerPokemon.scoreNormalAttack;
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "attaqueSpeciale" && playerPokemon.availableSpecialAttack){
    playerPokemon.availableSpecialAttack = true;
    playerPokemon.availableSpecialDefense = false;
    actionPlayer.score = playerPokemon.scoreSpecialAttack;
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "defenseSpeciale" && playerPokemon.availableSpecialDefense){
    playerPokemon.availableSpecialDefense = true;
    actionPlayer.score = playerPokemon.scoreSpecialDefense;
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
  opponentPokemon.hp = opponentPokemon.hp - message.actionPlayer.score;
  $(".opponent")[0].children[0].children[0].children.apHP.innerText = opponentPokemon.hp;
  socket.emit('sendDataToOpponent', message);
}

socket.on('sendDataToPlayer', (message) => {
  if(message.type == "action"){
    playerPokemon.hp =playerPokemon.hp - message.actionPlayer.score;
    $(".player")[0].children[0].children[0].children.myHP.innerText = playerPokemon.hp;
    if(playerPokemon.hp <=0){
      alert("Votre pokemon " + playerPokemon.name + " est mort !");
    }
  }else if(message.type == "infoBattle"){
    console.log("info battle = " + message.infoBattle);
    if(message.infoBattle.player.status == 'OK'){
      console.log("Opponent ready");
      opponentPokemon.status = "OK";
      $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
      $("#infoOpponent #statutCombat").css("color", "green");
    }
  }
});







function doAttack(whichPlayer, typeAttack){
  let stillAlive = true;
  if(typeAttack == "attaqueNormale"){
    if(playerPokemon.availableNormalAttack){
      // Attaque normale possible
      notifyMessage(whichPlayer, "Pokemon " + playerPokemon.name + " fait sont attaque normale ! Dégats : " + playerPokemon.scoreNormalAttack);
      stillAlive = isAliveAfterAttack(whichPlayer, opponentPokemon, playerPokemon.scoreNormalAttack);
    }else{
      // TODO Pas d'attaque normale possible
    }    
  }else if(typeAttack == "attaqueSpeciale"){
    if(playerPokemon.availableSpecialAttack){
      // Attaque spéciale possible
      notifyMessage(whichPlayer, "Pokemon " + playerPokemon.name +" fait sont attaque spéciale ! Dégats : " + playerPokemon.scoreSpecialAttack);
      stillAlive = isAliveAfterAttack(whichPlayer, opponentPokemon, playerPokemon.scoreSpecialAttack);
      playerPokemon.availableSpecialAttack = false;
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

