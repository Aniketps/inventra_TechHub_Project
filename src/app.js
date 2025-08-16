const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
require("./Databases/mainDatabase.js");
const router = require("./Routers/mainRoute.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/api", router);

module.exports = app;