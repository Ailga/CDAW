"use strict"; // Sinon le prof se fache XD

$( document ).ready(function() {
    let maVar1 = 2;
    function showAlerte0(){
        console.log( "Page ready!" );
        alert("Number Two (externe JS version)");
    }

    // Exo : 1) et 2) Quand on créer une fonction, il ne faut pas oublier de l'appeler !
    showAlerte0();    
});