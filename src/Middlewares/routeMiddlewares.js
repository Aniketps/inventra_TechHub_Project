const jwt = require("jsonwebtoken");

exports.mainMiddleware = (req, res, next)=>{
    console.log("Main Middleware called");
    next();
}

exports.categoryMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}


exports.customerMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}


exports.productMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}


exports.retainStoreMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}

exports.saleMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}

exports.wholesalerMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}

exports.adminMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}

exports.stockMiddleware = (req, res, next)=>{
    const auth = req.headers["authorization"];
    if(!auth) return res.status(401).json({"error" : "TOKEN ISSUE", "message" : "Please check for header if added or not"});

    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.jwtSecret, (err)=>{
        if(err) return res.status(403).json({"error" : "TOKEN ISSUE", "message" : "Forbidden"});
        next();
    })
}