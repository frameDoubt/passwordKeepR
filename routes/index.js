const express = require('express');
const indexRoute = express.Router();
const app = express();
app.set("view engine", "ejs");
const { isAuthenticated, getPasswordsbyUsers, sortUserPasswords } = require("../helpers.js");

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

/* GET route - query database for passwords related to user and organisation
   pass through templateVars into EJS file to render information for specific user/organisation */
indexRoute.get("/", (req, res) => {
  const id = req.session.user_id;
  const idIsExisting = isAuthenticated(id);
  idIsExisting.then((value) => {

    if (!value) {
      res.redirect('/login');
    } else {
      getPasswordsbyUsers(value)
      .then((passwordsByUser) => {
        const sortedpasswordsByUser = sortUserPasswords(passwordsByUser);
        console.log('ALL THE PSWORDS HERE: ', sortedpasswordsByUser);
        const templateVars = { value: id, users: sortedpasswordsByUser };
        res.render("index", templateVars);
      }).catch(error => {
        console.log(error)
      });
    }
  })
});

module.exports = indexRoute;
