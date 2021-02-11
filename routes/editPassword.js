const express = require('express');
const app = express();
const editPasswordRoute = express.Router();
const { editPasswordFromDb, getEditedPassword } = require("../helpers.js");


/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
 const cookieSession = require('cookie-session');
 app.use(cookieSession({
   name: 'session',
   keys: ['key1'],

   maxAge: 24 * 60 * 60 * 1000
 }));

// POST route
editPasswordRoute.post("/", (req, res) => {
  const buttonId = req.body.clicked_button;
  const passwordText = req.body.password_text;
  console.log("passwordText", passwordText);
  let editedPassword = editPasswordFromDb(buttonId, passwordText);
  editedPassword.then(() => {
    return getEditedPassword(buttonId);
  }).then((value) => {
    const updatedPassword = value;
    res.send(updatedPassword.rows[0].password_text)
  });
});

module.exports = editPasswordRoute;