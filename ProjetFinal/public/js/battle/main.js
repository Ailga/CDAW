var player = {};
var opponent = {};
var tourBattle = {};
var battle = {};

let ip_address = "127.0.0.1";
let socket_port = '3000';
let socket = io(ip_address + ':' + socket_port);

function setObjPlayer(jsonPlayer){
  player.profile = {}
  player.profile.id = jsonPlayer.id;
  player.profile.name = jsonPlayer.name;
  player.profile.level = jsonPlayer.level;
  player.profile.imgProfil = jsonPlayer.profile_photo_path;
  opponent.profile = {};
  recherchePlayer();
}

function setObjPokemonPlayer(jsonPokemon){
  tourBattle.player = {};
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


function recherchePlayer(){
  console.log("Recherche d'un joueur en cours ...");
  let message = {};
  message.type = "recherchePlayer";
  message.infoPlayer = player;
  player.status = "recherchePlayer";
  socket.emit('sendDataToOpponent', message);
}


function notifyMessage(whichPlayer, message){
  console.log("Notification : " + " Pour  " + whichPlayer + ", message : " + message);
  $("#info" + whichPlayer)[0].children.notification.innerText = message;
}

function setSearchPageAfterOpponentFound(opponent){
  if(opponent.profile.imgProfil == null){
    opponent.profile.imgProfil = "/img/battle/imgPhotoProfil.jpg";
  }

  $(".imgPlayerDroite").attr('src', opponent.profile.imgProfil);
  $(".playerDroite .namePlayer").html(opponent.profile.name + "<br>Level " + opponent.profile.level);
  $(".imgSearch").css("display", "none");
  $(".imgVS").css("display", "initial");
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
  player.action = actionPlayer;
  $("#message")[0].innerText = "Cliquez sur continuer";
  $("#btnContinue").addClass("btnEnabled");
}

function actionContinue(){
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

  if(opponent.action.type == "defenseSpeciale"){
    if(player.action.type == "defenseSpeciale"){
      console.log("Chacun c'est défendu, aucun dégat reçus");
    }else{
      opponent.pokemon.hp = opponent.pokemon.hp - Math.abs(opponent.action.score - player.action.score)
    }
  }else{
    opponent.pokemon.hp = opponent.pokemon.hp - message.actionPlayer.score;
  }
  $(".opponent")[0].children[0].children[0].children.apHP.innerText = opponent.pokemon.hp;
  message.opponentHp = opponent.pokemon.hp;
  socket.emit('sendDataToOpponent', message);
}

socket.on('sendDataToPlayer', (message) => {
  if(message.type == "action"){
    opponent.action = message.action;
    player.pokemon.hp = message.opponentHp;
    $(".player")[0].children[0].children[0].children.myHP.innerText = player.pokemon.hp;
    if(player.pokemon.hp <=0){
      alert("Votre pokemon " + player.pokemon.name + " est mort !");
    }
  }else if(message.type == "infoBattle"){
    if(message.infoBattle.player.status == 'OK'){
      console.log("Opponent ready");
      opponent.status = "OK";
      opponent.action = message.infoBattle.player.action;
      $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
      $("#infoOpponent #statutCombat").css("color", "green");
      checkIfBothPlayersAreOk();
    }else{
      opponent.status = "NOK";
    }
  }else if(message.type == "recherchePlayer"){
    opponent.profile = message.infoPlayer.profile;
    console.log("Opponent " + message.infoPlayer.profile.name + " recherche quelqu'un.");
    if(player.status == "recherchePlayer"){
      console.log("Les 2 joueurs " + player.profile.name + " et " + opponent.profile.name + " sont dispos pour un combat");
      battle.player = player;
      battle.player.IDsocket = socket.id;
      battle.opponent = opponent;
      battle.score = [0, 0];      //   Format [scorePlayer, scoreOpponent]
      console.log("Info battle envoyé : " + battle);

      let messageTmp = {};
      messageTmp.type = "playerFound";
      messageTmp.content = battle;
      socket.emit('sendDataToOpponent', messageTmp);
      
      setSearchPageAfterOpponentFound(battle.opponent);

    }else{
      console.log("Opponent " + message.infoPlayer.profile.name + " prêt mais pas le player");
    }
  }else if(message.type == "playerFound"){
    // Les 2 savent qu'ils sont OK pour combattre ensemble
    battle.opponent = message.content.player;
    battle.player = player;
    battle.player.IDsocket = socket.id;
    battle.score = [0, 0];
    console.log("Les 2 players savent qu'ils peuvent combattre ensemble");
    
    setSearchPageAfterOpponentFound(battle.opponent);
  }
});

