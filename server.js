const express = require("express");
const cors = require("cors");
const db = require('./app/models/db')

const server = express();

server.use(cors());

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.json("Hello world");
});

require("./app/routes/data-object.routes.js")(server);

module.exports = server
