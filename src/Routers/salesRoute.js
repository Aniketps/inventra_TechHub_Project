const express = require("express");
const salesRoute = express.Router();
const sale = require("../Controllers/salesController");

salesRoute.get("/", sale.allSales);

module.exports = salesRoute;
