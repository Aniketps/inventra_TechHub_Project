const wholesaler = require("../Databases/mainDatabase");

exports.getAllWholesalers = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        wholesaler.query("select * from wholesalers", (err, result)=>{
            if(err){
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfWholesalers = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfWholesalers[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfWholesalers[Object.keys(groupsOfWholesalers).length+1] = group;
                }
                resolve(groupsOfWholesalers);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getWholesalerByID = (id)=>{
    return new Promise((resolve, reject)=>{
        wholesaler.query("select * from wholesalers where wholesalerID = ?", [id], (err, result)=>{
            if(err){
                reject("failed get sale, please try later sometime...");
            }else{
                resolve(result);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.addWholesaler = (name, address, date, phone, email)=>{
    return new Promise((resolve, reject)=>{
        wholesaler.query("insert into wholesalers values ('0', ?, ?, current_Date, ?, ?)", [name, address, date, phone, email], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Customer dont exists");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Added Successfully");
                }else{
                    reject("Unknown Error");
                }
            }
        });
    }).then((result)=>{
        console.log("message is :"+result);
        return { "message" : result}
    }).catch((error)=>{
        console.log("error is :"+error);
        return { "error" : error }
    });
};

exports.getWholesalersBySeaching = (name, addres, date, phone, email)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        let Address = `%${addres}%`;
        let Phone = `%${phone}%`;
        let Email = `%${email}%`;
        wholesaler.query("select * from wholesalers where wholesalerName like ? and address like ? and phone like ? and email like ?", [Name, Address, Phone, Email], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
            }else{
                let data = result.filter(row => date == ''? true : row.connectedDate.toISOString().split("T")[0] == date).map(row =>(
                    {
                        ...row,
                        connectedDate : row.connectedDate.toISOString().split("T")[0]
                    }
                ))
                resolve(data);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.updateWholesalerByID = (id, name, address, phone, email)=>{
    return new Promise((resolve, reject)=>{
        wholesaler.query("update wholesalers set wholesalerName = ?, address = ?, phone = ?, email = ? where wholesalerID = ?", [name, address, phone, email, id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("Updated Successfully");
                }else{
                    reject("Unknown Error");
                }
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.deleteWholesalerByID = (id)=>{
    return new Promise((resolve, reject)=>{
        wholesaler.query("delete from wholesalers where wholesalerID = ?", [id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("Successfully Deleted");
                }else{
                    reject("Cant't find the entry with id : "+id);
                }
            }
        });
    }).then((result)=>{
        console.log("message is :"+result);
        return { "message" : result}
    }).catch((error)=>{
        console.log("error is :"+error);
        return { "error" : error }
    });
};