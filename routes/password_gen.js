/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 * these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// include db module from dbConn.js
const express = require('express');
const passwordRouter = express.Router();
const app = express();
const { db, Pool } = require('../db/dbConn');
const { emailExists, passwordValidator, isAuthenticated, getUserOrganizations } = require("../helpers.js");

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
  getUserOrganizations(id).then((usersOrgs) => {
    const organisations = [...usersOrgs];
    // write a helper function to filter the passwords for this logged in users company - TODO
    if (organisations) {
    const templateVars = { value: id, organisations };
      res.render("password_gen", templateVars);
    } else {
      res.redirect('/login');
    }
  }).catch(error => {
    console.log(error)
  });;
});

// POSTS routes - TODO - take in db here - TEST
passwordRouter.post("/", (req, res) => {
  console.log('hello world!');
  res.status(200).send('Working test!');
});

// export whole router
module.exports = passwordRouter;

