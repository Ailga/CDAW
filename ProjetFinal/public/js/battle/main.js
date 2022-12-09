var playerPokemon = {}
var opponentPokemon = {};


function setObjPokemonPlayer(jsonPokemon){
  playerPokemon = jsonPokemon;
  playerPokemon.hp = playerPokemon.pv_max;
  playerPokemon.availableNormalAttack, playerPokemon.availableSpecialAttack, playerPokemon.availableSpecialDefense = true;
  console.log("obj pokemon player set ! pokemon : " + playerPokemon.name);
}

function setObjPokemonOpponent(jsonPokemon){
  opponentPokemon = jsonPokemon;
  opponentPokemon.hp = opponentPokemon.pv_max;
  playerPokemon.availableNormalAttack, playerPokemon.availableSpecialAttack, playerPokemon.availableSpecialDefense = true;
  console.log("obj pokemon opponent set ! pokemon : " + opponentPokemon.name);
}

var userHP = 100;
var opHP = 100;

function notifyMessage(whichPlayer, message){
  $("#info" + whichPlayer).children.notification.innerText = message;
}



function doAttack(whichPlayer, pokemonPlayer, pokemonOpponent, typeAttack){
  let newPokemonOpponenthp = 0;
  let stillAlive = true;
  if(typeAttack == "attaqueNormale"){
    if(pokemonPlayer.availableNormalAttack){
      // Attaque normale possible
      notifyMessage(whichPlayer, "Pokemon fait sont attaque normale ! Dégats : " + pokemon.scoreNormalAttack);
      newPokemonOpponenthp = pokemonOpponent.hp - pokemon.scoreNormalAttack;
      stillAlive = isAliveAfterSetPvPokemon(whichPlayer, pokemonOpponent, newPokemonOpponenthp);
    }else{
      // TODO Pas d'attaque normale possible
    }    

  }else if(typeAttack == "attaqueSpeciale"){
    if(pokemonPlayer.availableSpecialAttack){
      // Attaque spéciale possible
      notifyMessage(whichPlayer, "Pokemon fait sont attaque spéciale ! Dégats : " + pokemon.scoreSpecialAttack);
      newPokemonOpponenthp = pokemonOpponent.hp - pokemon.scoreSpecialAttack;
      stillAlive = isAliveAfterSetPvPokemon(whichPlayer, pokemonOpponent, newPokemonOpponenthp);
    }else{
      // TODO Pas d'attaque normale possible
    } 
    
  }
}


function doDefense(whichPlayer, pokemon, degatAttaque){
  if(pokemon.availableSpecialDefense){
    // Défense possible
    let degatDefense = pokemon.scoreSpecialDefense - degatAttaque;
    let newPokemonPlayerhp = pokemon.hp - degatDefense;
    let stillAlive = true;
    notifyMessage(whichPlayer, "Pokemon fait sa défense spéciale ! Dégats reçu : " + degatDefense);
    stillAlive = isAliveAfterSetPvPokemon(whichPlayer, pokemon, newPokemonPlayerhp);
    pokemon.availableSpecialDefense = false
  }else{
  // TODO Pas de défense possible
  }
  
  
}



function isAliveAfterSetPvPokemon(whichPlayer, pokemon, newHp){
  pokemon.hp = newHp;
  if(whichPlayer == "Player"){
    $(".player").children[0].children[0].children.myHP.innerText = pokemon.hp;
  }else{
    $(".opponent").children[0].children[0].children.apHP.innerText = pokemon.hp;
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










opAttacks = [flameThrower, dragonClaw, ember, growl];
playerMove = 0;
/* users moves */
function waterCannon() {
  if(playerMove == 0 && userHP != 0) {
    var miss = Math.floor((Math.random() * 10) + 1); // miss rate
    if(miss == 1) {
      document.getElementById('message').innerHTML = " Blastoise's attack missed! ";
    }
    else {
      document.getElementById('message').innerHTML = " Blastoise used water cannon "; // attack
      var critical = Math.floor((Math.random() * 10) + 1); // critical
      if(critical == 4){
        for(var x = 0; x < 2; x++){
          opHP = opHP - 30; // yes critical
        }
      }
      else{
        opHP = opHP - 30; // no critical
      }
      if(opHP < 0){ opHP = 0} //faint
        document.getElementById('apHP').innerHTML = opHP; // update hp
      if(opHP == 0){
        document.getElementById('message').innerHTML = " Charizard fainted! " // update message
      }
    }
    //wait();
    playerMove = 1; // update player move
}
}

function waterPulse() {
  if(playerMove == 0 && userHP != 0) {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Blastoise's attack missed! "
  }
  else {
    document.getElementById('message').innerHTML = " Blastoise used water pulse ";
    var critical = Math.floor((Math.random() * 10) + 1);
      if(critical == 4){
        for(var x = 0; x < 2; x++){
          opHP = opHP - 20;
        }
      }
      else{
        opHP = opHP - 20;
      }
    if(opHP < 0 ) { opHP = 0}
    document.getElementById('apHP').innerHTML = opHP;
    //document.getElementById('message').innerHTML = " Charizard2 "
    if(opHP == 0){
      document.getElementById('message').innerHTML = " Charizard fainted! "
    }
  }
  //wait();
  playerMove = 1;
}
}

function surf() {
  if(playerMove == 0 && userHP != 0) {
  //alert("Water Cannon!");
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Blastoise's attack missed! "
  }
  else {
    document.getElementById('message').innerHTML = " Blastoise used surf ";
    var critical = Math.floor((Math.random() * 10) + 1);
      if(critical == 4){
        for(var x = 0; x < 2; x++){
          opHP = opHP - 10;
        }
      }
      else{
        opHP = opHP - 10;
      }
    if(opHP < 0 ) { opHP = 0}
    document.getElementById('apHP').innerHTML = opHP;
    if(opHP == 0){
      document.getElementById('message').innerHTML = " Charizard fainted! "
    }
  }
  //wait();
  playerMove = 1;
}
}


/* opponent's moves */

function flameThrower() {
  var miss = Math.floor((Math.random() * 10) + 1); // miss rate
  if(miss == 1 ) {
  document.getElementById('message').innerHTML = " Charizard's attack missed! " // attack missed
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used flame thrower " // attack
    var critical = Math.floor((Math.random() * 10) + 1); // critical
      if(critical == 4){
        for(var x = 0; x < 2; x++){ // yes critical
          userHP = userHP - 30;
        }
      }
      else{
        userHP = userHP - 30; // no critical
      }
  if(userHP < 0) { userHP = 0} // faint
  document.getElementById('myHP').innerHTML = userHP; // update hp
    if(userHP == 0) { // fainted
      document.getElementById('message').innerHTML = " Blastoise fainted! " // fainted
    }
  }
}

function dragonClaw() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used dragon claw "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 20;
      }
    }
    else{
      userHP = userHP - 20;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}

function ember() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used ember "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 10;
      }
    }
    else{
      userHP = userHP - 10;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}

function growl() {
  var miss = Math.floor((Math.random() * 10) + 1);
  if(miss == 1 ) {
    document.getElementById('message').innerHTML = " Charizard's attack missed! "
  }
  else {
  document.getElementById('message').innerHTML = " Charizard used growl "
  var critical = Math.floor((Math.random() * 10) + 1);
    if(critical == 4){
      for(var x = 0; x < 2; x++){
        userHP = userHP - 5;
      }
    }
    else{
      userHP = userHP - 5;
    }
  if(userHP < 0) { userHP = 0}
  document.getElementById('myHP').innerHTML = userHP;
    if(userHP == 0){
      document.getElementById('message').innerHTML = " Blastoise fainted! "
    }
  }
}



function compPokemon() { // continue
  if(playerMove == 1 && opHP != 0) { // whos move
  var move = Math.floor((Math.random() * 4) + 1); // choose move randomly
    opAttacks[move](); // call attack from array
    playerMove = 0; // update player move
  }
}