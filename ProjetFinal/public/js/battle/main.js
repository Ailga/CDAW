var player = new Player();
var opponent = new Player();
var battle = new Battle(player, opponent);
var socketPlayer = new Socket();
var msgSocket = new MessageToEmit();
var debugMsg = new DebugMsg();
var energyIfWin = new Energy();


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

function setObjEnergy(jsonEnergy)
{
    energyIfWin.setDataFromJson(jsonEnergy);
    player.energyIfWin = energyIfWin;
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
    $(".playerDroite .namePlayer").html(opponent.profile.name + "<br>Niveau " + opponent.profile.level);
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
    $("#infoOpponent")[0].children.statutOpponent.innerText = "Status : Online ???"
    $("#infoOpponent #statutOpponent").css("color", "green");
    $("#infoOpponent")[0].children.name.innerText = "Pseudo : " + battle.opponent.profile.name;
    $("#infoOpponent")[0].children.level.innerText = "Niveau : " + battle.opponent.profile.level;
    $("#pokemonOpponentImg").attr('src', pokemonOpponent.pathImg);
    $(".ecranGaucheJeu").css("display", "inline");
    $(".ecranDroiteJeu").css("display", "inline");

    //On start les chronos
    battle.chrono.textElementID = "TotalTime";
    battle.tour[battle.indexTour].player.chrono.textElementID = "TourTime";
    battle.chrono.startChronometer();
    battle.tour[battle.indexTour].chrono.startChronometer();
    battle.tour[battle.indexTour].player.chrono.startChronometer();
}

function resetStateBtnAndPlayer()
{
    battle.tour[battle.indexTour].chrono.startChronometer();
    battle.tour[battle.indexTour].player.chrono.startChronometer();
    
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
    $("#infoPlayer")[0].children.statutCombat.innerText = "??tat : Pas pr??t";
    $("#infoPlayer #statutCombat").css("color", "red");
    $("#infoOpponent")[0].children.statutCombat.innerText = "??tat : Pas pr??t";
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
    battle.tour[battle.indexTour].player.chrono.stopChronometer();
    $("#message")[0].innerText = "En attente du joueur 2 ...";
    $("#btnContinue").addClass("btnClicked");
    battle.tour[battle.indexTour].player.status = "OK";
    battle.tour[battle.indexTour].player.pokemon = player.listePokemons.data[player.listePokemons.index];
    battle.tour[battle.indexTour].opponent.pokemon = opponent.listePokemons.data[opponent.listePokemons.index];
    player.status = "OK";
    $("#infoPlayer")[0].children.statutCombat.innerText = "??tat : Pr??t";
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
            debugMsg = new DebugMsg(2, "DEBUG", "Chacun a choisi la d??fense, aucun d??gat re??us", "console");
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
    
    battle.tour[battle.indexTour].chrono.stopChronometer();
    battle.tour[battle.indexTour + 1] = {};
    battle.tour[battle.indexTour + 1] = battle.tour[battle.indexTour];
    battle.indexTour ++;
}

function pokemonPlayerDied()
{
    let actualPokemonName = player.listePokemons.data[player.listePokemons.index].name;
    $("#playerBall" + player.listePokemons.index).remove();
    player.listePokemons.index ++;
    let isPokemonDied = checkIfAllPokemonDied();
    if(! isPokemonDied)
    {
        let newPokemon = player.listePokemons.data[player.listePokemons.index];
        debugMsg = new DebugMsg(3, "DEBUG", "Votre pokemon " + actualPokemonName + " est mort !\n\nNouveau pok??mon = " + newPokemon.name, "alerte");
        $(".player")[0].children[0].children.name.innerText = newPokemon.name;
        $(".player")[0].children[0].children.level.innerText = newPokemon.level;
        $(".player")[0].children[0].children[0].children.myHP.innerText = " " + newPokemon.hp;
        $("#pokemonPlayerImg").attr('src', newPokemon.pathImg);
        $("#message")[0].innerText = "Que doit faire " + player.listePokemons.data[player.listePokemons.index].name + " ?";
        msgSocket = new MessageToEmit("all", 'sendDataToOpponent', "pokemonDied", newPokemon, socketPlayer);
        msgSocket.emit();
    }
    else{
        debugMsg = new DebugMsg(3, "DEBUG", "Fin du combat", "console");
    }
    
}

function checkIfAllPokemonDied()
{
    if(opponent.listePokemons.index > 2)
    {
        battle.chrono.stopChronometer();
        debugMsg = new DebugMsg(3, "DEBUG", "Opponent a perdu, tous ses pok??mons sont morts", "alerte");
        playerWin(player, opponent);
        return true;
    }
    if(player.listePokemons.index > 2)
    {
        debugMsg = new DebugMsg(3, "DEBUG", "Vous avez perdu, tous vos pok??mons sont morts", "alerte");
        msgSocket = new MessageToEmit("all", "sendDataToOpponent", "playerWin", "None", socketPlayer);
        msgSocket.emit();
        playerLoose(opponent, player);
        return true;
    }
    else
    {
        return false;
    }
}

function playerWin(winner, looser)
{
    battle.winner = winner;
    let msg = "F??licitations " + winner.profile.name + ", vous avez gagn?? la battle face ?? " + looser.profile.name + "\n\n Vous avez une ??nergie : " + player.energyIfWin.name;
    debugMsg = new DebugMsg(3, "DEBUG", msg, "alerte");
    winner.profile.battleWon ++;
    if(winner.profile.battleWon % 10 == 0)
    {
        debugMsg = new DebugMsg(3, "DEBUG", "C'est votre " + winner.profile.battleWon + " battle gagn??, vous augmentez de 1 niveau !", "alerte");
        winner.profile.level ++; 
    }

    udpateDataPlayerToDB(winner);
    saveDataBattleToDB();
}

function playerLoose(winner, looser)
{
    battle.winner = winner;
    debugMsg = new DebugMsg(3, "DEBUG", "Vous ??tes nul " + looser.profile.name + ", vous avez perdu face ?? " + winner.profile.name, "alerte");
    looser.profile.battleLost ++;
    udpateDataPlayerToDB(looser);
}

function udpateDataPlayerToDB(player)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    if(player.profile.name != battle.winner.profile.name)
    {
        player.energyIfWin.id = 0;          //Si le joueur n'a pas gagn??, il ne gagne pas d'energy
    }

    json = {id: player.profile.id, name: player.profile.name, level: player.profile.level, battle_won: player.profile.battleWon, battle_lost: player.profile.battleLost, energyIfWinID: player.energyIfWin.id};

    debugMsg = new DebugMsg(2, "DEBUG", "Mise ?? jour des infos du joueur en cours...", "console");
    $.ajax({
        url: '/battle/main', 
        type: 'POST',
        data: json,
        dateType: 'json'
    })
    .done(function(data){
        debugMsg = new DebugMsg(2, "DEBUG", "Mise ?? jour termin??e avec succ??s : ", "console");
        console.log(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown){
        debugMsg = new DebugMsg(2, "DEBUG", "Une erreur a ??t?? produite lors de la tentative de mise ?? jour : " + errorThrown, "console");
    });
}

function saveDataBattleToDB()
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    jsonPokemonJoueur1 = {
        id1 :battle.player.listePokemons.data[0].id,
        //id2 :battle.player.listePokemons.data[1].id,
        //id3 :battle.player.listePokemons.data[2].id
    }
    jsonPokemonJoueur2 = {
        id1 :battle.opponent.listePokemons.data[0].id,
        //id2 :battle.opponent.listePokemons.data[1].id,
        //id3 :battle.opponent.listePokemons.data[2].id
    }

    json = {
        duration: parseInt(battle.chrono.duree), 
        mode: "autoTour", 
        pokemonJoueur1: jsonPokemonJoueur1, 
        pokemonJoueur2: jsonPokemonJoueur2, 
        winner: battle.winner.profile.name, 
        id_user1: parseInt(battle.player.profile.id), 
        id_user2: parseInt(battle.opponent.profile.id)
    };


    debugMsg = new DebugMsg(2, "DEBUG", "Sauvegarde de la battle en cours...", "console");
    $.ajax({
        url: '/battle/save', 
        type: 'POST',
        data: JSON.stringify(json),
        dateType: 'json'
    })
    .done(function(data){
        debugMsg = new DebugMsg(2, "DEBUG", "Sauvegarde termin??e avec succ??s : ", "console");
        console.log(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown){
        debugMsg = new DebugMsg(2, "DEBUG", "Une erreur a ??t?? produite lors de la tentative de sauvegarde : " + errorThrown, "console");
    });
}

socketPlayer.socket.on('sendDataToPlayer', (message) => {
    if(message.type == "playerWin")
    {
        opponent.listePokemons.index  = 3;
        checkIfAllPokemonDied();
    }
    else if(message.type == "pokemonDied")
    {
        let newPokemon = message.data;
        debugMsg = new DebugMsg(3, "DEBUG", "Le pokemon de l'adversaire : " + battle.opponent.listePokemons.data[opponent.listePokemons.index].name + " est mort, nouveau pok??mon : " + newPokemon.name, "alerte");
        $(".opponent")[0].children[0].children[0].children.apHP.innerText = newPokemon.hp;
        $(".opponent")[0].children[0].children.pokemonOpponentName.innerText = newPokemon.name;
        $(".opponent")[0].children[0].children.pokemonOpponentLevel.innerText = " " + newPokemon.level;
        $("#opponentBall" + opponent.listePokemons.index).remove();
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
            $("#infoOpponent")[0].children.statutCombat.innerText = "??tat : Pr??t";
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