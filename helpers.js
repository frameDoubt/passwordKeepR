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

// helper function to check if a users email address already exists in our database
// Fixed!
const emailExists = function(userEmail) {

  console.log("\n userEmail in function: ", userEmail)

  const query = `
     SELECT email
     FROM users 
     WHERE email = '${userEmail}';
    `

  console.log("\n query: ", query);
    // const values = [userEmail]

    return pool.query(query)
    .then(res => {
      console.log("\n res.rows[0] email: ", res.rows[0].email);

      if (res.rows[0].email === userEmail) {
        console.log("res.rows[0] insife if: ", res.rows[0]);
        return true;
      } else {
        return false;
      }
    });
};

// helper function to check if a users id already exists in our database
const isAuthenticated = function(userid, users) {
  let returnBool = false;
 

 
  return returnBool;
};

/* helper function that takes in req.body.email as "userEmail" and the users object, added hashing! much security!
    WORKS! */
   const passwordValidator = function(userPassword, userEmail) {
    
    const query = `
     SELECT id, master_password 
     FROM users 
     WHERE email = '${userEmail}';
    `
    console.log("query", query);

    return pool.query(query)
    .then(res => {
      console.log("res.rows[0] outside if statement", res.rows[0]);

      if (res.rows[0].master_password === userPassword) {
        console.log("res.rows[0] in if statement", res.rows[0]);
        return res.rows[0].id;
      } else {
        return false;
      }
    });
  };

// export these helper functions to where they are needed
module.exports = { emailExists, isAuthenticated, passwordValidator};