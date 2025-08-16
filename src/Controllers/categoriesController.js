const categoryModel = require("../Models/categoriesModel");


exports.allCategories = async(req, res)=>{
    const sliceCount = req.query.s;
    try{
        // Default slices are 5
        const response = sliceCount? await categoryModel.getAllCategories(parseInt(sliceCount)) : await categoryModel.getAllCategories(10);
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

exports.addCategory = async(req, res)=>{
    if(!req.body.name) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide data along with request"});
    try{
        const name = req.body.name;
        if(!name) return res.status(104).json({"error" : "QUERY ISSUE", "message" : "Insufficient data input"});
        const isAdded = await categoryModel.addCategory(name);
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

exports.getCatergoryByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    console.log(typeof(req.params.id));
    try{
        const response = await categoryModel.getCatergoryByID(req.params.id);
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

exports.getCategoriesBySearching = async(req, res)=>{
    if(!req.params.n || !req.params.d) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        let n = req.params.n.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.n;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.d;
        const response = await categoryModel.getCategoriesBySearching(n, d);
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

exports.updateCategoryByID = async(req, res)=>{
    if(!req.params.id || !req.body.name) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id and name along with request"});
    try{
        const response = await categoryModel.updateCategoryByID(req.params.id, req.body.name);
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

exports.deleteCategoryByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        const response = await categoryModel.deleteCategoryByID(req.params.id);
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