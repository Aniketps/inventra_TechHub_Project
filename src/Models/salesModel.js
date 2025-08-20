const sale = require("../Databases/mainDatabase");

exports.getAllSales = (itemCount)=>{
    return new Promise((resolve, reject)=>{
        sale.query("select s.saleID, s.stockID, c.customerName, c.phone, s.purchaseDate, p.productName, cc.categoryName, w.wholesalerName, s.quantity, s.discount, s.tax, s.totalBill from sales s inner join productstocks ps on ps.stockID=s.stockID inner join customers c on c.customerID=s.customerID inner join products p on p.productID=ps.productID inner join productcategory cc on cc.categoryID=p.categoryID inner join wholesalers w on w.wholesalerID=ps.wholesalerID", (err, result)=>{
            if(err){
                reject("failed to fetch, please try later sometime...");
            }else{
                let groupsOfSales = {};
                let group = [];
                result.forEach((item, index)=>{
                    if(index%itemCount == itemCount-1){
                        group.push(item);
                        groupsOfSales[(index+1)/itemCount] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfSales[Object.keys(groupsOfSales).length+1] = group;
                }
                resolve(groupsOfSales);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.getSaleByID = (id)=>{
    return new Promise((resolve, reject)=>{
        sale.query("select * from (select s.saleID, s.stockID, c.customerName, c.phone, s.purchaseDate, p.productName, cc.categoryName, w.wholesalerName, s.quantity, s.discount, s.tax, s.totalBill from sales s inner join productstocks ps on ps.stockID=s.stockID inner join customers c on c.customerID=s.customerID inner join products p on p.productID=ps.productID inner join productcategory cc on cc.categoryID=p.categoryID inner join wholesalers w on w.wholesalerID=ps.wholesalerID) ss where saleID = ?;", [id], (err, result)=>{
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

exports.getSalesBySearching = (customerName, date, productName, productCategory, wholesalerName)=>{
    return new Promise((resolve, reject)=>{
        let CustomerName = `%${customerName}%`;
        let ProductName = `%${productName}%`;
        let ProductCategory = `%${productCategory}%`;
        let WholesalerName = `%${wholesalerName}%`;
        sale.query("select * from (select s.stockID, s.saleID, c.customerName, c.phone, s.purchaseDate, p.productName, cc.categoryName, w.wholesalerName, s.quantity, s.discount, s.tax, s.totalBill from sales s inner join productstocks ps on ps.stockID=s.stockID inner join customers c on c.customerID=s.customerID inner join products p on p.productID=ps.productID inner join productcategory cc on cc.categoryID=p.categoryID inner join wholesalers w on w.wholesalerID=ps.wholesalerID) ss where customerName like ? and productName like ? and categoryName like ? and wholesalerName like ?", [CustomerName, ProductName, ProductCategory, WholesalerName], (err, result)=>{
            if(err){
                reject("failed get sales, please try later sometime...");
            }else{
                let groupsOfSalers = {};
                let group = [];
                let data = result.filter(row => date == ''? true : row.purchaseDate.toISOString().split("T")[0] == date).map(row =>(
                    {
                        ...row,
                        purchaseDate : row.purchaseDate.toISOString().split("T")[0]
                    }
                ));
                data.forEach((item, index)=>{
                    if(index%10 == 10-1){
                        group.push(item);
                        groupsOfSalers[(index+1)/10] = group;
                        group = [];
                    }else{
                        group.push(item);
                    }
                });
                if(group.length != 0){
                    groupsOfSalers[Object.keys(groupsOfSalers).length+1] = group;
                }
                resolve(groupsOfSalers);
            }
        });
    }).then((result)=>{
        return { "message" : result}
    }).catch((error)=>{
        return { "error" : error }
    });
};

exports.addSale = (stockID, quantity, discount, tax, totalBill, customerID)=>{
    return new Promise((resolve, reject)=>{
        sale.query("insert into sales values ('0', ?, current_Date, ?, ?, ?, ?, ?)", [stockID, quantity, discount, tax, totalBill, customerID], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Customer or Product in stock dont exists");
                }else{
                    reject(err.sqlMessage);
                }
            }else{
                if(result.affectedRows>0){
                    resolve("Purchase Successful");
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

exports.updateSaleByID = (saleID, stockID, quantity, discount, tax, totalBill, customerID)=>{
    return new Promise((resolve, reject)=>{
        sale.query("update sales set stockID = ?, quantity = ?, discount = ?, tax = ?, totalBill = ?, customerID = ? where saleID = ?", [stockID, quantity, discount, tax, totalBill, customerID, saleID], (err, result)=>{
            if(err){
                if(err.code == "ER_NO_REFERENCED_ROW_2"){
                    reject("Product in stock or customer dont exists");
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

exports.deleteSaleByID = (id)=>{
    return new Promise((resolve, reject)=>{
        sale.query("delete from sales where saleID = ?", [id], (err, result)=>{
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