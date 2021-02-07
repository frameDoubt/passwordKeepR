const express = require('express');
const indexRoute  = express.Router();

// GET route
indexRoute.get("/", (req, res) => {
  res.render("index");
});

// POSTS routes - TODO - take in db here

// export modules 
module.exports = indexRoute;