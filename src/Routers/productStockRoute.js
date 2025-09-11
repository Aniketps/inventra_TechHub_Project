const express = require("express");
const stockRoute = express.Router();
const stock = require("../Controllers/productStockController");

stockRoute.get("/", stock.allStocks);

stockRoute.post("/new", stock.addStock);

// Search by stock quantity
stockRoute.get("/quantity", stock.getStockByStock);

// Search by stock total cost
stockRoute.get("/totalcost", stock.getStockByTotalCost);

// Search by stock selling price
stockRoute.get("/price", stock.getStockByPrice);

// Search by stock wholesaler id
stockRoute.get("/:w/:p", stock.getStockBySearching);

stockRoute.get("/:id", stock.getStockByID);

stockRoute.put("/:id", stock.updateStockByID);

stockRoute.delete("/:id", stock.deleteStockByID);

module.exports = stockRoute;
