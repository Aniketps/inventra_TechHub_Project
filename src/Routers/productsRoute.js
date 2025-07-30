const express = require("express");
const productsRoute = express.Router();
const product = require("../Controllers/productsController");

productsRoute.get("/", product.allProducts);

productsRoute.post("/new", product.addProduct);
productsRoute.get("/:id", product.getProductByID);

// To search by using name, date, email, phone, address or with any combination search
// then must provide
// all the fields, even if any one field out of 5 is black, suppose
// it is black then must use '-' in API calling point
// if just one field is given then route will direct to search id instead of name or date
// to mainten it provide both the fields
// example : 
// Search just by name : http://localhost:3000/products/x/-/-
// Search just by date : http://localhost:3000/products/-/2025/-
// Search just by category : http://localhost:3000/products/-/-/he
// Search by all : http://localhost:3000/products/bajaj/2025

productsRoute.get("/:n/:d/:c", product.getProductsBySearching);

productsRoute.put("/:id", product.updateProductByID);

productsRoute.delete("/:id", product.deleteProductByID);

module.exports = productsRoute;
