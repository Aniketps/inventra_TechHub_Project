const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
require("./Databases/mainDatabase.js");
const router = require("./Routers/mainRoute.js");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/api", router);

module.exports = app;