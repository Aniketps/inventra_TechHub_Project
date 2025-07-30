const retailStore = require("../Databases/mainDatabase");

exports.getStoreInfo = ()=>{
    return new Promise((resolve, reject)=>{
        retailStore.query("select * from retailstore", (err, result)=>{
            if(err){
                // reject(err);
                reject("failed to fetch, please try later sometime...");
            }else{
                resolve(result[0]);
            }
        });
    }).then((result)=>{
        return { "massage" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.updateStore = (name, location, owner, gstNum, phone, email, webURL, regNum, hour)=>{
    return new Promise((resolve, reject)=>{
        retailStore.query("update retailstore set storeName = ?, location = ?, owner = ?, gstNum = ?, phoneNum = ?, email = ?, webURL = ?, businessRegistrationNum = ?, storeHour = ?", [name, location, owner, gstNum, phone, email, webURL, regNum, hour], (err, result)=>{
            if(err){
                // reject(err);
                reject(err.sqlMassage);
            }else{
                if(result.affectedRows>0){
                    resolve("Information Updated");
                }else{
                    reject("Unkwon Error");
                }
            }
        });
    }).then((result)=>{
        console.log("massage is :"+result);
        return { "massage" : result}
    }).catch((error)=>{
        console.log("error is :"+error);
        return { "error" : error }
    });
};