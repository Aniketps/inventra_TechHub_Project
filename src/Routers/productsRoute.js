const express = require("express");
const productsRoute = express.Router();
const product = require("../Controllers/productsController");

productsRoute.get("/", product.allProducts);

module.exports = productsRoute;
