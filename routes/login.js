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
  const validUserEmail = emailExists(email);

  validUserEmail.then((value) => {
    console.log("\n value inside of validUserEmail returned promise: ", value);

    // console.log("email inside of promise", email);
    // console.log("password inside of promise", password);
    
    const isAuthenticated = passwordValidator(password, email);

    // thennable isAuthenticated promise from above to do stuff!
    isAuthenticated.then((value) => {
      console.log("\n value inside of isAuthenticated returned promise: ", value);

      const errors = {
        email: "Must provide email!",
        password: "Must provide password!",
        emailNoExist: "Invalid email!",
        invalidPassword: "Invalid Password!"
      };

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
      } else if (!validUserEmail) {
        const templateVars = {
          error: errors.emailNoExist
        };
        res.status(400).render('error', templateVars);
      } else if (!isAuthenticated) {
        const templateVars = {
          error: errors.invalidPassword
        };
        res.status(400).render('error', templateVars);
      } else {
        console.log("isAuthenticated we want YEE: ", value);
        req.session = value;
        res.redirect('/');
      }
    });
  });
});

module.exports = loginRoute;