/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// include db module from dbConn.js
const express = require('express');
const passwordRouter  = express.Router();
const app = express();
const { db, Pool } = require('../db/dbConn');

// require and use cookie session to store user ids for cookie sessions
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

// PG database client/connection setup
// db.connect();

// get routes for password generator page
passwordRouter.get("/", (req, res) => {
  // query to db for the current logged in user, and check what orginizations they are part of
   // send that information back to the client for the orginzation drop down menu to pick from 
  res.render("password_gen");
});

// POSTS routes - TODO - take in db here
passwordRouter.post("/", (req, res) => {

  // console log stuff that comes from clint

  console.log('hello world!');
  res.status(200).send('Working test!');
});

// export whole router
module.exports = passwordRouter;