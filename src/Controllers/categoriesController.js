const categoryModel = require("../Models/categoriesModel");


exports.allCategories = async(req, res)=>{
    const sliceCount = req.query.s;
    try{
        // Default slices are 5
        const response = sliceCount? await categoryModel.getAllCategories(parseInt(sliceCount)) : await categoryModel.getAllCategories(5);
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

exports.addCategory = async(req, res)=>{
    if(!req.body.name) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide data along with request"});
    try{
        const name = req.body.name;
        if(!name) return res.status(104).json({"error" : "QUERY ISSUE", "massage" : "Insufficient data input"});
        const isAdded = await categoryModel.addCategory(name);
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

exports.getCatergoryByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    console.log(typeof(req.params.id));
    try{
        const response = await categoryModel.getCatergoryByID(req.params.id);
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

exports.getCategoriesBySearching = async(req, res)=>{
    if(!req.params.n || !req.params.d) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        let n = req.params.n.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.n;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.d;
        const response = await categoryModel.getCategoriesBySearching(n, d);
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

exports.updateCategoryByID = async(req, res)=>{
    if(!req.params.id || !req.body.name) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id and name along with request"});
    try{
        const response = await categoryModel.updateCategoryByID(req.params.id, req.body.name);
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

exports.deleteCategoryByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "massage" : "Please provide id along with request"});
    try{
        const response = await categoryModel.deleteCategoryByID(req.params.id);
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