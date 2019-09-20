const { Pool } = require('pg');

const uri = 'postgres://rbbbqpcd:bsY_D8gw1yxHOAEqtUL0F4iPHtB6Mogx@salt.db.elephantsql.com:5432/rbbbqpcd';
const pool = new Pool({ connectionString: uri });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
