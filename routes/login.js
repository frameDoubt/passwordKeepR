const express = require('express');
const loginRoute = express.Router();

// GET route
// https://stackoverflow.com/questions/29941208/express-error-typeerror-router-use-requires-middleware-function-but-got-a-o
loginRoute.get("/", (req, res) => {
  res.render("login");
});

module.exports = loginRoute;