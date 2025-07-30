const customer = require("../Databases/mainDatabase");

exports.getAllCustomers = ()=>{
    return new Promise((resolve, reject)=>{
        customer.query("select * from customers;", (err, result)=>{
            if(err){
                // reject(err);
                reject("failed to fetch, please try later sometime...");
            }else{
                resolve(result);
            }
        });
    }).then((result)=>{
        return { "massage" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getCustomerByID = (id)=>{
    return new Promise((resolve, reject)=>{
        customer.query("select * from customers where customerID=?;", [id], (err, result)=>{
            if(err){
                reject("failed to get customer, please try later sometime...");
            }else{
                resolve(result);
            }
        });
    }).then((result)=>{
        return { "massage" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getCustomersBySearching = (name, date, address, email, phone)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        let Date = `%${date}%`;
        let Phone = `%${phone}%`;
        let Email = `%${email}%`;
        let Address = `%${address}%`;
        customer.query("select * from customers where customerName like ? and registeredDate like ? and email like ? and phone like ? and address like ?;", [Name, Date, Email, Phone, Address], (err, result)=>{
            if(err){
                reject("failed get customers, please try later sometime...");
            }else{
                resolve(result);
            }
        });
    }).then((result)=>{
        return { "massage" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.addCustomer = (name, email, phone, address)=>{
    return new Promise((resolve, reject)=>{
        customer.query("insert into customers values ('0', ?, ?, ?, ?, current_Date)", [name, email, phone, address], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("success");
                }else{
                    reject("unknown");
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

exports.updateCustomerByID = (id, name, email, phone, address)=>{
    return new Promise((resolve, reject)=>{
        customer.query("update customers set customerName = ?, email = ?, phone = ?, address = ? where customerID = ?", [name, email, phone, address, id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("successfully updated");
                }else{
                    reject("field with id "+id+" does not exists");
                }
                console.log(result);
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

exports.deleteCustomerByID = (id)=>{
    return new Promise((resolve, reject)=>{
        customer.query("delete from customers where customerID = ?", [id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("successfully deleted");
                }else{
                    reject("Cant't find the entry with id : "+id);
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