// PG database client/connection setup
// const { db, Pool } = require('../db/dbConn');
// db.connect();

// install pg and connect to the lightbnb database at the top of the database.js file.
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

// helper function to check if a users email address already exists in our database - FIXED!
const emailExists = function (userEmail) {

  if (userEmail) {
    const query = `
       SELECT email
       FROM users 
       WHERE email = '${userEmail}';
      `
    return pool.query(query)
      .then(res => {

        if (res.rows[0].email === userEmail) {
          return true;
        } else {
          return false;
        }
      });
  }
  return false;
};

// helper function that takes in req.body.email as "userEmail" and the users object, added hashing! much security! - WORKS!
const passwordValidator = function (userPassword, userEmail) {

  const query = `
     SELECT id, master_password 
     FROM users 
     WHERE email = '${userEmail}';
    `
  console.log("query", query);

  return pool.query(query)
    .then(res => {

      if (res.rows[0].master_password === userPassword) {
        return res.rows[0].id;
      } else {
        return false;
      }
    });
};

// export these helper functions to where they are needed
module.exports = { emailExists, passwordValidator };