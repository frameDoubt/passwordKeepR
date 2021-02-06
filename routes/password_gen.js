/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// include db module from dbConn.js 
const express = require('express');
const passwordRouter  = express.Router();
const { db, Pool } = require('../db/dbConn');

// PG database client/connection setup
db.connect();

// get routes for password generator page
passwordRouter.get("/", (req, res) => {
  res.render("password_gen");
});

// POSTS routes - TODO - take in db here
passwordRouter.post("/", (req, res) => {
  console.log('hello world!');
  res.status(200).send('Working test!');
});

// export whole router
module.exports = passwordRouter;