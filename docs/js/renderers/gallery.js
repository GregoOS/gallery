"use strict";
import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRenderer} from "./photoRenderer.js";
import { sessionManager } from "/js/utils/session.js ";
    const galleryRenderer = {
        asCardGallery: function(photos) {
            let galleryContainer = parseHTML ( '<div class="photo-gallery"> </div > ');
            let row = parseHTML ( '<div class="row"> </div>') ;
            galleryContainer.appendChild (row) ;
            let counter = 0;
            let i=0;
            let cont=0;
            while(cont<50 && i<photos.length){
                if(sessionManager.isLogged()){
                    if(photos[i].visibility==="Public" || sessionManager.getLoggedUser().userId===photos[i].userId){
                        let card = photoRenderer.asCard(photos[i]);
                        row.appendChild(card);
                        counter += 1;
                        if ( counter % 2 === 0) {
                            row = parseHTML ('<div class="row"> </div >');
                            galleryContainer.appendChild(row);
                        }
                        cont=cont+1;
                    }
                }else if(photos[i].visibility=="Public"){
                    let card = photoRenderer.asCard(photos[i]);
                    row.appendChild(card);
                    counter += 1;
                    if ( counter % 2 === 0) {
                        row = parseHTML ('<div class="row"> </div >');
                        galleryContainer.appendChild(row);
                    }
                    cont=cont+1;
                }
                i=i+1;
            }
            /* for ( let photo of photos ) {
                if(photo.visibility==="Public" || sessionManager.getLoggedUser().userId===photo.userId){
                    let card = photoRenderer.asCard(photo);
                    row.appendChild(card);
                    counter += 1;
                    if ( counter % 2 === 0) {
                        row = parseHTML ('<div class="row"> </div >');
                        galleryContainer.appendChild(row);
                    }
                }
            } */
        return galleryContainer;
        }
    };
export {galleryRenderer};