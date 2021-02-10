/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 * these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// include db module from dbConn.js
const express = require('express');
const passwordRouter = express.Router();
const generator = require('generate-password');
const app = express();
const { db, Pool } = require('../db/dbConn');
const { isAuthenticated, getUserOrganizations } = require("../helpers.js");

// require and use cookie session to store user ids for cookie sessions
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

// PG database client/connection setup
// db.connect();

/* get routes for password generator page
 * query to db for the current logged in user, and check what orginizations they are part of
 * send that information back to the client for the orginzation drop down menu to pick from */
passwordRouter.get("/", (req, res) => {
  const id = req.session.user_id;

  isAuthenticated(id)
  .then((userId) => {
    if (!userId) {
      res.redirect('/login');
    }
    return getUserOrganizations(userId);
  })
  .then((usersOrgs) => {
    const organisations = [...usersOrgs];
    const templateVars = { value: id, organisations };
    res.render("password_gen", templateVars);
  }).catch(error => {
    console.log(error)
  });
});

// POSTS routes - TODO - take in db here - TEST
passwordRouter.post("/", (req, res) => {
  console.log('were expecting our form inputs to come in here as a object: ', req.body);
  console.log("req.body.url: ", req.body.url);
  console.log("req.body.length: ", req.body.length);
  console.log("req.body.numbers: ", req.body.numbers);
  console.log("req.body.uppercase: ", req.body.uppercase);
  console.log("req.body.lowercase: ", req.body.lowercase);
  console.log("req.body.symbols: ", req.body.symbols);

  // console.log('this is the res', res.body);
  const passwordGenerator = function () {
    return password = generator.generate({
      length: req.body.length,
      numbers: true,
      upperCase: false,
      lowerCase: false,
      symbols: true
    });
};
  console.log(passwordGenerator());
  res.send('This worked!');
});

// export whole router
module.exports = passwordRouter;