const jwt = require("jsonwebtoken");

exports.mainMiddleware = (req, res, next)=>{
    console.log("Main Middleware called");
    next();
}

exports.categoryMiddleware = (req, res, next)=>{
    // const t = jwt.sign({"name" : "Aniket"}, process.env.jwtSecret, {expiresIn : '2h'});
    // console.log(t);
    console.log("Category Middleware called");
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "massage" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "massage" : "Forbidden"});
        next();
    })
}


exports.customerMiddleware = (req, res, next)=>{
    console.log("Customer Middleware called");
    next();
}


exports.productMiddleware = (req, res, next)=>{
    console.log("Product Middleware called");
    next();
}


exports.retainStoreMiddleware = (req, res, next)=>{
    console.log("Retail Store Middleware called");
    next();
}

exports.saleMiddleware = (req, res, next)=>{
    console.log("Sales Middleware called");
    next();
}

exports.wholesalerMiddleware = (req, res, next)=>{
    console.log("Wholesaler Middleware called");
    next();
}

exports.adminMiddleware = (req, res, next)=>{
    console.log("Admin Middleware called");
    next();
}