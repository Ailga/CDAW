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

class ActionTour {
    constructor() {
        this.type = "";
        this.score = 0;
        this.opponentHP = 0;
    }
}

class Tour {
    constructor(){
        this.duree = 0;
        this.player = {};
        this.player.action = new ActionTour();
        this.player.status = "objectCreated";
        this.player.pokemon = new Pokemon();
        this.opponent = {};
        this.opponent.action = new ActionTour();
        this.opponent.pokemon = new Pokemon();
        this.opponent.status = "objectCreated";
    }

    setDuree(dureeEnSec){
        this.duree = dureeEnSec;
    }
}

class Battle {
    constructor(player, opponent){
        this.player = player;
        this.opponent = opponent;
        this.duree = 0;
        this.tour = {};
        this.indexTour = 0;
        this.tour[0] = new Tour();
        this.score = [0,0];             // Format [scorePlayer, scoreOpponent]
    }

    setDuree(dureeEnSec){
        this.duree = dureeEnSec;
    }

    setPlayer(player){
        this.player = player;
    }
    
    setOpponent(player){
        this.opponent = player;
    }

    setWinner(player){
        this.winner = player;
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