const express = require("express");
const wholesalersRoute = express.Router();
const wholesaler = require("../Controllers/wholesalersController");

wholesalersRoute.get("/", wholesaler.allWholesalers);

wholesalersRoute.post("/new", wholesaler.addWholesaler);
wholesalersRoute.get("/:id", wholesaler.getWholesalerByID);

// example : 
// Search just by Date : http://localhost:3000/wholesalers/2025/-/-/-/-
// Search just by Address : http://localhost:3000/wholesalers/-/pune/-/-/-
// Search just by Wholsaler Name : http://localhost:3000/wholesalers/-/-/mangesh/-/-
// Search just by Phone : http://localhost:3000/wholesalers/-/-/-/9022270236/-
// Search just by Email : http://localhost:3000/wholesalers/-/-/-/-/aniketp2327
// Search by all : http://localhost:3000/wholesalers/2025/pune/mangesh/9022270236/aniketp2327

wholesalersRoute.get("/:d/:a/:wn/:p/:e", wholesaler.getWholesalersBySearching);

wholesalersRoute.put("/:id", wholesaler.updateWholesalersByID);

wholesalersRoute.delete("/:id", wholesaler.deleteWholesalersByID);

module.exports = wholesalersRoute;
