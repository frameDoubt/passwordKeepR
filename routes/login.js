const express = require('express');
const app = express();
const loginRoute = express.Router();
const { emailExists, isAuthenticated, passwordValidator } = require("../helpers.js");

// require and use cookie session to store user ids for cookie sessions
// https://www.npmjs.com/package/cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'user_id',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

// GET route
// https://stackoverflow.com/questions/29941208/express-error-typeerror-router-use-requires-middleware-function-but-got-a-o
loginRoute.get("/", (req, res) => {
  res.render("login");
});

// POST route
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
loginRoute.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log("email from user input: ", email);
  const errors = {
    email: "Must provide email!",
    password: "Must provide password!",
    emailNoExist: "Invalid email!",
    invalidPassword: "Invalid Password!"
  };

  // promise chain that will first check if the users email exists against our db and then validate their password
  let validUserEmail = emailExists(email);
  validUserEmail.then((value) => {
    return passwordValidator(password, email);
  }).then((value => {
    req.session = value;
    res.redirect('/');
  }));
});


module.exports = loginRoute;


// isAuthenticated.then((value) => {
//   console.log("\n value inside of isAuthenticated returned promise: ", value);

//   console.log("isAuthenticated we want YEE: ", value);
//   req.session = value;
//   res.redirect('/');
// });