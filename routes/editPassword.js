const express = require('express');
const app = express();
const editPasswordRoute = express.Router();
const { } = require("../helpers.js");


/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
 const cookieSession = require('cookie-session');
 app.use(cookieSession({
   name: 'session',
   keys: ['key1'],

   maxAge: 24 * 60 * 60 * 1000
 }));

// POST route
editPasswordRoute.post("/", (req, res) => {
  const buttonId = req.body.clicked_button;
  res.send(buttonId)
});

module.exports = editPasswordRoute;
