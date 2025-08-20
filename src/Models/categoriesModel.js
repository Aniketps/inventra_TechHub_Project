const category = require("../Databases/mainDatabase");

exports.getAllCategories = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        category.query("select * from productcategory;", (err, result)=>{
            if(err){
                // reject(err);
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfCategories = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfCategories[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfCategories[Object.keys(groupsOfCategories).length+1] = group;
                }
                resolve(groupsOfCategories);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getCatergoryByID = (id)=>{
    return new Promise((resolve, reject)=>{
        category.query("select * from productcategory where categoryID=?;", [id], (err, result)=>{
            if(err){
                reject("failed get category, please try later sometime...");
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

exports.getCategoriesBySearching = (name, date)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        let myQuery = "select * from productcategory where categoryName like ?";
        let myValues = [Name];
        category.query(myQuery, myValues, (err, result)=>{
            if(err){
                console.log(err);
                reject("failed get categories, please try later sometime...");
            }else{
                let groupsOfCategories = {};
                let group = [];
                let data = result.filter(row => date == ''? true : row.createdDate.toISOString().split("T")[0] == date).map(row =>(
                    {
                        ...row,
                        createdDate : row.createdDate.toISOString().split("T")[0]
                    }
                ));
                data.forEach((item, index)=>{
                    if(index%10 == 10-1){
                        group.push(item);
                        groupsOfCategories[(index+1)/10] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfCategories[Object.keys(groupsOfCategories).length+1] = group;
                }
                resolve(groupsOfCategories);
            }
        });
        
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.addCategory = (name)=>{
    return new Promise((resolve, reject)=>{
        category.query("insert into productcategory values ('0', ?, current_Date)", [name], (err, result)=>{
            if(err){
                // reject(err);
                if(err.code == "ER_DUP_ENTRY"){
                    reject(name+" is already present.");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Successfully Added");
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

exports.updateCategoryByID = (id, name)=>{
    return new Promise((resolve, reject)=>{
        category.query("update productcategory set categoryName = ? where categoryID = ?", [name, id], (err, result)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    reject(name+" is already present.");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Succenfully Updated");
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

exports.deleteCategoryByID = (id)=>{
    return new Promise((resolve, reject)=>{
        category.query("delete from productcategory where categoryID = ?", [id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("success deleted");
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