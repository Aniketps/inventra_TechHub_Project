const product = require("../Databases/mainDatabase");

exports.getAllProducts = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        product.query("select p.productID, p.productName, p.createdDate as productCreatedDate, pc.categoryName, pc.createdDate as categoryCreatedDate from products p inner join productcategory pc on p.categoryID=pc.categoryID", (err, result)=>{
            if(err){
                // reject(err);
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfProducts = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfProducts[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfProducts[Object.keys(groupsOfProducts).length+1] = group;
                }
                resolve(groupsOfProducts);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getProductByID = (id)=>{
    return new Promise((resolve, reject)=>{
        product.query("select * from products where productID=?;", [id], (err, result)=>{
            if(err){
                reject("failed get product, please try later sometime...");
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

exports.getProductsBySearching = (name, date, category)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        let Date = `%${date}%`;
        let Category = `%${category}%`;
        product.query("select * from (select p.productID, p.productName, p.createdDate as productCreatedDate, pc.categoryName, pc.createdDate as categoryCreatedDate from products p inner join productcategory pc on p.categoryID=pc.categoryID) pp where productName like ? and productCreatedDate like ? and categoryName like ?", [Name, Date, Category], (err, result)=>{
            if(err){
                console.log(err);
                reject("failed get products, please try later sometime...");
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

exports.addProduct = (name, ID)=>{
    return new Promise((resolve, reject)=>{
        product.query("insert into products values ('0', ?, current_Date, ?)", [name, ID], (err, result)=>{
            if(err){
                // reject(err);
                if(err.code == "ER_DUP_ENTRY"){
                    reject(name+" is duplicate entry");
                }else{
                    reject(err.sqlMassage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("New Product Added");
                }else{
                    reject("Unknown Error, Please contact to developer...");
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

exports.updateProductByID = (id, name, categoryID)=>{
    return new Promise((resolve, reject)=>{
        product.query("update products set productName = ?, categoryID = ? where productID = ?", [name, categoryID, id], (err, result)=>{
            if(err){
                if(err.code == "ER_DUP_ENTRY"){
                    reject(name+" is duplicate entry");
                }else{
                    reject(err.sqlMassage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Successfully updated");
                }else{
                    reject("field with id "+id+" does not exists");
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

exports.deleteProductByID = (id)=>{
    return new Promise((resolve, reject)=>{
        product.query("delete from products where productID = ?", [id], (err, result)=>{
            if(err){
                reject(err.sqlMassage);
            }else{
                if(result.affectedRows>0){
                    resolve("Successfully deleted");
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