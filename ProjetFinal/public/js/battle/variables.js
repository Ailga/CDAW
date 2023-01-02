class DebugMsg {
    constructor(level, type, msg, outFormat){
        this.level = level;     //valeur 1 à 3 (- important à ++)
        this.type = type;       //valeur possible DEBUG, WARN, ERROR
        this.msg = msg;

        if(outFormat == "alerte")
        {
            this.alerteMsg();
        }else if(outFormat == "console")
        {
            this.consoleMsg();
        }
    }

    setDebugMsg(message){
        this.msg = message;
    }

    setLevel(level){
        this.level = level;
    }

    setType(type){
        this.type = type;
    }

    alerteMsg(){
        alert(this.type + " : " + this.msg);
    }

    consoleMsg(){
        console.log(this.type + " : " + this.msg);
    }
}

class Energy{
    constructor(){
        this.name = "";
        this.pathIcon = "";
    }

    setDataFromJson(jsonEnergy){
        this.name = jsonEnergy.name;
        this.pathIcon = jsonEnergy.pathIcon;
    }
}

class Pokemon {

    constructor() {
        this.name = "";
        this.hp = 0;
    }

    setDataFromJson(jsonPokemon){
        this.id = jsonPokemon.id;
        this.name = jsonPokemon.name;
        this.id_energy = jsonPokemon.id_energy;
        this.pv_max = jsonPokemon.pv_max;
        this.hp = jsonPokemon.pv_max;
        this.level = jsonPokemon.level;
        this.weight = jsonPokemon.weight;
        this.height = jsonPokemon.height;
        this.pathImg = jsonPokemon.pathImg;
        this.availableNormalAttack = jsonPokemon.availableNormalAttack;
        this.availableSpecialAttack = jsonPokemon.availableSpecialAttack;
        this.availableSpecialDefense = jsonPokemon.availableSpecialDefense;
        this.scoreNormalAttack = jsonPokemon.scoreNormalAttack;
        this.scoreSpecialAttack = jsonPokemon.scoreSpecialAttack;
        this.scoreSpecialDefense = jsonPokemon.scoreSpecialDefense;
    }
    
}

class Player {
    constructor(){
        this.profile = {};
        this.listePokemons = {};
        this.status = "objectCreated";
        this.socketID = "";
    }

    setProfilFromJson(jsonPlayer){
        this.profile.id = jsonPlayer.id;
        this.profile.name = jsonPlayer.name;
        this.profile.level = jsonPlayer.level;
        this.profile.imgProfil = jsonPlayer.profile_photo_path;
        this.profile.battleWon = jsonPlayer.battle_won;
        this.profile.battleLost = jsonPlayer.battle_lost;
    }

    setListePokemonFromJson(jsonListePokemon){
        this.listePokemons.index = 0;
        this.listePokemons.data = {};
        let index = 0;
        jsonListePokemon.forEach(pokemonJson => {
            let tmpPokemon = new Pokemon();
            tmpPokemon.setDataFromJson(pokemonJson);
            this.listePokemons.data[index] = tmpPokemon;
            index ++;
        });
    }

    setStatus(status){
        this.status = status;
    }

    setSocketID(socketID){
        this.socketID = socketID;
    }
}

class Chrono{
    constructor(){
        this.textElementID = "";
        this.duree = 0;
        this.id = 0;
    }

    startChronometer = () => {
        let startTime;
        let currentTime;
        let elapsedTime = 0;
        startTime = Date.now();
        this.id = setInterval(() => {
            currentTime = Date.now();
            elapsedTime = Math.floor((currentTime - startTime) / 1000);
            this.duree = elapsedTime;
            if(this.textElementID != ""){
                if(elapsedTime < 60){
                    document.getElementById(this.textElementID).innerHTML = "0:" + elapsedTime;
                }else{
                    let minutes = Math.floor(elapsedTime / 60);
                    let seconds = elapsedTime % 60;
                    document.getElementById(this.textElementID).innerHTML = minutes + ":" + seconds;
                }
            }
            
        }, 1000);

    }

    stopChronometer(){
        clearInterval(this.id);
    }

}

class ActionTour {
    constructor() {
        this.type = "";
        this.score = 0;
        this.opponentHP = 0;
    }
}

class Tour {

    constructor(){
        this.chrono = new Chrono();
        this.intervalId = 0;
        this.player = {};
        this.player.action = new ActionTour();
        this.player.status = "objectCreated";
        this.player.pokemon = new Pokemon();
        this.player.chrono = new Chrono();
        this.opponent = {};
        this.opponent.action = new ActionTour();
        this.opponent.pokemon = new Pokemon();
        this.opponent.status = "objectCreated";
        this.opponent.chrono = new Chrono();
    }
}

class Battle {
    constructor(player, opponent){
        this.player = player;
        this.opponent = opponent;
        this.chrono = new Chrono();
        this.tour = {};
        this.indexTour = 0;
        this.tour[0] = new Tour();
        this.score = [0,0];             // Format [scorePlayer, scoreOpponent] EN DEV
        this.winner = "";
    }

    setPlayer(player){
        this.player = player;
    }
    
    setOpponent(player){
        this.opponent = player;
    }

}

class Socket {
    constructor(){
        this.adresseIP = "127.0.0.1";
        this.port = "3000";
        this.socket = io(this.adresseIP + ':' + this.port);
        console.log("Socket créé sur adresse: " + this.adresseIP + ':' + this.port);
    }
}

class MessageToEmit {
    
    constructor(receiver, title, type, content, socketObj)
    {
        this.IDreceiver = receiver;     //valeur all -> pour tous sinon pour une personne spécifique
        this.IDsender = "";             //id de la socket d'origine
        this.title = title;
        this.type = type;
        this.data = content;
        this.socketObj = socketObj;
    }

    emit()
    {
        let message = {};
        message.type = this.type;
        message.data = this.data;
        this.socketObj.socket.emit(this.title, message);
    }
}