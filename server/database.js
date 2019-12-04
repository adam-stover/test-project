const { Pool } = require('pg');

const { DB_URI } = process.env;
const pool = new Pool({ connectionString: DB_URI });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
