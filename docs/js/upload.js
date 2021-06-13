" use strict "
import {photosAPI} from "/js/api/photos.js ";
import {messageRenderer} from "/js/renderers/messages.js ";
import {sessionManager} from "/js/utils/session.js ";
import { validateUpload } from "./validators/validateUpload.js";

function main () {
    console.log("HO9LA");
    let registerForm = document.getElementById ("form-photo-upload") ;
    registerForm.onsubmit = handleSubmitPhoto;
}

function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    
    let errors = validateUpload.validateUpload(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        // Add the current user ID
        formData.append("userId", sessionManager.getLoggedUser().userId);//sessionManager.getLoggedId()
        photosAPI.create(formData)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener("DOMContentLoaded", main);