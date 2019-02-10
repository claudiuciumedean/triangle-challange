const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const routes = require("./server/routes");
const path = require("path");

app.use(bodyParser.json());
app.use("/client/dist", express.static("client/dist"));
app.use("/", routes);

app.listen(port, () => console.log(`The application is running on port ${port}`));