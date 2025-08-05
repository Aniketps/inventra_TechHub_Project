const express = require("express");
const retailStoreRoute = express.Router();
const retailStore = require("../Controllers/retainStoreController");

retailStoreRoute.get("/", retailStore.retailStoreInfo);
retailStoreRoute.put("/", retailStore.updateRetailStore);

module.exports = retailStoreRoute;
