const express = require('express');
const app = express();
const deletePasswordRoute = express.Router();

/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
 const cookieSession = require('cookie-session');
 app.use(cookieSession({
   name: 'session',
   keys: ['key1'],
 
   maxAge: 24 * 60 * 60 * 1000
 }));

// POST route
deletePasswordRoute.post("/", (req, res) => {
  console.log(req.body)
  const button_id = req.body.clicked_button;
  console.log("button_id from client!: " , button_id);
  res.send("hello!")
});

module.exports = deletePasswordRoute;