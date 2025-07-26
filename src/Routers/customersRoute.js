const express = require("express");
const customersRoute = express.Router();
const customer = require("../Controllers/customersController");

customersRoute.get("/", customer.allCustomers);

module.exports = customersRoute;
