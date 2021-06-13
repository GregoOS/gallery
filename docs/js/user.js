"use strict"
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import {usersAPI} from "/js/api/users.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main () {
    usersAPI.getById(userId)
    .then (users => {
        let username = users[0].username;
        let avatar=users[0].avatarUrl;
        let p = document.querySelector ("span.title") ;
        p.textContent = "@"+username;
        let i = document.querySelector ("img.avatar") ;
        i.src=avatar;
    }) ;

    let galleryContainer = document.querySelector("div.anade") ;
    
    photosAPI.getUserPhotos(userId)
        .then(photos => {
            let number = photos.length;
            let p = document.querySelector ("h3.numbers") ;
            p.textContent = number+"/50";
            let gallery = galleryRenderer.asCardGallery(photos) ;
            galleryContainer.appendChild(gallery);
        })
        .catch( error => {
            if(error!="Not found"){
                messageRenderer.showErrorMessage(error)
            }else{
            let p = document.querySelector ("h3.numbers") ;
            p.textContent = "0/50";
            }
    });
}
document.addEventListener ("DOMContentLoaded", main ) ;