const stockModel = require("../Models/productStockModel");

exports.allStocks = async(req, res)=>{
    try{
        const response = req.query.s? await stockModel.getAllStocks(parseInt(req.query.s)) : await stockModel.getAllStocks(10);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : Object.keys(response.message).length
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.addStock = async(req, res)=>{
    if(!req.body.productID, !req.body.stock, !req.body.totalCost, !req.body.sellingPrice, !req.body.wholesalerID) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide data along with request"});
    try{
        const productID = req.body.productID;
        const stock = req.body.stock;
        const totalCost = req.body.totalCost;
        const sellingPrice = req.body.sellingPrice;
        const wholesalerID = req.body.wholesalerID;
        console.log(productID);
        if(!productID, !stock, !totalCost, !sellingPrice, !wholesalerID) return res.status(104).json({"error" : "QUERY ISSUE", "message" : "Insufficient data input"});
        const isAdded = await stockModel.addStock(productID, stock, totalCost, sellingPrice, wholesalerID);
        if("error" in isAdded){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : isAdded.error});
        }else{
            res.status(201).json({"error" : "NO ISSUE", "message" : isAdded.message});
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        const response = await stockModel.getStockByID(req.params.id);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockByStock = async(req, res)=>{
    if(!req.query.s) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide stock amount along with request"});
    try{
        let s = req.query.s;
        console.log("Raw query param:", s);
        console.log("Parsed stock value:", parseInt(s));
        const response = await stockModel.getStockByStock(parseInt(s));
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockByTotalCost = async(req, res)=>{
    if(!req.query.tc) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide total cost along with request"});
    try{
        let tc = req.query.tc;
        const response = await stockModel.getStockByTotalCost(tc);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockByPrice = async(req, res)=>{
    if(!req.query.p) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide price along with request"});
    try{
        let p = req.query.p;
        const response = await stockModel.getStockByPrice(p);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockBySearching = async(req, res)=>{
    if(!req.params.w || !req.params.p){
        if(req.query.i){
            return this.getStockByWholesalerID(req, res);
        }else{
            return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide name along with request"})
        }
    };
    try{
        let w = req.params.w === '-'? '' : req.params.w;
        let p = req.params.p === '-'? '' : req.params.p;
        const response = await stockModel.getStockBySearching(w, p);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.getStockByWholesalerID = async(req, res)=>{
    if(!req.query.i) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide wholesaler id along with request"});
    try{
        let i = req.query.i;
        const response = await stockModel.getStockByWholesalerID(parseInt(i));
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries" : response.message.length,
                    "isfound" : response.message.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.updateStockByID = async(req, res)=>{
    if(!req.params.id || !req.body.productID || !req.body.stock || !req.body.sellingPrice || !req.body.wholesalerID) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide data and id"});
    try{
        let totalCost = parseInt(req.body.stock) * parseInt(req.body.sellingPrice);
        const response = await stockModel.updateStockByID(req.params.id, req.body.productID, req.body.stock, totalCost, req.body.sellingPrice, req.body.wholesalerID);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : response.message, 
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.deleteStockByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        const response = await stockModel.deleteStockByID(req.params.id);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : response.message, 
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}