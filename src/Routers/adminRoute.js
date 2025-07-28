const express = require('express');
const adminRoute = express.Router();
const admin = require("../Controllers/adminController.js");

adminRoute.get("/", (req, res)=> {res.send("<h1>Forbidden</h1>")});

adminRoute.post("/login", admin.login);
adminRoute.post("/register", admin.register);

module.exports = adminRoute;