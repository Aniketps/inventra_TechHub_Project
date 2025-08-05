const express = require("express");
const salesRoute = express.Router();
const sale = require("../Controllers/salesController");

salesRoute.get("/", sale.allSales);

salesRoute.post("/new", sale.addSale);
salesRoute.get("/:id", sale.getSaleByID);

// example : 
// Search just by customer name : http://localhost:3000/sales/ani/-/-/-/-/-/-/-
// Search just by purchase date : http://localhost:3000/sales/-/2025/-/-/-/-/-/-
// Search just by product category name : http://localhost:3000/sales/-/-/hell/-/-/-/-/-
// Search just by wholesaler : http://localhost:3000/sales/-/-/-/mangesh/-/-/-/-
// Search just by product name : http://localhost:3000/sales/-/-/-/-/x/-/-/-
// Search by all : http://localhost:3000/sales/ani/2025/hell/mangesh/x/10/1250/28250

salesRoute.get("/:cn/:pd/:pc/:w/:pn", sale.getSaleBySearching);

salesRoute.put("/:id", sale.updateSaleByID);

salesRoute.delete("/:id", sale.deleteSaleByID);

module.exports = salesRoute;
