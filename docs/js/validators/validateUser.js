" use strict ";
import { validateUpload } from "/js/validators/validateUpload.js ";
const userValidator = {
    validateRegister: function ( formData ) {
        let errors = [];

        let name = formData.get("firstName");
        let surname = formData.get("lastName");
        let username = formData.get("username");
        let email = formData.get("email");
        let pass = formData.get("password") ;
        let pass2 = formData.get("passwordConfirm") ;
        
        if (name.length<3 | surname.length<3){
            errors.push("The first and last name should have more than 3 characters ");
        }

        if (pass!==pass2){
            errors.push("The passwords doesn't match");
        }

        if (email===null | username===null){
            errors.push("Email and username can't be null");
        }

        let malname=validateUpload.validateWords(username);
        if(malname>0){
            errors.push("The there are non-correct words in the username");
        }
        return errors;
    },

    validateEnter: function ( formData ) {
        let errors = [];

        let username = formData.get("username");
        let pass = formData.get("password");
    
        if (username===null | pass=== null){
            errors.push("Email and password can't be null");
        }
        return errors;
    }
};
export {userValidator};