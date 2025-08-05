const customerModel = require("../Models/customersModel");

exports.allCustomers = async(req, res)=>{
    const sliceCount = req.query.s;
    try{
        const response = sliceCount? await customerModel.getAllCustomers(parseInt(sliceCount)) : await customerModel.getAllCustomers(10);
        if("error" in response){
            res.status(512).json({"error" : "QUERY ISSUE", "message" : response.error});
        }else{
            res.status(200).json(
                {
                    "error" : "NO ISSUE", 
                    "message" : "successfully fetched", 
                    "data" : response.message, 
                    "totalEntries": Object.keys(response.message).length
                }
            );
        }
    }catch(e){
        console.log("Error is :"+e);
        res.status(502).json({"error" : "SERVER ISSUE", "message" : e});
    }
}

exports.addCustomer = async(req, res)=>{
    if(!req.body.name || !req.body.email || !req.body.phone || !req.body.address) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide data along with request"});
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        if(!name) return res.status(104).json({"error" : "QUERY ISSUE", "message" : "Insufficient data input"});
        const isAdded = await customerModel.addCustomer(name, email, phone, address);
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

exports.getCustomerByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        const response = await customerModel.getCustomerByID(req.params.id);
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

exports.getCustomersBySearching = async(req, res)=>{
    if(!req.params.n || !req.params.d || !req.params.a || !req.params.e || !req.params.p) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        let n = req.params.n.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.n;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.d;
        let a = req.params.a.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.a;
        let e = req.params.e.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.e;
        let p = req.params.p.charCodeAt(0) == '-'.charCodeAt(0)? '' : req.params.p;
        const response = await customerModel.getCustomersBySearching(n, d, a, e, p);
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

exports.updateCustomerByID = async(req, res)=>{
    if(!req.params.id || !req.body.name || !req.body.email || !req.body.phone || !req.body.address) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide data and id"});
    try{
        const response = await customerModel.updateCustomerByID(req.params.id, req.body.name, req.body.email, req.body.phone, req.body.address);
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

exports.deleteCustomerByID = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({"error" : "QUERY ISSUE", "message" : "Please provide id along with request"});
    try{
        const response = await customerModel.deleteCustomerByID(req.params.id);
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