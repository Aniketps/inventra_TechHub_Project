const admin = require("../Models/adminModel");
const adminValidate = require("../Validations/adminValidation.js");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({"error" : "QUESRY ISSUE", 'message' : "Please provide all the paramters"});
    let result = await admin.login(email, password);
    if("error" in result){
        res.status(512).json({"error" : "QUERY ISSUE", "message" : result.error, "loginStatus" : false});
    }else{
        res.status(200).json({"error" : "NO ISSUE", "message" : result.message, "loginStatus" : true});
    }
}

exports.register = (req, res)=>{
    // return res.status(403).json({"error" : "ACCESS ISSUE", "message" : "Forbidden"});;

    // Tempary not available
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({"error" : "QUESRY ISSUE", 'message' : "Please provide all the paramters"});
    
    // Validations
    let isValidEmail = adminValidate.emailVaidation(email);
    let isValidPassword = adminValidate.passwordVaidation(password);
    let isValidName = adminValidate.nameVaidation(name);
    if(isValidEmail && isValidName && isValidPassword){
        crypt.hash(password, 10, async(err, hash)=>{
            if(err) return res.status(500).json({"error" : "SERVER ISSUE", 'message' : "Failed incrypt password, please try again after sometime..."});
            let result = await admin.register(name, email, hash);
            if("error" in result){
                res.status(512).json({"error" : "QUERY ISSUE", "message" : result.error});
            }else{
                res.status(201).json({"error" : "NO ISSUE", "message" : result.message});
            }
        })
    }else{
        return !isValidEmail
            ? res.status(512).json({"error" : "QUERY ISSUE", "message" : "Please follow email format or check if already exists"}) 
            : !isValidPassword
                ? res.status(512).json({"error" : "QUERY ISSUE", "message" : "Please provide stronger password having at least 6 char"}) 
                : res.status(512).json({"error" : "QUERY ISSUE", "message" : "Please follow name format only latters allowed"})
    }
}

exports.validateToken = (req, res)=>{
    const token = req.body.token;
    jwt.verify(token.split(" ")[1], process.env.jwtSecret, (err) => {
        if (err) {
            res.status(404).json({ "message": "Access Denied", "user": false });
        } else {    
            res.status(200).json({ "message": "Access Grand", "user": true });
        }
    });
}