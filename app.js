
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./server/routes");

app.use(bodyParser.json());
app.use("/", routes);

module.exports = app;