const express = require("express");
const customersRoute = express.Router();
const customer = require("../Controllers/customersController");

customersRoute.get("/", customer.allCustomers);
customersRoute.post("/new", customer.addCustomer);
customersRoute.get("/:id", customer.getCustomerByID);

// To search by using name, date, email, phone, address or with any combination search
// then must provide
// all the fields, even if any one field out of 5 is black, suppose
// it is black then must use '-' in API calling point
// if just one field is given then route will direct to search id instead of name or date
// to mainten it provide both the fields
// example : 
// Search just by name : http://localhost:3000/customers/aniket/-/-/-/-
// Search just by date : http://localhost:3000/customers/-/2025/-/-/-
// Search just by address : http://localhost:3000/customers/-/-/pune/-/-
// Search just by phone : http://localhost:3000/customers/-/-/-/9022270236/-
// Search just by email : http://localhost:3000/customers/-/-/-/-/aniketp2327@gmail.com
// Search by all : http://localhost:3000/customers/aniket/2025/pune/9022270236/aniketp2327@gmail.com

customersRoute.get("/:n/:d/:a/:p/:e", customer.getCustomersBySearching);

customersRoute.put("/:id", customer.updateCustomerByID);

customersRoute.delete("/:id", customer.deleteCustomerByID);

module.exports = customersRoute;
