const admin = require("../Models/adminModel");
const adminValidate = require("../Validations/adminValidation.js");
const crypt = require("bcrypt");

exports.login = (req, res)=>{
    res.send("Admin Login");
}

exports.register = (req, res)=>{
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({"error" : "QUESRY ISSUE", 'massage' : "Please provide paramters"});
    
    // Validations
    let isValidEmail = adminValidate.emailVaidation(email);
    let isValidPassword = adminValidate.passwordVaidation(password);
    let isValidName = adminValidate.nameVaidation(name);
    if(isValidEmail && isValidName && isValidPassword){
        crypt.hash(password, 10, async(err, hash)=>{
            if(err) return res.status(500).json({"error" : "SERVER ISSUE", 'massage' : "Failed incrypt password, please try again after sometime..."});
            let result = await admin.register(name, email, hash);
            if("error" in result){
                res.status(512).json({"error" : "QUERY ISSUE", "massage" : result.error});
            }else{
                res.status(201).json({"error" : "NO ISSUE", "massage" : result.massage});
            }
        })
    }else{
        return !isValidEmail
            ? res.status(512).json({"error" : "QUERY ISSUE", "massage" : "Please follow email format or check if already exists"}) 
            : !isValidPassword
                ? res.status(512).json({"error" : "QUERY ISSUE", "massage" : "Please provide stronger password having at least 6 char"}) 
                : res.status(512).json({"error" : "QUERY ISSUE", "massage" : "Please follow name format only latters allowed"})
    }
}