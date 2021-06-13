" use strict ";
import { parseHTML } from "/js/utils/parseHTML.js";
import {usersAPI} from "/js/api/users.js";
import {marksAPI} from "/js/api/marks.js";
import { sessionManager } from "/js/utils/session.js ";
const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class= " col-md ">
                        <div class="card">
                            <div class="photo-info"><div class="ifuser"></div>
                                <div><h3 class="photo-user"> <a href="user.html?userId=${photo.userId}" class="user-link"></a></h3>
                                <span class="photo-date" style="padding: 0;">${photo.date}</span></div>
                                <div><h5 class="photo-title"><br>${photo.title}</h5></div>
                            </div>
                            <div class="photo-photo">
                                <img src="${photo.url}" alt="${photo.title}" class="photo-img"></img>
                            </div>
                            <div class="photo-subinfo">
                                <i class="photo-rating"><span class="finalMark"></span>/5</i>
                                <a href="detail.html?photoId=${photo.photoId}"><img alt="c" src="./images/eye.png" class="photo-comment"></a>
                            </div>
                        </div>
                    </div>`;
        let card = parseHTML ( html ) ;
        if(sessionManager.isLogged()){
            if (sessionManager.getLoggedUser().userId===photo.userId){
                loadEditOption(card,photo.photoId,photo.userId)
            }
        }
        loadUsernameCard(card,photo.userId);
        photoRenderer.loadMark(card,photo.photoId);
        if(photo.visibility==="Private"){
            let p = card.querySelector ("div.card");
            p.style="background-color: #B2BABB !important;";
        }
        return card;
    },


    loadMark:function (card,photoId){
        let p = card.querySelector ("span.finalMark") ;
            p.textContent = "0";
        marksAPI.getByPhotoId ( photoId )
        .then ( marks => {
            let number=0;
            let total=0;
            for (let mark of marks) {
                if(mark.mark!==null){
                    total=total+mark.mark;
                    number=number+1;
                }
            }
            let final = total/number;
            let final2 = final.toFixed();
            let p = card.querySelector ("span.finalMark") ;
            p.textContent = final2;
        })
        .catch( error =>null);
    }

};

function loadUsernameCard (card , userId ) {
    usersAPI.getById ( userId )
        .then ( users => {
            let username = users[0].username;
            let p = card.querySelector ("a.user-link") ;
            p.textContent = "@"+username;
        }) ;
};

function loadEditOption(card,photoId,userId){
    let diiv = card.querySelector(".ifuser");
    let code= `<a style="float: right;"href="edit.html?photoId=${photoId}&userId=${userId}">Edit</a>`;
    let codeOK =parseHTML ( code ) ;
    diiv.appendChild(codeOK);
};




export{photoRenderer};

