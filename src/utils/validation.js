const validator = require('validator');
const validateSignUpData=(req)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
         throw new Error("Invalid fields");
    }
    if(!validator.isEmail(req.body.email)){
        throw new Error("Invalid email");
    }
    if(validator.isStrongPassword(req.body.password)){
        throw new Error("Weak password");
    }



}
module.exports={
    validateSignUpData
}