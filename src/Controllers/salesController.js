const saleModel = require("../Models/salesModel");

exports.allSales = async(req, res)=>{
    try{
        const response = req.query.s? await saleModel.getAllSales(parseInt(req.query.s)) : await saleModel.getAllSales(10);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "massage" : "successfully fetched", 
                    "data" : response.massage, 
                    "totalEntries" : response.massage.length
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}

exports.addSale = async(req, res)=>{
    if(!req.body.stockID, !req.body.purchaseDate, !req.body.quantity, !req.body.discount, !req.body.tax, !req.body.totalBill, !req.body.customerID) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide data along with request"});
    try{
        const stockID = req.body.stockID;
        const quantity = req.body.quantity;
        const discount = req.body.discount;
        const tax = req.body.tax;
        const totalBill = req.body.totalBill;
        const customerID = req.body.customerID;
        if(!stockID, !quantity, !discount, !tax, !totalBill, !customerID) return res.status(104).json({"error" : "QUERY ISSUE", "massage" : "Insufficient data input"});
        const isAdded = await saleModel.addSale(stockID, quantity, discount, tax, totalBill, customerID);
        if("error" in isAdded){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : isAdded.error});
        }else{
            res.status(201).json({"error" : "NO ISSUE", "massage" : isAdded.massage});
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}

exports.getSaleByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        const response = await saleModel.getSaleByID(req.params.id);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "massage" : "successfully fetched", 
                    "data" : response.massage, 
                    "totalEntries" : response.massage.length,
                    "isfound" : response.massage.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}

exports.getSaleBySearching = async(req, res)=>{
    if(!req.params.cn || !req.params.pd || !req.params.pn || !req.params.pc || !req.params.w) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        let cn = req.params.cn.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.cn;
        let pd = req.params.pd.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.pd;
        let pn = req.params.pn.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.pn;
        let pc = req.params.pc.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.pc;
        let w = req.params.w.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.w;
        const response = await saleModel.getSalesBySearching(cn, pd, pn, pc, w);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "massage" : "successfully fetched", 
                    "data" : response.massage, 
                    "totalEntries" : response.massage.length,
                    "isfound" : response.massage.length>0? true : false
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}

exports.updateSaleByID = async(req, res)=>{
    if(!req.params.id || !req.body.stockID || !req.body.quantity || !req.body.discount || !req.body.tax || !req.body.totalBill || !req.body.customerID) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide data and id"});
    try{
        const response = await saleModel.updateSaleByID(req.params.id, req.body.stockID, req.body.quantity, req.body.discount, req.body.tax, req.body.totalBill, req.body.customerID);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "massage" : response.massage, 
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}

exports.deleteSaleByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        const response = await saleModel.deleteSaleByID(req.params.id);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "massage" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "massage" : response.massage, 
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "massage" : e});
    }
}