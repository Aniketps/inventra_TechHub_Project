const stock = require("../Databases/mainDatabase");

exports.getAllStocks = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID;", (err, result)=>{
            if(err){
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfStocks = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfStocks[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfStocks[Object.keys(groupsOfStocks).length+1] = group;
                }
                resolve(groupsOfStocks);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getStockByID = (id)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select * from productstocks where stockID = ?", [id], (err, result)=>{
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

exports.getStockByProductIDWholesalerID = (p, w)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select * from productstocks where productID = ? and wholesalerID = ?", [p,w], (err, result)=>{
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

exports.addStock = (...data)=>{
    return new Promise((resolve, reject)=>{
        stock.query("insert into productstocks values ('0', ?, ?, ?, ?, ?)", [...data], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Product or wholesaler dont exists");
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

exports.getStockByStock = (s)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID where s.stock = ?", [s], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
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

exports.getStockByTotalCost = (tc)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID where s.totalCost = ?", [tc], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
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

exports.getStockByPrice = (price)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID where s.sellingPrice = ?", [price], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
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

exports.getStockByWholesalerName = (name)=>{
    return new Promise((resolve, reject)=>{
        let Name = `%${name}%`;
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID where w.wholesalerName like ?", [Name], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
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

exports.getStockByWholesalerID = (id)=>{
    return new Promise((resolve, reject)=>{
        stock.query("select s.stockID, p.productName, s.stock, w.wholesalerName, s.totalCost, s.sellingPrice from productstocks s inner join products p on s.productID=p.productID inner join wholesalers w on w.wholesalerID = s.wholesalerID where w.wholesalerID = ?", [id], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
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

exports.updateStockByID = (id, productID, s, totalCost, sellingPrice, wholesalerID)=>{
    return new Promise((resolve, reject)=>{
        stock.query("update productstocks set productID = ?, stock = ?, totalCost = ?, wholesalerID = ?, sellingPrice = ? where stockID = ?", [productID, s, totalCost, wholesalerID, sellingPrice, id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("Updated Successfully");
                }else{
                    if(result.info.charAt(result.info.indexOf(":")+2) == 0){
                        reject("Could not find matching entry");
                    }else{
                        reject("Unknown Error");
                    }
                }
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.deleteStockByID = (id)=>{
    return new Promise((resolve, reject)=>{
        stock.query(" delete from productstocks where stockID = ?", [id], (err, result)=>{
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

exports.updateStockStockByID = (id,t, s)=>{
    return new Promise((resolve, reject)=>{
        stock.query("update productstocks set stock = ?, totalCost = ? where stockID = ?", [s, t, id], (err, result)=>{
            if(err){
                reject(err.sqlMessage);
            }else{
                if(result.affectedRows>0){
                    resolve("Updated Successfully");
                }else{
                    if(result.info.charAt(result.info.indexOf(":")+2) == 0){
                        reject("Could not find matching entry");
                    }else{
                        reject("Unknown Error");
                    }
                }
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};