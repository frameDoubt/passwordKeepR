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

  if (userId) {
    const query = `
    SELECT url, password_text, category, passwords.id, user_id, organisations_id, organisations.name
    FROM passwords
    JOIN organisations ON organisations.id = passwords.organisations_id
    WHERE passwords.user_id = ${userId} OR passwords.organisations_id IN (SELECT organisations_id FROM users_organisations WHERE user_id = ${userId});
    `;
    return pool.query(query)
      .then(res => {
        return res.rows;
      })
  }

  return Promise.resolve(false);
};

// helper function to delete password from the database when passed the button id. The button id should match the password primary key.
const deletePasswordFromDb = function (buttonId) {
  const query = `
    DELETE FROM passwords
    WHERE passwords.id = ${buttonId}
  ;
  `
  return pool.query(query);

}

// helper function to edit password from the database when passed the button id. The button id should match the password primary key.
const editPasswordFromDb = function (buttonId, newPassword) {
  const query = `
    UPDATE passwords
    SET password_text = '${newPassword}'
    WHERE id = ${buttonId}
  ;
  `
  return pool.query(query);
}

// helper function to retrieve new password
const getEditedPassword = function (buttonId) {
  const query =  `
    SELECT password_text
    FROM passwords
    WHERE id = ${buttonId}
    ;
  `
  return pool.query(query);
}

// helper function to get organizations for a user to populate the org dropdown box when they make a password
const getUserOrganizations = function (userId) {
  const query = `
  SELECT DISTINCT organisations.name AS name
  FROM organisations
  JOIN passwords ON passwords.organisations_id = organisations.id
  WHERE user_id = ${userId};
  `
  return pool.query(query)
    .then(res => {
      return res.rows;
    });
};

//will be used to enter a new login/password to the database
const newPasswordToDatabase = function (userId, orgId, category, url, password_text) {
  pool.query(`SELECT id FROM organisations WHERE organisations.name = '${orgName}';`)
  const query =`
  INSERT INTO passwords (user_id, organisations_id, category, url, password_text)
  VALUES (${userId}, ${orgId}, '${category}', '${url}', '${password_text}');
  `;
  return pool.query(query);
};

const getOrgIdFromName = function (name) {
  const query = `
  SELECT id
  FROM organisations
  WHERE organisations.name = '${name}';
  `
  return pool.query(query)
    .then(res => {
      console.log('RESULT OF ORG ID FROM NAME: ', res.rows[0])
      return res.rows[0].id;
    });
}

/* https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 * sorts the array that later renders the dom elements by the url alpabetically */
const sortUserPasswords = function (userPasswordArr) {
  return userPasswordArr.sort((a, b) => {
    if (a.url < b.url){
      return -1;
    }
    if (a.url > b.url){
      return 1;
    }
    return 0;
  });
};

// export these helper functions to where they are needed
module.exports = {
  emailExists,
  passwordValidator,
  isAuthenticated,
  getPasswordsbyUsers,
  getUserOrganizations,
  deletePasswordFromDb,
  editPasswordFromDb,
  getEditedPassword,
  sortUserPasswords,
  newPasswordToDatabase,
  getOrgIdFromName
 };
