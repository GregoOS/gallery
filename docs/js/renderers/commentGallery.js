" use strict ";
import { parseHTML } from "/js/utils/parseHTML.js ";
import { commentRenderer } from "./commentRenderer.js ";
    const galleryRenderer = {
        asCommentGallery: function(comments) {
            let galleryContainer = parseHTML('<div> </div >');
            for ( let comment of comments ) {
                let card = commentRenderer.asComment(comment);
                galleryContainer.appendChild(card);
            }
        return galleryContainer;
        }
    };
export { galleryRenderer };