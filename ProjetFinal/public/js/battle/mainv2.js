var player = new Player();
var opponent = new Player();
var socketPlayer = new Socket();
var msgSocket = new MessageToEmit();
msgSocket.setSocket(socketPlayer);
var debugMsg = new DebugMsg();


function setObjPlayer(jsonPlayer)
{
    player.setProfilFromJson(jsonPlayer);
}

function setObjListePokemonPlayer(jsonListePokemon)
{
    player.setListePokemonFromJson(jsonListePokemon);
    debugMsg = new DebugMsg(1, "DEBUG", "Liste pokemon set : " + JSON.stringify(jsonListePokemon), "console");
}

function recherchePlayer()
{
    player.setStatus("recherchePlayer");
    debugMsg = new DebugMsg(2, "DEBUG", "Recherche d'un joueur en cours...", "console");
    msgSocket = new MessageToEmit("all", "sendDataToOpponent", "recherchePlayer", player);
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
            console.log("Lancement de la battle ...")
            $(".messageLancementCombat").text("Lancement en cours...");
            //console.log("Info battle possédée : " + JSON.stringify(battle));
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
    let pokemonOpponent = battle.opponent.listePokemons.data[listePokemons.index]
    $(".opponent")[0].children[0].children[0].children.apHP.innerText = pokemonOpponent.hp;
    $(".opponent")[0].children[0].children.pokemonOpponentName.innerText = pokemonOpponent.name;
    $(".opponent")[0].children[0].children.pokemonOpponentLevel.innerText = " " + pokemonOpponent.level;
    $("#infoOpponent")[0].children.statutOpponent.innerText = "Status : Online ✅"
    $("#infoOpponent #statutOpponent").css("color", "green");
    $("#infoOpponent")[0].children.name.innerText = "Name : " + battle.opponent.profile.name;
    $("#infoOpponent")[0].children.level.innerText = "Level : " + battle.opponent.profile.level;
}


function pokemonPlayerDied()
{
    let actualPokemonName = player.listePokemons.data[player.listePokemons.index].name;
    player.listePokemons.index ++;
    let newPokemonName = player.listePokemons.data[player.listePokemons.index].name;
    debugMsg = new DebugMsg(3, "DEBUG", "Votre pokemon" + actualPokemonName + " est mort !\n\nNouveau pokémon = " + newPokemonName, "alerte");
}


socketPlayer.on('sendDataToPlayer', (message) => {
    if(message.type == "action")
    {
        opponent.action = message.action;
        player.listePokemons.data[player.listePokemons.index].hp = message.opponentHp;
        $(".player")[0].children[0].children[0].children.myHP.innerText = message.opponentHp;
        if(message.opponentHp <=0)
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
            opponent.action = dataReceived.player.action;
            $("#infoOpponent")[0].children.statutCombat.innerText = "État : Prêt";
            $("#infoOpponent #statutCombat").css("color", "green");
            //checkIfBothPlayersAreOk();
        }
        else
        {
            opponent.status = "NOK";
        }
    }
    else if(message.type == "recherchePlayer")
    {
        debugMsg = new DebugMsg(3, "DEBUG", "Opponent" + message.data.profile.name + " recherche quelqu'un", "console");
        if(player.status == "recherchePlayer")
        {
            opponent = message.data;
            player.status = "NOK";
            opponent.status = "NOK";
            debugMsg = new DebugMsg(2, "DEBUG", "Les 2 joueurs " + player.profile.name + " et " + opponent.profile.name + " peuvent combattre ensemble", "console");
            var battle = new Battle(player, opponent);
            msgSocket = new MessageToEmit("all", "sendDataToOpponent", "playerFound", battle)
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
        var battle = new Battle(player, opponent);
        debugMsg = new DebugMsg(3, "DEBUG", "Les 2 joueurs " + player.profile.name + " et " + opponent.profile.name + " savent qu'ils peuvent combattre ensemble");
        setSearchPageAfterOpponentFound();
    }
})