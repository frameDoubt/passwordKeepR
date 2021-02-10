const express = require('express');
const app = express();
const loginRoute = express.Router();
const { emailExists, passwordValidator } = require("../helpers.js");

/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

/* GET route
 * https://stackoverflow.com/questions/29941208/express-error-typeerror-router-use-requires-middleware-function-but-got-a-o */
loginRoute.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login", templateVars);
});

/* POST route
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
   syncronous error handling before our promise chain below even starts */
loginRoute.post("/", (req, res) => {
  const { email, password } = req.body;
  const errors = {
    email: "Must provide email!",
    password: "Must provide password!",
    emailNoExist: "Invalid email!",
    invalidPassword: "Invalid Password!"
  };

  if (!email) {
    res.send(errors.email);
    return;
  } else if (!password) {
    res.send(errors.password);
    return;
  }

  /* promise chain that will first check if the users email exists against our db and then validate their password
   * async error handling for when a username or password is invalid will happen in here - TODO */
  let validUserEmail = emailExists(email);
  validUserEmail.then((value) => {

    if (!value) {
      res.send(errors.emailNoExist);
      throw new Error('email does not exist');
    } else {
      return passwordValidator(password, email);
    }
  }).then((value) => {

    if (!value) {
      res.send(errors.invalidPassword);
      throw new Error('password does not exist');
    } else {
      req.session.user_id = value;
      res.json({status: "Success", redirect: '/'});
    }
  }).catch(error => {
    console.log(error);
  });
});

module.exports = loginRoute;
