const express = require("express");
const route = express.Router();

route.get("^/$|/index(.html)?", (req, res) => {
  res.send("Root - home page");
});

module.exports = route;
