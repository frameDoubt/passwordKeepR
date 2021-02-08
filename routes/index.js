const express = require('express');
const indexRoute = express.Router();
const app = express();
app.set("view engine", "ejs");
const { emailExists, passwordValidator, isAuthenticated, getPasswordsbyUsers } = require("../helpers.js");

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

// GET route
// query database for passwords related to user and organisation
// pass through templateVars into EJS file to render information for specific user/organisation
indexRoute.get("/", (req, res) => {
  const id = req.session.user_id;
  const idIsExisting = isAuthenticated(id);
  idIsExisting.then((value) => {
    console.log("value hi: ", value);

    if (value) {
      return templateVariablePromise = getPasswordsbyUsers(value)
    } else {
      res.redirect('/login');
    }
  }).then((passwordsByUser) => {
    const templateVars = { value: id, users: passwordsByUser };
    res.render("index", templateVars);
  }).catch(error => {
    console.log(error)
  });
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
