"use strict"; // Sinon le prof se fache XD

$(document).ready(function () {
    function changeBackground() {
        document.body.style.backgroundColor = "green";
    }

    function changeBackgroundPOnly(){
        let descr = document.getElementsByClassName("descr");
        for (var i = 0; i < descr.length; i++) {
            if (descr[i].tagName.toLowerCase() == ("p")){
                console.log("balise <p> trouvée");
                descr[i].style.backgroundColor = "green"
            }
        }
    }

    function changeBackgroundWithNoeudVar(){
        let descr = document.getElementById("caroussel");
        descr.children[0].style.backgroundColor = "green"; //Pour changer que le premier paragraphe
    }

    //changeBackground();
    //changeBackgroundPOnly();
    changeBackgroundWithNoeudVar();
});


// Pour le chargement, utiliser plutôt addeventlistener(DOM)