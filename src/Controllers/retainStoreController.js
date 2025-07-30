const retailStore = require("../Models/retainStoreModel");

exports.retailStoreInfo = async(req, res) => {
    try {
        const response = await retailStore.getStoreInfo();
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "massage": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "massage": "successfully fetched",
                    "data": response.massage,
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "massage": e });
    }
}

exports.updateRetailStore = async (req, res) => {
    if (!req.body.name || !req.body.location || !req.body.owner || !req.body.gstNum || !req.body.phone || !req.body.email || !req.body.webURL || !req.body.regNum || !req.body.hour) return res.status(400).json({ "error": "QUERY ISSUE", "massage": "Please provide all store information (name, location, owner, gstNum, phone, email ,webURL, regNum, hour)" });
    try {
        const response = await retailStore.updateStore(req.body.name, req.body.location, req.body.owner, req.body.gstNum, req.body.phone, req.body.email, req.body.webURL, req.body.regNum, req.body.hour);
        if ("error" in response) {
            res.status(512).json({ "error": "QUERY ISSUE", "massage": response.error });
        } else {
            res.status(200).json(
                {
                    "error": "NO ISSUE",
                    "massage": response.massage,
                }
            );
        }
    } catch (e) {
        console.log("Error is :" + e);
        res.status(502).json({ "error": "SERVER ISSUE", "massage": e });
    }
}