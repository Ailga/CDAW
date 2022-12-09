var playerPokemon = {}
var opponentPokemon = {};
playerPokemon.availableNormalAttack, playerPokemon.availableSpecialAttack, playerPokemon.availableSpecialDefense = true;


function setObjPokemonPlayer(jsonPokemon){
  playerPokemon = jsonPokemon;
  playerPokemon.hp = playerPokemon.pv_max;
  console.log("obj pokemon player set ! pokemon : " + playerPokemon.name);
}

function setObjPokemonOpponent(jsonPokemon){
  opponentPokemon = jsonPokemon;
  opponentPokemon.hp = opponentPokemon.pv_max;
  
  console.log("obj pokemon opponent set ! pokemon : " + opponentPokemon.name);
}

function notifyMessage(whichPlayer, message){
  console.log("Notification : " + " Pour  " + whichPlayer + ", message : " + message);
  $("#info" + whichPlayer)[0].children.notification.innerText = message;
}


function chooseActionPlayerTour(whichPlayer, typeAttack){
  console.log("fonction chooseActionPlayerTour appelée avec param : " + typeAttack);
  playerPokemon.actionTour = typeAttack;
  if(typeAttack == "attaqueNormale" && ! playerPokemon.availableNormalAttack){
    playerPokemon.availableNormalAttack = true;
    playerPokemon.availableSpecialDefense = false;
    doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "attaqueSpeciale" && ! playerPokemon.availableSpecialAttack){
    playerPokemon.availableSpecialAttack = true;
    playerPokemon.availableSpecialDefense = false;
    doAttack(whichPlayer, typeAttack);
  }else if(typeAttack == "defenseSpecial" && ! playerPokemon.availableSpecialDefense){
    playerPokemon.availableSpecialDefense = true;
  }
}

function enDev(){
  alert("Fonctionnalités en dev, non opérationnelle de suite");
}


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
  alert("Pokemon "+ pokemon.name + " ne peut plus se défendre");
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

