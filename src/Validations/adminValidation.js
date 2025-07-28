const admin = require("../Models/adminModel.js");

exports.emailVaidation = async(email)=>{
    // Check if already exists
    let isExists = await admin.checkEmailExists(email);
    if(!isExists) return true;

    // Check email format
    return true;
}

exports.passwordVaidation = (password)=>{
    // Check password strenght should be greater than 6
    if(password.length >= 6){
        return true;
    }else{
        return false;
    }
}

exports.nameVaidation = (name)=>{
    // Check name format structure
    let isValid = true;
    for(let i = 0; i<name.length; i++){
        if(!((name.toLowerCase().charCodeAt(i) >= 'a'.charCodeAt(0) && name.toLowerCase().charCodeAt(i) <= 'z'.charCodeAt(0) || name.toLowerCase().charCodeAt(i) == ' '.charCodeAt(0)))){
            isValid = false;
            break;
        }
    }
    if(isValid){
        return true;
    }else{
        return false;
    }
}
