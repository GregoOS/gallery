" use strict "

import {photosAPI} from "/js/api/photos.js";
import {detailRenderer} from "/js/renderers/detailRenderer.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";

function main () {

    let urlParams = new URLSearchParams ( window.location.search ) ;
    let photoId = urlParams.get("photoId") ;

    let photoContainer = document.querySelector("div.anade");
    photosAPI.getByPhotoId(photoId)
        .then(photos => {
            let photoDetails = detailRenderer.asCard(photos[0]);
            photoContainer.appendChild(photoDetails);
        })
        .catch( error => messageRenderer.showErrorMessage(error));


    //let evaluate = document.getElementById ("form-evaluate") ;
    //evaluate.onsubmit = handleValuatePhoto;

    }

function handleEvaluatePhoto(event){
    //hay que hacer la tabla de evaluate
    //userId y photoId unico
}



document.addEventListener ("DOMContentLoaded", main) ;