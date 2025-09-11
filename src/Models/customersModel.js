const customer = require("../Databases/mainDatabase");

exports.getAllCustomers = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        customer.query("select * from customers;", (err, result)=>{
            if(err){
                // reject(err);
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfCustomers = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfCustomers[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfCustomers[Object.keys(groupsOfCustomers).length+1] = group;
                }
                resolve(groupsOfCustomers);
            }
        });
    }).then((result)=>{
        return { "message" : result}
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
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getCustomersBySearching = (name, date, address, email, phone)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        let Phone = `%${phone}%`;
        let Email = `%${email}%`;
        let Address = `%${address}%`;
        let myQuery = "select customerID, customerName, email, phone, address, DATE_FORMAT(registeredDate, '%Y-%m-%d') AS registeredDate from customers where customerName like ? and email like ? and phone like ? and address like ?";
        let myValues = [Name, Email, Phone, Address];
        customer.query(myQuery, myValues, (err, result)=>{
            if(err){
                reject("failed get customers, please try later sometime...");
            }else{
                let data = result.filter(row => date == ''
                    ? true 
                    : row.registeredDate == date).map(row=>(
                        {
                            ...row,
                            registeredDate : row.registeredDate
                        }
                    )
                );
                let groupsOfCustomers = {};
                let group = [];
                data.forEach((item, index)=>{
                    if(index%10 == 10-1){
                        group.push(item);
                        groupsOfCustomers[(index+1)/10] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfCustomers[Object.keys(groupsOfCustomers).length+1] = group;
                }
                resolve(groupsOfCustomers);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.addCustomer = (name, email, phone, address)=>{
    return new Promise((resolve, reject)=>{
        customer.query("insert into customers values ('0', ?, ?, ?, ?, current_Date)", [name, email, phone, address], (err, result)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    reject("Customer already exists");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("success");
                }else{
                    reject("unknown");
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
        console.log("message is :"+result);
        return { "message" : result}
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
        console.log("message is :"+result);
        return { "message" : result}
    }).catch((error)=>{
        console.log("error is :"+error);
        return { "error" : error }
    });
};