// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
module.exports = db, Pool;
