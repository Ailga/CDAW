var player = new Player();
var opponent = new Player();
var battle = new Battle(player, opponent);
var socketPlayer = new Socket();
var msgSocket = new MessageToEmit();
var debugMsg = new DebugMsg();


function setObjPlayer(jsonPlayer)
{
    player.setProfilFromJson(jsonPlayer);
}

function setObjListePokemonPlayer(jsonListePokemon)
{
    player.setListePokemonFromJson(jsonListePokemon);
    debugMsg = new DebugMsg(1, "DEBUG", "Liste pokemon set : " + JSON.stringify(jsonListePokemon), "console");
    recherchePlayer();
}

function recherchePlayer()
{
    player.setStatus("recherchePlayer");
    debugMsg = new DebugMsg(2, "DEBUG", "Recherche d'un joueur en cours...", "console");
    msgSocket = new MessageToEmit("all", "sendDataToOpponent", "recherchePlayer", player, socketPlayer);
    msgSocket.emit();
}

function setSearchPageAfterOpponentFound()
{
    if(opponent.profile.imgProfil == null)
    {
        opponent.profile.imgProfil = "/img/battle/imgPhotoProfil.jpg";
    }
    $(".imgPlayerDroite").attr('src', opponent.profile.imgProfil);
    $(".playerDroite .namePlayer").html(opponent.profile.name + "<br>Level " + opponent.profile.level);
    $(".imgSearch").css("display", "none");
    $(".imgVS").css("display", "initial");

    $(".messageLancementCombat").css("display", "initial");
    var secRestante = 5;

    function showMsgLaunchBattle()
    {
        $(".messageLancementCombat").text("Lancement dans " + secRestante);
        fadeOutLaunchMsg();
        window.setTimeout(fadeInLaunchMsg, 500);
        if(secRestante == 0)
        {
            window.clearInterval(timerBeforeLaunch);
            debugMsg = new DebugMsg(3, "DEBUG", "Lancement de la battle", "console");
            $(".messageLancementCombat").text("Lancement en cours...");
            launchBattleScreen();
        }
        secRestante --;
    }

    function fadeInLaunchMsg()
    {
        $(".messageLancementCombat").css("opacity", "1");
    }

    function fadeOutLaunchMsg()
    {
        $(".messageLancementCombat").css("opacity", "0");
    }

    let timerBeforeLaunch = window.setInterval(showMsgLaunchBattle, 1000);    
}

function launchBattleScreen()
{
    $(".ecranRecherchePlayers").css("display", "none");
    let pokemonOpponent = battle.opponent.listePokemons.data[opponent.listePokemons.index]
    $(".opponent")[0].children[0].children[0].children.apHP.innerText = pokemonOpponent.hp;
    $(".opponent")[0].children[0].children.pokemonOpponentName.innerText = pokemonOpponent.name;
    $(".opponent")[0].children[0].children.pokemonOpponentLevel.innerText = " " + pokemonOpponent.level;
    $("#infoOpponent")[0].children.statutOpponent.innerText = "Status : Online ✅"
    $("#infoOpponent #statutOpponent").css("color", "green");
    $("#infoOpponent")[0].children.name.innerText = "Name : " + battle.opponent.profile.name;
    $("#infoOpponent")[0].children.level.innerText = "Level : " + battle.opponent.profile.level;
    $("#pokemonOpponentImg").attr('src', pokemonOpponent.pathImg);
    $(".ecranGaucheJeu").css("display", "inline");
    $(".ecranDroiteJeu").css("display", "inline");
}

function resetStateBtnAndPlayer()
{
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

    if(player.listePokemons.data[player.listePokemons.index].availableSpecialAttack){
        $("#attaqueSpeciale").addClass("btnDisabled");
    }
    if(player.listePokemons.data[player.listePokemons.index].availableSpecialDefense){
        $("#defenseSpeciale").addClass("btnDisabled");
    }

    $("#message")[0].innerText = "Que doit faire " + player.listePokemons.data[player.listePokemons.index].name + " ?";
    $("#infoPlayer")[0].children.statutCombat.innerText = "État : Pas prêt";
    $("#infoPlayer #statutCombat").css("color", "red");
    $("#infoOpponent")[0].children.statutCombat.innerText = "État : Pas prêt";
    $("#infoOpponent #statutCombat").css("color", "red");
}

function chooseActionPlayerTour(typeAttack)
{
    debugMsg = new DebugMsg(1, "DEBUG", "Action choisie = " + typeAttack);
    let tmpScoreAttack = 0;
    let playerPokemon = player.listePokemons.data[player.listePokemons.index];
    if(typeAttack == "attaqueNormale")
    {
        tmpScoreAttack = playerPokemon.scoreNormalAttack;
        $("#attaqueSpeciale").addClass("btnDisabled");
        $("#defenseSpeciale").addClass("btnDisabled");
        //doAttack(whichPlayer, typeAttack);
    }
    else if(typeAttack == "attaqueSpeciale" && ! playerPokemon.availableSpecialAttack)
    {
        playerPokemon.availableSpecialAttack = true;
        tmpScoreAttack = playerPokemon.scoreSpecialAttack;
        $("#defenseSpeciale").addClass("btnDisabled");
        $("#attaqueNormale").addClass("btnDisabled");
        //doAttack(whichPlayer, typeAttack);
    }
    else if(typeAttack == "defenseSpeciale" && ! playerPokemon.availableSpecialDefense)
    {
        playerPokemon.availableSpecialDefense = true;
        tmpScoreAttack = playerPokemon.scoreSpecialDefense;
        $("#attaqueSpeciale").addClass("btnDisabled");
        $("#attaqueNormale").addClass("btnDisabled");
    }
    battle.tour[battle.indexTour].player.action.type = typeAttack;
    battle.tour[battle.indexTour].player.action.score = tmpScoreAttack;
    prepareAction();
    $("#" + typeAttack).addClass("btnClicked");
}

function prepareAction()
{
    $("#message")[0].innerText = "Cliquez sur continuer";
    $("#btnContinue").addClass("btnEnabled");
}

function actionContinue()
{
    $("#message")[0].innerText = "En attente du joueur 2 ...";
    $("#btnContinue").addClass("btnClicked");
    battle.tour[battle.indexTour].player.status = "OK";
    battle.tour[battle.indexTour].player.pokemon = player.listePokemons.data[player.listePokemons.index];
    battle.tour[battle.indexTour].opponent.pokemon = opponent.listePokemons.data[opponent.listePokemons.index];
    player.status = "OK";
    $("#infoPlayer")[0].children.statutCombat.innerText = "État : Prêt";
    $("#infoPlayer #statutCombat").css("color", "green");
    msgSocket = new MessageToEmit("all", "sendDataToOpponent", "infoBattle", battle.tour[battle.indexTour], socketPlayer);
    msgSocket.emit();
    checkIfBothPlayersAreOk();
}

function checkIfBothPlayersAreOk()
{
    if((player.status == "OK") && (opponent.status == "OK")){
        debugMsg = new DebugMsg(3, "DEBUG", "Tous les joueurs sont OK", "console");
        doAttackv2();
        resetStateBtnAndPlayer();
    }else{
        debugMsg = new DebugMsg(2, "DEBUG", "Encore un joueur non OK => player : " + player.status + " et opponent : " + opponent.status, "console");
    }
}

function doAttackv2()
{
    if(battle.tour[battle.indexTour].opponent.action.type == "defenseSpeciale")
    {
        if(battle.tour[battle.indexTour].player.action.type == "defenseSpeciale")
        {
            debugMsg = new DebugMsg(2, "DEBUG", "Chacun a choisi la défense, aucun dégat reçus", "console");
        }
        else
        {
            battle.tour[battle.indexTour].opponent.pokemon.hp = battle.tour[battle.indexTour].opponent.pokemon.hp - Math.abs(battle.tour[battle.indexTour].opponent.action.score - battle.tour[battle.indexTour].player.action.score);
        }
    }
    else
    {
        if(battle.tour[battle.indexTour].player.action.type != "defenseSpeciale")
        {
            battle.tour[battle.indexTour].opponent.pokemon.hp = battle.tour[battle.indexTour].opponent.pokemon.hp - battle.tour[battle.indexTour].player.action.score;
        }
    }
    $(".opponent")[0].children[0].children[0].children.apHP.innerText = battle.tour[battle.indexTour].opponent.pokemon.hp;
    battle.tour[battle.indexTour].player.action.opponentHP = battle.tour[battle.indexTour].opponent.pokemon.hp;
    msgSocket = new MessageToEmit("all", 'sendDataToOpponent', "action", battle.tour[battle.indexTour].player.action, socketPlayer);
    msgSocket.emit();
    //debugMsg = new DebugMsg(1, "DEBUG", "Info battle du tour n°" + battle.indexTour + " = " + JSON.stringify(battle.tour[battle.indexTour]), "console");
    battle.tour[battle.indexTour + 1] = {};
    battle.tour[battle.indexTour + 1] = battle.tour[battle.indexTour];
    battle.indexTour ++;
}

function pokemonPlayerDied()
{
    let actualPokemonName = player.listePokemons.data[player.listePokemons.index].name;
    player.listePokemons.index ++;
    let newPokemon = player.listePokemons.data[player.listePokemons.index];
    debugMsg = new DebugMsg(3, "DEBUG", "Votre pokemon " + actualPokemonName + " est mort !\n\nNouveau pokémon = " + newPokemon.name, "alerte");
    $(".player")[0].children[0].children.name.innerText = newPokemon.name;
    $(".player")[0].children[0].children.level.innerText = newPokemon.level;
    $(".player")[0].children[0].children[0].children.myHP.innerText = newPokemon.hp;
    $("#pokemonPlayerImg").attr('src', newPokemon.pathImg);
    $("#message")[0].innerText = "Que doit faire " + player.listePokemons.data[player.listePokemons.index].name + " ?";
    msgSocket = new MessageToEmit("all", 'sendDataToOpponent', "pokemonDied", newPokemon, socketPlayer);
    msgSocket.emit();
}

function checkIfAllPokemonDied()
{
    if(opponent.listePokemons.index > 2)
    {
        debugMsg = new DebugMsg(3, "DEBUG", "Opponent a perdu, tous ses pokémons sont morts", "alerte");
    }
    if(player.listePokemons.index > 2)
    {
        debugMsg = new DebugMsg(3, "DEBUG", "Vous avez perdu, tous vos pokémons sont morts", "alerte");
    }
}
socketPlayer.socket.on('sendDataToPlayer', (message) => {
    if(message.type == "pokemonDied")
    {
        let newPokemon = message.data;
        $(".opponent")[0].children[0].children[0].children.apHP.innerText = newPokemon.hp;
        $(".opponent")[0].children[0].children.pokemonOpponentName.innerText = newPokemon.name;
        $(".opponent")[0].children[0].children.pokemonOpponentLevel.innerText = " " + newPokemon.level;
        $("#pokemonOpponentImg").attr('src', newPokemon.pathImg);
        opponent.listePokemons.index ++;
        checkIfAllPokemonDied();
    }
    else if(message.type == "action")
    {
        battle.tour[battle.indexTour].opponent.action = message.data;
        player.listePokemons.data[player.listePokemons.index].hp = message.data.opponentHP;
        $(".player")[0].children[0].children[0].children.myHP.innerText = message.data.opponentHP;
        if(message.data.opponentHP <=0)
        {
            checkIfAllPokemonDied();
            pokemonPlayerDied();
        }
    }
    else if(message.type == "infoBattle")
    {
        let dataReceived = message.data;
        if(dataReceived.player.status == "OK")
        {
            opponent.status = "OK";
            battle.tour[battle.indexTour].opponent.action = dataReceived.player.action;
            $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
            $("#infoOpponent #statutCombat").css("color", "green");
            checkIfBothPlayersAreOk();
        }
        else
        {
            opponent.status = "NOK";
        }
    }
    else if(message.type == "recherchePlayer")
    {
        debugMsg = new DebugMsg(3, "DEBUG", "Opponent " + message.data.profile.name + " recherche quelqu'un", "console");
        if(player.status == "recherchePlayer")
        {
            opponent = message.data;
            player.status = "NOK";
            opponent.status = "NOK";
            debugMsg = new DebugMsg(2, "DEBUG", "Les 2 joueurs " + player.profile.name + " et " + opponent.profile.name + " peuvent combattre ensemble", "console");
            battle = new Battle(player, opponent);
            battle.tour[battle.indexTour].opponent.status = "NOK";
            battle.tour[battle.indexTour].opponent.pokemon = opponent.listePokemons.data[opponent.listePokemons.index];
            msgSocket = new MessageToEmit("all", "sendDataToOpponent", "playerFound", battle, socketPlayer);
            msgSocket.emit();
            setSearchPageAfterOpponentFound()
        }
        else
        {
            debugMsg = new DebugMsg(1, "DEBUG", "Opponent " + message.data.profile.name + " en recherche mais pas le player");
        }
    }
    else if(message.type == "playerFound")
    {
        player.status = "NOK";

        // Les 2 savent qu'ils sont OK pour combattre ensemble
        opponent = message.data.player;
        battle = new Battle(player, opponent);
        battle.tour[battle.indexTour].opponent.status = "NOK";
        battle.tour[battle.indexTour].opponent.pokemon = opponent.listePokemons.data[opponent.listePokemons.index];
        debugMsg = new DebugMsg(3, "DEBUG", "Les 2 joueurs " + player.profile.name + " et " + opponent.profile.name + " savent qu'ils peuvent combattre ensemble", "console");
        setSearchPageAfterOpponentFound();
    }
})