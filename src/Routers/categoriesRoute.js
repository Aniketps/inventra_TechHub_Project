const express = require("express");
const caregoriesRoute = express.Router();
const category = require("../Controllers/categoriesController.js");


caregoriesRoute.get("/", category.allCategories);
caregoriesRoute.post("/new", category.addCategory);
caregoriesRoute.get("/:id", category.getCatergoryByID);

// To search by using name, date or name with date then must provide
// both the fields, even if any one field out of two is black, suppose
// it is black then must use '-' in API calling point
// if just one field is given then route will direct to search id instead of name or date
// to mainten it provide both the fields
// example : 
// Search just by name : http://localhost:3000/categories/s/-
// Search just by date : http://localhost:3000/categories/-/2025
// Search by name and date : http://localhost:3000/categories/shoes/2025
caregoriesRoute.get("/:n/:d", category.getCategoriesBySearching);

caregoriesRoute.put("/:id", category.updateCategoryByID);

caregoriesRoute.delete("/:id", category.deleteCategoryByID);

module.exports = caregoriesRoute;
