const wholesalerProductEntry = require("../Databases/mainDatabase");

exports.getAllWholesalerProductEntries = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        wholesalerProductEntry.query("select wpe.wholesalerProductID, p.productName, w.wholesalerName, wpe.entryDate, wpe.stock, wpe.costPrice, wpe.totalCost from wholesalerproductentry wpe inner join wholesalers w on wpe.wholesalerID=w.wholesalerID inner join products p on wpe.productID=p.productID", (err, result)=>{
            if(err){
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfWholesalerProductEntries = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfWholesalerProductEntries[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfWholesalerProductEntries[Object.keys(groupsOfWholesalerProductEntries).length+1] = group;
                }
                resolve(groupsOfWholesalerProductEntries);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getWholesalerProductEntryByID = (id)=>{
    return new Promise((resolve, reject)=>{
        wholesalerProductEntry.query("select wpe.wholesalerProductID, p.productName, w.wholesalerName, wpe.entryDate, wpe.stock, wpe.costPrice, wpe.totalCost from wholesalerproductentry wpe inner join wholesalers w on wpe.wholesalerID=w.wholesalerID inner join products p on wpe.productID=p.productID where wpe.wholesalerProductID = ?", [id], (err, result)=>{
            if(err){
                reject("failed get wholesalerProductEntry, please try later sometime...");
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

exports.getWholesalerProductEntriesBySearching = (productName, wholesalerName, date)=>{
    return new Promise((resolve, reject)=>{
        let ProductName = `%${productName}%`;
        let WholesalerName = `%${wholesalerName}%`;
        wholesalerProductEntry.query("select wpe.wholesalerProductID, p.productName, w.wholesalerName, wpe.entryDate, wpe.stock, wpe.costPrice, wpe.totalCost from wholesalerproductentry wpe inner join wholesalers w on wpe.wholesalerID=w.wholesalerID inner join products p on wpe.productID=p.productID where p.productName like ? and w.wholesalerName like ?", [ProductName, WholesalerName], (err, result)=>{
            if(err){
                reject("failed get wholesalerProductEntries, please try later sometime...");
            }else{
                let data = result.filter( row => date == ''? true : row.entryDate.toISOString().split("T")[0] == date).map( row => (
                    {
                        ...row,
                        entryDate : row.entryDate.toISOString().split("T")[0]
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

exports.addWholesalerProductEntry = (productID, wholesalerID, cost, quantity)=>{
    return new Promise((resolve, reject)=>{
            wholesalerProductEntry.query("insert into wholesalerproductentry values ('0', ?, ?, current_date, ?, ?, ?)", [productID, wholesalerID, quantity, cost, parseInt(quantity)*parseInt(cost)], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Product or Wholesaler does not exists");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Recorded Successfully");
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

exports.updateWholesalerProductEntryByID = (id, productID, wholesalerID, quantity, costPrice)=>{
    return new Promise((resolve, reject)=>{
        wholesalerProductEntry.query("update wholesalerproductentry set productID = ?, wholesalerID = ?, stock = ?, costPrice = ?, totalCost = ? where wholesalerProductID = ?", [productID, wholesalerID, quantity, costPrice, parseInt(quantity)*parseInt(costPrice), id], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Wholesaler or Product does not exists");
                }else{
                    reject(err.sqlMessage);
                }
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

exports.deleteWholesalerProductEntryByID = (id)=>{
    return new Promise((resolve, reject)=>{
        wholesalerProductEntry.query("delete from wholesalerproductentry where wholesalerProductID = ?", [id], (err, result)=>{
            if(err){
                reject(err.sqlMassage);
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