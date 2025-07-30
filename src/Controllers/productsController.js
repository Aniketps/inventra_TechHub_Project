const productModel = require("../Models/productsModel.js");

exports.allProducts = async(req, res) => {
    const sliceCount = req.query.s;
    try {
        // Default slices are 5
        const response = sliceCount ? await productModel.getAllProducts(parseInt(sliceCount)) : await productModel.getAllProducts(5);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "massage": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "massage": "successfully fetched",
                    "data": response.massage,
                    "totalEntries": response.massage.length
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "massage": e });
    }
}

exports.addProduct = async(req, res)=>{
    if(!req.body.name || !req.body.categoryID) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide data along with request"});
    try{
        const name = req.body.name;
        const categoryID = req.body.categoryID;
        if(!name && !categoryID) return res.status(104).json({"error" : "QUERY ISSUE", "massage" : "Insufficient data input"});
        const isAdded = await productModel.addProduct(name, categoryID);
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

exports.getProductByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    console.log(typeof(req.params.id));
    try{
        const response = await productModel.getProductByID(req.params.id);
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

exports.getProductsBySearching = async(req, res)=>{
    if(!req.params.n || !req.params.d || !req.params.c) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide data along with request"});
    try{
        let n = req.params.n.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.n;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.d;
        let c = req.params.c.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.c;
        const response = await productModel.getProductsBySearching(n, d, c);
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

exports.updateProductByID = async(req, res)=>{
    if(!req.params.id || !req.body.name || !req.body.categoryID) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id, name and categoryID along with request"});
    try{
        const response = await productModel.updateProductByID(req.params.id, req.body.name, req.body.categoryID);
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

exports.deleteProductByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        const response = await productModel.deleteProductByID(req.params.id);
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