// PG database client/connection setup
// const { db, Pool } = require('../db/dbConn');
// db.connect();

// install pg and connect to the lightbnb database at the top of the database.js file.
const { Pool } = require('pg');
const { user } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/* helper function to check if a users email address already exists in our database - FIXED!
 * return a promise with false inside it if no userId exists */
const emailExists = function (userEmail) {
  const query = `
      SELECT email
      FROM users
      WHERE email = '${userEmail}';
    `
  return pool.query(query)
    .then(res => {

      // if email not found in db, res.rows.length === 0, we catch this
      if (res.rows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

// helper function that takes in req.body.email as "userEmail" and the users object, added hashing! much security! - WORKS!
const passwordValidator = function (userPassword, userEmail) {

  const query = `
     SELECT id, master_password
     FROM users
     WHERE email = '${userEmail}';
    `

  return pool.query(query)
    .then(res => {

      if (res.rows[0].master_password === userPassword) {
        return res.rows[0].id;
      } else {
        return false;
      }
    });
};

/* helper function that will determine if a user is authorized to be logged in or not
 * queries our db with the, return a promise with a false value if no userId exists */
const isAuthenticated = function (userId) {

  if (userId) {
    const query = `
    SELECT id
    FROM users
    WHERE id = ${userId}
    `;

    return pool.query(query)
      .then(res => {

        console.log("res value: \n", res.rows[0].id);

        if (res.rows.length === 0) {
          return false;
        } else {
          return res.rows[0].id;
        }
      });
  }

  return Promise.resolve(false);
};

// helper function to get all passwords by a userID and render it to the index page client side eventually
const getPasswordsbyUsers = function (userId) {
  console.log("userId we want ot make sure exists: ", userId);

  if (userId) {
    const query = `
    SELECT url, password_text, title, category, passwords.id, user_id, organisations_id, organisations.name
    FROM passwords
    JOIN organisations ON organisations.id = passwords.organisations_id
    WHERE passwords.organisations_id = (SELECT organisations_id FROM users_organisations WHERE user_id = ${userId} LIMIT 1);
    `;
    return pool.query(query)
      .then(res => {
        return res.rows;
      })
  }

  return Promise.resolve(false);
};

// helper function to get organizations for a user to populate the org dropdown box when they make a password
const getUserOrganizations = function (userId) {
  const query = `
  SELECT DISTINCT organisations.name AS name
  FROM organisations
  JOIN passwords ON passwords.organisations_id = organisations.id
  WHERE user_id = ${userId};
  `
  return pool.query(query);
};

// export these helper functions to where they are needed
module.exports = { emailExists, passwordValidator, isAuthenticated, getPasswordsbyUsers, getUserOrganizations };
