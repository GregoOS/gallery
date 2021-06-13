" use strict "

import { marksAPI } from "./api/marks.js";
import {photosAPI} from "/js/api/photos.js";
import {detailRenderer} from "/js/renderers/detailRenderer.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";

let urlParams = new URLSearchParams ( window.location.search ) ;
let photoId = urlParams.get("photoId");
let userId = urlParams.get("userId");

function main () {



    let photoContainer = document.querySelector("div.anade");
    photosAPI.getByPhotoId(userId, photoId)
        .then(photos => {
            let photoDetails = detailRenderer.asCard(photos[0]);
            photoContainer.appendChild(photoDetails);
            let evaluate = photoDetails.querySelector(".form-evaluate") ;
            if(sessionManager.isLogged()){
                evaluate.onsubmit = handleEvaluatePhoto;
            }
        })
        .catch( error => messageRenderer.showErrorMessage(error));



    }

function handleEvaluatePhoto(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedUser().userId);
    formData.append("photoId", photoId);
    if(formData.get("mark")==="no"){
        formData.delete("mark");
    }
    
        marksAPI.create(formData)
                .then(data => window.location.href = `detail.html?photoId=${photoId}`)
                .catch(error=>{
                    marksAPI.update(sessionManager.getLoggedUser().userId,photoId,formData)
                    .then(data => window.location.href = `detail.html?photoId=${photoId}`)
                    .catch( error => messageRenderer.showErrorMessage(error));
                });
    

}



document.addEventListener ("DOMContentLoaded", main) ;