"use strict";

$(document).ready(function () {
    let indexNewComment = 4;        //Car on a deja la balise user3
    function modify(e) {
        var idElement = e.currentTarget.parentNode.id;
        alert(e.type + " on modify for " + idElement + " !");
        let elementModifier = document.getElementById(idElement);
        //element.children[1].innerHTML = "Chaîne modifiée!!";
        // On met à jour le textarea
        $('#myText').val(elementModifier.children[1].innerHTML);

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
        alert("test check call et elementModifier = " + elementModifier);
        var valToCheck = event.currentTarget.elements[0].value; //récupère la valeur du texte dans le premier input
        if(valToCheck == ""){
            alert("ERREUR - Saisie incorrecte : Le nouveau commentaire ne peut pas être nul");
            event.preventDefault();
        }else{
            alert("SUCCES - Saisie valide : Le commentaire de " + elementModifier + " va être modifié");
            $('#' + elementModifier).val(valToCheck);
        }
    }



    let modifiers = document.getElementsByClassName("modify");
    Array.from(modifiers).forEach(m => m.addEventListener("click", modify));

    let remover = document.getElementsByClassName("remove");
    Array.from(remover).forEach(m => m.addEventListener("click", deleter));

    document.forms["myForm"].addEventListener("submit", checkNewCommentValide);
});