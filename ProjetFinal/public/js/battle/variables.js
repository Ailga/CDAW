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
        this.listePokemons.data = jsonListePokemon;
    }

    setStatus(status){
        this.status = status;
    }

    setSocketID(socketID){
        this.socketID = socketID;
    }
}
  
class Pokemon {
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

class Tour {
    constructor(){
        this.duree = 0;
        this.starter = new Player();
    }

    constructor(playerWhoStart){
        this.starter = playerWhoStart;
    }

    setDuree(dureeEnSec){
        this.duree = dureeEnSec;
    }
}

class Battle {
    constructor() {
        this.player = new Player();
        this.opponent = new Player();
        this.duree = 0;                 //durée en secondes
        this.winner = new Player();
        this.tour = new Tour();
    }

    constructor(player, opponent){
        this.player = player;
        this.opponent = opponent;
    }

    setDuree(dureeEnSec){
        this.duree = dureeEnSec;
    }
}
  
class DebugMsg {
    constructor() {
        this.level = 1;          //valeur 1 à 3 (- important à ++)
        this.type = "DEBUG";     //valeur possible DEBUG, WARN, ERROR
        this.msg = "";
    }

    constructor(level, type, msg){
        this.level = level;
        this.type = type;
        this.msg = msg;
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
  
class Socket {
    constructor(){
        this.adresseIP = "127.0.0.1";
        this.port = "3000";
        this.socket = io(this.adresseIP + ':' + this.port);
        console.log("Socket créé avec ID : " + this.socket);
    }

    constructor(adresse, port){
        this.adresseIP = adresse;
        this.port = port;
        this.socket = io(this.adresseIP + ':' + this.port);
    }
}

class MessageToEmit {
    constructor(){
        this.IDreceiver = "";       //valeur all -> pour tous sinon pour une personne spécifique
        this.IDsender = "";         //id de la socket d'origine
        this.msg = "";
        this.type = "";
        this.title = "";
    }

    emit(socket){
        socket.emit(this.title, this.msg);
    }
}