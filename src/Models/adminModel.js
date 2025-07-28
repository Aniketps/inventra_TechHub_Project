const admin = require("../Databases/mainDatabase");

exports.register = (name, email, password)=>{
    return new Promise((resolve, reject)=>{
        admin.query("insert into admin values ('0', ?, ?, false, ?)", [email, password, name], (err, result)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    reject(name+" is duplicate entry");
                }else{
                    reject(err.sqlMassage);
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
        return { "massage" : result };
    }).catch((err)=>{
        return { "error" : err };
    });
}

exports.login = (email, password)=>{
    
}

exports.checkEmailExists = (email)=>{
    return new Promise((resolve, reject)=>{
        admin.query("select * from admin where email = ?", [email], (err, result)=>{
            if(err){
                reject(err.sqlMassage);
            }else{
                if(result.length > 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        });
    }).then((result)=>{
        return { "massage" : result };
    }).catch((err)=>{
        return { "error" : err };
    });
}