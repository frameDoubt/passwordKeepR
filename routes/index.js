const express = require('express');
const indexRoute  = express.Router();
const app = express();

// require and use cookie session to store user ids for cookie sessions
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

// GET route
indexRoute.get("/", (req, res) => {
  // query database for passwords related to user and organisation
  // pass through templateVars into EJS file to render information for specific user/organisation
  res.render("index");
});

// POSTS routes - TODO - take in db here
// post to "/delete"

// Post route to handle when user deletes a password from their saves passwords
  // query database for password user selected they want to delete, then delete it from db
  // then render the index page without that password

// Post route where the user can edit their passwords 
// post to "/edit"
  // query database for password user selected they want to edit, then edit it in db
  // then render the index page with that edited information/password

// export modules 
module.exports = indexRoute;