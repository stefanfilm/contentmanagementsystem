const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Openlife23!!', // ! Change this to your own password
  database: 'employees_db',
  port: 5432 // Default PostgreSQL port
});

module.exports = pool;