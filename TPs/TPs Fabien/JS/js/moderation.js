"use strict";

$(document).ready(function () {
    let indexNewComment = 4;        //Car on a deja la balise user3
    var elementModifier = null;
    var idElementModifier = null;
    function modify(e) {
        let idElement = e.currentTarget.parentNode.id;
        alert(e.type + " on modify for " + idElement + " !");
        idElementModifier = '#' + idElement;
        elementModifier = $(idElementModifier).children("p");
        //element.children[1].innerHTML = "Chaîne modifiée!!";
        // On met à jour le textarea
        $('#myText').val(elementModifier[0].innerText);
        $('#myForm').css('display', 'inline');

    }

    function deleter(e) {
        var idElement = e.currentTarget.parentNode.id;
        alert(e.type + " on remove for " + idElement + " !");
        var element = document.getElementById(idElement);
        element.remove();
    }

    document.getElementById("addNew").addEventListener("click", function (e) {
        alert(e.type + " on add !");
        var divUsers = document.getElementById("users");
        var divNewUsers = document.createElement("div");
        var newBtnModify = document.createElement("button");
        newBtnModify.classList.add("modify");
        newBtnModify.innerText = "Modify Comment";

        var newBtnRemove = document.createElement("button");
        newBtnRemove.classList.add("remove");
        newBtnRemove.innerText = "Remove Comment";

        divNewUsers.id = "user" + indexNewComment;
        indexNewComment = indexNewComment +1;
        divUsers.appendChild(divNewUsers);
        divNewUsers.innerHTML = "<h4> Un nouveau titre n°" + indexNewComment + "</h4>";
        divNewUsers.innerHTML = divNewUsers.innerHTML + "<p> Un nouveau text n°" + indexNewComment + "</p>";
        divNewUsers.appendChild(newBtnModify);
        divNewUsers.appendChild(newBtnRemove);
        newBtnModify.addEventListener("click", modify);
        newBtnRemove.addEventListener("click", deleter);
    })


    function checkNewCommentValide(event){
        let valToCheck = event.currentTarget.elements[0].value; //récupère la valeur du texte dans le premier input
        if(valToCheck == ""){
            alert("ERREUR - Saisie incorrecte : Le nouveau commentaire ne peut pas être nul");
            event.preventDefault();
            return false;
        }else{
            alert("SUCCES - Saisie valide : Le commentaire de " + idElementModifier + " va être modifié pour valToCheck = " + valToCheck);
            $(idElementModifier).children("p")[0].innerText(valToCheck);
            alert("test");
            event.preventDefault();
            return false;

        }
    }



    let modifiers = document.getElementsByClassName("modify");
    Array.from(modifiers).forEach(m => m.addEventListener("click", modify));

    let remover = document.getElementsByClassName("remove");
    Array.from(remover).forEach(m => m.addEventListener("click", deleter));

    let myForm = document.forms["myForm"];
    myForm.addEventListener("submit", checkNewCommentValide);
    $('#myForm').css('display', 'none');
});