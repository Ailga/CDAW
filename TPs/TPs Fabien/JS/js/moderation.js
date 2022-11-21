"use strict";

$(document).ready(function () {
    let indexNewComment = 4;        //Car on a deja la balise user3
    function modify(e) {
        let idElement = e.currentTarget.parentNode.id;
        alert(e.type + " on modify for " + idElement + " !");
        let element = document.getElementById(idElement);
        element.children[1].innerHTML = "Chaîne modifiée!!";
    }

    function deleter(e) {
        let idElement = e.currentTarget.parentNode.id;
        alert(e.type + " on remove for " + idElement + " !");
        let element = document.getElementById(idElement);
        element.remove();
    }

    document.getElementById("addNew").addEventListener("click", function (e) {
        alert(e.type + " on add !");
        let divUsers = document.getElementById("users");
        let divNewUsers = document.createElement("div");
        let newBtnModify = document.createElement("button");
        newBtnModify.classList.add("modify");
        newBtnModify.innerText = "Modify Comment";

        let newBtnRemove = document.createElement("button");
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

    let modifiers = document.getElementsByClassName("modify");
    Array.from(modifiers).forEach(m => m.addEventListener("click", modify));

    let remover = document.getElementsByClassName("remove");
    Array.from(remover).forEach(m => m.addEventListener("click", deleter));
});