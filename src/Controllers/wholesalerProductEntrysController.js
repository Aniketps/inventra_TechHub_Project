const wholesalerProductEntryModel = require("../Models/wholesalerProductEntry");
const productStockModel = require("../Models/productStockModel")

exports.allWholesalerProductEntries = async (req, res) => {
    try {
        const response = req.query.s ? await wholesalerProductEntryModel.getAllWholesalerProductEntries(parseInt(req.query.s)) : await wholesalerProductEntryModel.getAllWholesalerProductEntries(10);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": "successfully fetched",
                    "data": response.message,
                    "totalEntries": Object.keys(response.message).length
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.addWholesalerProductEntry = async (req, res) => {
    if (!req.body.productID, !req.body.wholesalerID, !req.body.cost, !req.body.quantity) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data along with request" });
    try {
        const productID = req.body.productID;
        const wholesalerID = req.body.wholesalerID;
        const cost = req.body.cost;
        const quantity = req.body.quantity;
        if (!productID, !wholesalerID, !cost, !quantity) return res.status(104).json({ "error": "QUERY ISSUE", "message": "Insufficient data input" });

        let stockStock = await productStockModel.getStockByProductIDWholesalerID(productID, wholesalerID);
        if ("error" in stockStock) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": stockStock.error });
        } else {
            if (stockStock.message.length == 0) {
                let productAdding = await productStockModel.addStock(productID, quantity, parseInt(quantity)*parseInt(cost), cost * 1.3, wholesalerID);
                if ("error" in productAdding) {
                    res.status(512).json({ "error": "QUERY ISSUE", "message": productAdding.error });
                } else {
                    const isAdded = await wholesalerProductEntryModel.addWholesalerProductEntry(productID, wholesalerID, cost, quantity);
                    if ("error" in isAdded) {
                        res.status(512).json({ "error": "QUERY ISSUE", "message": isAdded.error });
                    } else {
                        res.status(201).json({ "error": "NO ISSUE", "message": isAdded.message });
                    }
                }
            }
            else {
                let newStock = parseInt(stockStock.message[0].stock) + parseInt(quantity);
                let total = newStock*parseInt(stockStock.message[0].sellingPrice);
                let isUpdated = await productStockModel.updateStockStockByID(stockStock.message[0].stockID, total , newStock);
                if ("error" in isUpdated) {
                    res.status(512).json({ "error": "QUERY ISSUE", "message": isUpdated.error });
                } else {
                    const isAdded = await wholesalerProductEntryModel.addWholesalerProductEntry(productID, wholesalerID, cost, quantity);
                    if ("error" in isAdded) {
                        await productStockModel.updateStockStockByID(stockStock.message[0].stockID, parseInt(stockStock.message[0].sellingPrice)*(parseInt(stockStock.message[0].stock) - parseInt(quantity)) , parseInt(stockStock.message[0].stock) - parseInt(quantity));
                        res.status(512).json({ "error": "QUERY ISSUE", "message": isAdded.error });
                    } else {
                        res.status(201).json({ "error": "NO ISSUE", "message": isAdded.message });
                    }
                }
            }
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.getWholesalerProductEntryByID = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await wholesalerProductEntryModel.getWholesalerProductEntryByID(req.params.id);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": "successfully fetched",
                    "data": response.message,
                    "totalEntries": response.message.length,
                    "isfound": response.message.length > 0 ? true : false
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.getWholesalerProductEntryBySearching = async (req, res) => {
    if (!req.params.p || !req.params.w || !req.params.d) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        let p = req.params.p.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.p;
        let w = req.params.w.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.w;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.d;
        const response = await wholesalerProductEntryModel.getWholesalerProductEntriesBySearching(p, w, d);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": "successfully fetched",
                    "data": response.message,
                    "totalEntries": response.message.length,
                    "isfound": response.message.length > 0 ? true : false
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.updateWholesalerProductEntryByID = async (req, res) => {
    if (!req.params.id || !req.body.productID || !req.body.wholesalerID || !req.body.quantity || !req.body.costPrice) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data and id" });
    try {
        const response = await wholesalerProductEntryModel.updateWholesalerProductEntryByID(req.params.id, req.body.productID, req.body.wholesalerID, req.body.quantity, req.body.costPrice);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": response.message,
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.deleteWholesalerProductEntryByID = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await wholesalerProductEntryModel.deleteWholesalerProductEntryByID(req.params.id);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": response.message,
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}