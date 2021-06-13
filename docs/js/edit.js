"use strict"
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import { validateUpload } from "/js/validators/validateUpload.js ";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId = urlParams.get("userId");
let currentPhoto = null;

function main() {
    loadCurrentPhoto();
    let editForm = document.getElementById("form-photo-edit");
    editForm.onsubmit = handleEditPhoto;
    let deleteBtn = document.getElementById("button-delete");
    deleteBtn.onclick = handleDelete;
}

function handleEditPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    formData.append(" userId ", currentPhoto.userId);
    formData.append(" date ", currentPhoto.date);
    let errors = validateUpload.validateUpload(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        photosAPI.update(photoId, formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorAsAlert(error));
    }
    
}

function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo ?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function loadCurrentPhoto() {
    let titleInput = document.getElementById("title");
    let urlInput = document.getElementById("url");
    let descriptionInput = document.getElementById("description");
    let visibilityInput = document.getElementById("visibility");
    //pageTitle.textContent = "Editing a photo";
    photosAPI.getByPhotoId(userId,photoId)
        .then(photos => {
            currentPhoto = photos[0];
            titleInput.value = currentPhoto.title;
            urlInput.value = currentPhoto.url;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


document.addEventListener("DOMContentLoaded", main);