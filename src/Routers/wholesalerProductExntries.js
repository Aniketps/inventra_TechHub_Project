const express = require("express");
const wholesalerProductEntrysRoute = express.Router();
const wholesalerProductEntry = require("../Controllers/wholesalerProductEntrysController.js");

wholesalerProductEntrysRoute.get("/", wholesalerProductEntry.allWholesalerProductEntries);

wholesalerProductEntrysRoute.post("/new", wholesalerProductEntry.addWholesalerProductEntry);
wholesalerProductEntrysRoute.get("/:id", wholesalerProductEntry.getWholesalerProductEntryByID);

// example : 
// Search just by customer wholesaler name : http://localhost:3000/wholesalerProductEntrys/ani/-/-
// Search just by product name : http://localhost:3000/wholesalerProductEntrys/-/Peter/-
// Search just by record date : http://localhost:3000/wholesalerProductEntrys/-/-/2025-08-03
// Search by all : http://localhost:3000/wholesalerProductEntrys/ani/Peter/2025-08-03

wholesalerProductEntrysRoute.get("/:w/:p/:d", wholesalerProductEntry.getWholesalerProductEntryBySearching);

wholesalerProductEntrysRoute.put("/:id", wholesalerProductEntry.updateWholesalerProductEntryByID);

wholesalerProductEntrysRoute.delete("/:id", wholesalerProductEntry.deleteWholesalerProductEntryByID);

module.exports = wholesalerProductEntrysRoute;
