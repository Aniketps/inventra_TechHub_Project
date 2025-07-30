const admin = require("../Databases/mainDatabase");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (name, email, password)=>{
    return new Promise((resolve, reject)=>{
        admin.query("insert into admin values ('0', ?, ?, false, ?, '')", [email, password, name], (err, result)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    reject(email+" is duplicate entry");
                }else{
                    console.log(err);
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows > 0){
                    resolve("Registed");
                }else{
                    reject("not registered, Please try again or report");
                }
            }
        });
    }).then((result)=>{
        return { "message" : result };
    }).catch((err)=>{
        return { "error" : err };
    });
}

exports.login = (email, password)=>{
    return new Promise((resolve, reject)=>{
        admin.query("select * from admin where email =  ?", [email], async(err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.length > 0){
                    let isValid = await crypt.compare(password, result[0].password);
                    if(isValid){
                        result[0].password = "Can't be visible"
                        result[0].token = jwt.sign({
                            email : result[0].email,
                        }, process.env.jwtSecret, {expiresIn : '30d'})
                        result[0].token = `Bearer ${result[0].token}`
                        // Update token in real data
                        admin.query("update admin set token = ? where email = ?", [result[0].token, result[0].email], (err)=>{
                            if(err){
                                reject(err.sqlMessage);
                            }
                        })
                        result[0].validity = "30d";
                        resolve({ "userStatus" : "User available with valid details", "data" : result[0]});
                    }else{
                        reject("Password is incorrect");
                    }
                }else{
                    reject("User dont exists");
                }
            }
        });
    }).then((result)=>{
        return { "message" : result };
    }).catch((err)=>{
        return { "error" : err };
    })
}

exports.checkEmailExists = (email)=>{
    return new Promise((resolve, reject)=>{
        admin.query("select * from admin where email = ?", [email], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.length > 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        });
    }).then((result)=>{
        return { "message" : result };
    }).catch((err)=>{
        return { "error" : err };
    });
}