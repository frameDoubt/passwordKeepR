const express = require('express');
const app = express();
const loginRoute = express.Router();
const { emailExists, passwordValidator } = require("../helpers.js");

/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'user_id',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

/* GET route
 * https://stackoverflow.com/questions/29941208/express-error-typeerror-router-use-requires-middleware-function-but-got-a-o */
loginRoute.get("/", (req, res) => {
  res.render("login");
});

/* POST route
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then */
loginRoute.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log("email from user input: ", email);
  const errors = {
    email: "Must provide email!",
    password: "Must provide password!",
    emailNoExist: "Invalid email!",
    invalidPassword: "Invalid Password!"
  };

  // syncronous error handling before our promise chain below even starts 
  if (!email) {
    const templateVars = {
      error: errors.email
    };
    res.status(400).render('error', templateVars);
  } else if (!password) {
    const templateVars = {
      error: errors.password
    };
    res.status(400).render('error', templateVars);
  }

  /* promise chain that will first check if the users email exists against our db and then validate their password
   * async error handling for when a username or password is invalid will happen in here - TODO */
  let validUserEmail = emailExists(email);
  validUserEmail.then((value) => {
    return passwordValidator(password, email);
  }).then((value) => {
    req.session = value;
    res.redirect('/');
  }).catch(error => {
    console.log(error)
  });
});

module.exports = loginRoute;