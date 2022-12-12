var player = {};
var opponent = {};
var tourBattle = {};

let ip_address = "127.0.0.1";
let socket_port = '3000';
let socket = io(ip_address + ':' + socket_port);

function setObjPokemonPlayer(jsonPokemon){
  tourBattle.player = {};
  player.status = "NOK";
  player.pokemon = {}
  player.pokemon = jsonPokemon;
  player.pokemon.hp = player.pokemon.pv_max;
  player.pokemon.availableNormalAttack = false;
  player.pokemon.availableSpecialAttack = false;
  player.pokemon.availableSpecialDefense = false;
  tourBattle.player.pokemon = player.pokemon;
  console.log("obj pokemon player set ! pokemon : " + player.pokemon.name);
}

function setObjPokemonOpponent(jsonPokemon){
  opponent.status = "NOK";
  opponent.pokemon = {};
  opponent.pokemon = jsonPokemon;
  opponent.pokemon.hp = opponent.pokemon.pv_max;
  opponent.pokemon.availableNormalAttack = false;
  opponent.pokemon.availableSpecialAttack = false; 
  opponent.pokemon.availableSpecialDefense = false;
  console.log("obj pokemon opponent set ! pokemon : " + opponent.pokemon.name);
}

function notifyMessage(whichPlayer, message){
  console.log("Notification : " + " Pour  " + whichPlayer + ", message : " + message);
  $("#info" + whichPlayer)[0].children.notification.innerText = message;
}

function resetStateBtnAndPlayer(){
  player.status = "NOK";
  opponent.status = "NOK";

  $("#attaqueSpeciale").removeClass("btnClicked");
  $("#defenseSpeciale").removeClass("btnClicked");
  $("#attaqueNormale").removeClass("btnClicked");
  $("#attaqueSpeciale").removeClass("btnDisabled");
  $("#defenseSpeciale").removeClass("btnDisabled");
  $("#attaqueNormale").removeClass("btnDisabled");
  $("#btnContinue").removeClass("btnClicked");
  $("#btnContinue").removeClass("btnEnabled");

  if(player.pokemon.availableSpecialAttack){
    $("#attaqueSpeciale").addClass("btnDisabled");
  }
  if(player.pokemon.availableSpecialDefense){
    $("#defenseSpeciale").addClass("btnDisabled");
  }
  
  $("#message")[0].innerText = "Que doit faire " + player.pokemon.name + " ?";
  $("#infoPlayer")[0].children.statutCombat.innerText = "État : Pas prêt";
  $("#infoPlayer #statutCombat").css("color", "red");
  $("#infoOpponent")[0].children.statutCombat.innerText = "État : Pas prêt";
  $("#infoOpponent #statutCombat").css("color", "red");

}

function chooseActionPlayerTour(whichPlayer, typeAttack){
  let actionPlayer = {};
  console.log("fonction chooseActionPlayerTour appelée avec param : " + typeAttack);
  player.pokemon.actionTour = typeAttack;
  if(typeAttack == "attaqueNormale"){
    actionPlayer.score = player.pokemon.scoreNormalAttack;
    $("#attaqueSpeciale").addClass("btnDisabled");
    $("#defenseSpeciale").addClass("btnDisabled");
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "attaqueSpeciale" && ! player.pokemon.availableSpecialAttack){
    player.pokemon.availableSpecialAttack = true;
    actionPlayer.score = player.pokemon.scoreSpecialAttack;
    $("#defenseSpeciale").addClass("btnDisabled");
    $("#attaqueNormale").addClass("btnDisabled");
    //doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "defenseSpeciale" && ! player.pokemon.availableSpecialDefense){
    player.pokemon.availableSpecialDefense = true;
    actionPlayer.score = player.pokemon.scoreSpecialDefense;
    $("#attaqueSpeciale").addClass("btnDisabled");
    $("#attaqueNormale").addClass("btnDisabled");
  }
  actionPlayer.type = typeAttack;
  prepareAction(actionPlayer);
  $("#" + typeAttack).addClass("btnClicked");

}

function prepareAction(actionPlayer){
  tourBattle.player.action = actionPlayer;
  $("#message")[0].innerText = "Cliquez sur continuer";
  $("#btnContinue").addClass("btnEnabled");
}

function actionContinue(){
  console.log("btn continue clicked");
  $("#message")[0].innerText = "En attente du joueur 2 ...";
  $("#btnContinue").addClass("btnClicked");
  tourBattle.player.status = "OK";
  player.status = "OK";
  $("#infoPlayer")[0].children.statutCombat.innerText = "État : Prêt";
  $("#infoPlayer #statutCombat").css("color", "green");
  let message = {};
  message.type = "infoBattle";
  message.infoBattle = tourBattle;
  socket.emit('sendDataToOpponent', message);
  checkIfBothPlayersAreOk();
}


function checkIfBothPlayersAreOk(){
  if((player.status == "OK") && (opponent.status == "OK")){
    console.log("tous les players sont OK");
    doAttackv2(tourBattle.player.action);
    resetStateBtnAndPlayer();
  }else{
    console.log("encore un player non ok => player : " + player.status + " opponent : " + opponent.status);
  }
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
      opponent.status = "OK";
      $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
      $("#infoOpponent #statutCombat").css("color", "green");
      checkIfBothPlayersAreOk();
    }else{
      opponent.status = "NOK";
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

