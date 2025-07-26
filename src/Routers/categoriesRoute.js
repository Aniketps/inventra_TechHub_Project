const express = require("express");
const caregoriesRoute = express.Router();
const category = require("../Controllers/categoriesController.js");

caregoriesRoute.get("/", category.allCategories);

module.exports = caregoriesRoute;
