const wholesalerModel = require("../Models/wholecalersModel");
const wholesalerValidation = require("../Validations/wholesalersValidation");

exports.allWholesalers = async (req, res) => {
    try {
        const response = req.query.s ? await wholesalerModel.getAllWholesalers(parseInt(req.query.s)) : await wholesalerModel.getAllWholesalers(10);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "message": "successfully fetched",
                    "data": response.message,
                    "totalEntries": response.message.length
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.addWholesaler = async (req, res) => {
    if (!req.body.name, !req.body.address, !req.body.phone, !req.body.email) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data along with request" });
    try {
        const wholesalerName = req.body.name;
        const address = req.body.address;
        const phone = req.body.phone;
        const email = req.body.email;
        if (!wholesalerName, !address, !phone, !email) return res.status(104).json({ "error": "QUERY ISSUE", "message": "Insufficient data input" });
        if (!wholesalerValidation.emailValidation(email)) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Invalid Email" });
        if (!wholesalerValidation.phoneValidation(phone)) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Invalid Contact Number" });
        if (!wholesalerValidation.nameValidation(wholesalerName)) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Invalid Name" });
        const isAdded = await wholesalerModel.addWholesaler(wholesalerName, address, phone, email);
        if ("error" in isAdded) {
            res.status(512).json({ "error": "QUERY ISSUE", "message": isAdded.error });
        } else {
            res.status(201).json({ "error": "NO ISSUE", "message": isAdded.message });
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "message": e });
    }
}

exports.getWholesalerByID = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await wholesalerModel.getWholesalerByID(req.params.id);
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

exports.getWholesalersBySearching = async (req, res) => {
    if (!req.params.wn || !req.params.a || !req.params.d || !req.params.p || !req.params.e) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        let wn = req.params.wn.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.wn;
        let a = req.params.a.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.a;
        let d = req.params.d.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.d;
        let p = req.params.p.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.p;
        let e = req.params.e.charCodeAt(0) == '-'.charCodeAt(0) ? '' : req.params.e;
        const response = await wholesalerModel.getWholesalersBySeaching(wn, a, d, p, e);
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

exports.updateWholesalersByID = async (req, res) => {
    if (!req.params.id || !req.body.name || !req.body.address || !req.body.phone || !req.body.email) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide data and id" });
    try {
        const response = await wholesalerModel.updateWholesalerByID(req.params.id, req.body.name, req.body.address, req.body.phone, req.body.email);
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

exports.deleteWholesalersByID = async(req, res) => {
    if (!req.params.id) return res.status(400).json({ "error": "QUERY ISSUE", "message": "Please provide id along with request" });
    try {
        const response = await wholesalerModel.deleteWholesalerByID(req.params.id);
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