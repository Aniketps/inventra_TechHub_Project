exports.mainMiddleware = (req, res, next)=>{
    console.log("Main Middleware called");
    next();
}

exports.categoryMiddleware = (req, res, next)=>{
    console.log("Category Middleware called");
    next();
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