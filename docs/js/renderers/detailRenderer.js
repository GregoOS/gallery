"use strict";
import {parseHTML} from "/js/utils/parseHTML.js";
import { sessionManager } from "/js/utils/session.js ";
import {photoRenderer} from "./photoRenderer.js";
const detailRenderer = {
    asCard: function (photo) {
        let html = `<div><div class="row where">
                        <a href="user.html?userId=${photo.userId}"><img style="position: absolute;" src="./images/back.png" alt="back" height="50em"></a><span>Details</span>
                    </div>
                    <div class="row">
                        <div class="col-md">
                            <div class="photo-photo">
                            <img src="${photo.url}" alt="${photo.title}" class="photo-img"></img>
                            </div>
                        </div>
                    </div>
                        <div class="row" style="margin-top: 0.5em;">
                        <div class="col-md vota">
                            
                        </div>
                        <div class="col-md" style="text-align: center;">
                            <span><span class="finalMark"></span>/5</span>
                        </div>
                        <div class="col-md"> <span class="photo-date" style="padding: 0;">${photo.date}</span></div>
                    </div>
                    <div class="row">
                        <div class="col-md" style="text-align: center;">
                            <h2 class="photo-title">${photo.title}</h2>
                            <h5 class="photo-title">${photo.description}</h5>
                        </div>
                    </div>
                    </div>`;
        let det = parseHTML(html);
        if(sessionManager.isLogged()){
            let vota=`<form class="form-evaluate">
                        <select name="mark" id="mark">
                            <option value="no">No voto</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input type="submit" value="Enviar" >
                    </form>`;
            let votaParse=parseHTML(vota);
            let div=det.querySelector("div.vota");
            div.appendChild(votaParse);
                }
        photoRenderer.loadMark(det,photo.photoId);
        return det;
    },

};

export {detailRenderer}