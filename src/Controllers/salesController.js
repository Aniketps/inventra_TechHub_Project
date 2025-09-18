const saleModel = require("../Models/salesModel");
const productStockModel = require("../Models/productStockModel")
const sendMail = require("../Services/emailService");

exports.allSales = async (req, res) => {
    try {
        const response = req.query.s ? await saleModel.getAllSales(parseInt(req.query.s)) : await saleModel.getAllSales(10);
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

exports.addSale = async (req, res) => {
    if (!req.body.stockID, !req.body.purchaseDate, !req.body.quantity, !req.body.discount, !req.body.tax, !req.body.customerID, !req.body.emailTo, !req.body.file) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data along with request" });
    try {
        const stockID = req.body.stockID;
        const quantity = req.body.quantity;
        const discount = req.body.discount;
        const tax = req.body.tax;
        const customerID = req.body.customerID;
        const emailTo = req.body.emailTo;
        const file = req.body.file;
        const html = req.body.html;
        const subject = req.body.subject;
        if (!stockID, !quantity, !discount, !tax, !customerID) return res.status(104).json({ "error": "QUERY ISSUE", "message": "Insufficient data input" });

        let stockStock = await productStockModel.getStockByID(stockID);
        if ("error" in stockStock) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": stockStock.error });
        } else {
            if (stockStock.message.length == 0) {
                res.status(422).json({ "error": "QUERY ISSUE", "message": "Insufficient Stock" });
            }
            else {
                if (stockStock.message[0].stock >= quantity) {
                    let newStock = parseInt(stockStock.message[0].stock) - parseInt(quantity);
                    let total = newStock * parseInt(stockStock.message[0].sellingPrice);
                    let isUpdated = await productStockModel.updateStockStockByID(stockID, total, newStock);
                    if ("error" in isUpdated) {
                        res.status(512).json({ "error": "QUERY ISSUE", "message": isUpdated.error });
                    } else {
                        const isAdded = await saleModel.addSale(stockID, quantity, discount, tax, ((parseInt(quantity) * parseInt(stockStock.message[0].sellingPrice)) - parseInt(discount) + parseInt(tax)), customerID);
                        if ("error" in isAdded) {
                            await productStockModel.updateStockStockByID(stockID, total, newStock);
                            res.status(512).json({ "error": "QUERY ISSUE", "message": isAdded.error });
                        } else {
                            await sendMail(emailTo, subject, html, [
                                {
                                    filename: `invoice_${Date.now()}.pdf`,
                                    content: file,
                                    encoding: "base64"
                                }
                            ]);
                            res.status(201).json({ "error": "NO ISSUE", "message": isAdded.message });
                        }
                    }
                } else {
                    res.status(409).json({ "error": "NO ISSUE", "message": "Insufficient Stock" });
                }
            }
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.getSaleByID = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await saleModel.getSaleByID(req.params.id);
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

exports.getSaleBySearching = async (req, res) => {
    if (!req.params.cn || !req.params.pd || !req.params.pn || !req.params.pc || !req.params.w) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        let cn = req.params.cn.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.cn;
        let pd = req.params.pd.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.pd;
        let pn = req.params.pn.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.pn;
        let pc = req.params.pc.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.pc;
        let w = req.params.w.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.w;
        const response = await saleModel.getSalesBySearching(cn, pd, pn, pc, w);
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

exports.updateSaleByID = async (req, res) => {
    if (!req.params.id || !req.body.stockID || !req.body.quantity || !req.body.discount || !req.body.tax || !req.body.customerID) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data and id" });
    try {
        let id = req.params.id;
        let stockID = req.body.stockID;
        let quantity = req.body.quantity;
        let discount = req.body.discount;
        let tax = req.body.tax;
        let customerID = req.body.customerID;
        let stockStock = await productStockModel.getStockByID(stockID);
        if ("error" in stockStock) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": stockStock.error });
        } else {
            if (stockStock.message.length == 0) {
                res.status(422).json({ "error": "QUERY ISSUE", "message": "Insufficient Stock" });
            }
            else {
                let totalBill = (parseInt(quantity) * parseInt(stockStock.message[0].sellingPrice)) - parseInt(discount) + parseInt(tax);
                const response = await saleModel.updateSaleByID(id, stockID, quantity, discount, tax, totalBill, customerID);
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
            }
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.deleteSaleByID = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await saleModel.deleteSaleByID(req.params.id);
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