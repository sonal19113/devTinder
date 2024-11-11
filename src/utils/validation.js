const validator = require("validator");

const validateSignUpData = (body)=>{
    const {firstName,emailId,password,phone,gender} = body;
    if(!firstName){
        throw new Error("First Name is required field")
    }else if(!emailId || !validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }else if(!phone){
        throw new Error("Phone number is Missing");
    }else if(!password || !validator.isStrongPassword(password)){
        throw new Error("Invalid Password");
    }else if( !gender || !["Female","Male","Others"].includes(gender)){
        throw new Error("Invalid Gender");
    }
}

module.exports={
    validateSignUpData
}