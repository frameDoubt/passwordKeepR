const express = require('express');
const app = express();
const logoutRoute = express.Router();

/* require and use cookie session to store user ids for cookie sessions
 * https://www.npmjs.com/package/cookie-session */
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  maxAge: 24 * 60 * 60 * 1000
}));

/* POST route
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then */
logoutRoute.post("/", (req, res) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = logoutRoute;