 "use strict"

import {sessionManager} from "./utils/session.js";

function main(){
    showUser();
    addLogoutHandler();
    
}

function showUser () {
    let title = document.getElementById("user-name") ;
    let href = document.getElementById("user-page") ;
    let headerCreate = document.getElementById("mas");
    let headerOut=document.getElementById("navbar-logout");
    let text;
    let text2;
    let disp;
    if ( sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi , @" + username;
        text2=`user.html?userId=${sessionManager.getLoggedUser().userId}`;
        disp="display:inline;"
    } else {
        text ="Anonymous";
        text2="signIn.html";
        disp="display:none;"
    }
    title.textContent = text;
    href.href=text2;
    headerCreate.style=disp;
    headerOut.style=disp;
}

function addLogoutHandler () {
    let logoutButton = document.getElementById("navbar-logout");
    logoutButton.addEventListener("click",function() {
    sessionManager.logout () ;
    window.location.href = " index.html ";
    }) ;
}
    

    
document.addEventListener ("DOMContentLoaded", main ) ;