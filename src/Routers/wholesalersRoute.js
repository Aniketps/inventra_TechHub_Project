const express = require("express");
const wholesalersRoute = express.Router();
const wholesaler = require("../Controllers/wholesalersController");

wholesalersRoute.get("/", wholesaler.allWholesalers);

module.exports = wholesalersRoute;
