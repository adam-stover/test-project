const db = require('../database.js')
const bcrypt = require('bcryptjs');


const userController = {};
const SALT_WORK_FACTOR = 10;

userController.validateBody = (req, res, next) => {
  console.log('validateBody');
  if (
    (!Object.prototype.hasOwnProperty.call(req.body, 'username') || typeof req.body.username !== 'string')
    || (!Object.prototype.hasOwnProperty.call(req.body, 'password') || typeof req.body.password !== 'string')
  ) {
    next({
      log: 'Error in validateBody: username or password in body is invalid',
      status: 400,
      message: 'Invalid username or password',
    });
  } else next();
}

userController.getUser = async (req, res, next) => {
  console.log('getUser');
  const query = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [req.body.username],
  };
  try {
    const { rows } = await db.query(query);
    if (rows.length) res.locals.user = rows[0];
    next();
  } catch (error) {
    next({
      log: `getUser: error in DB connection: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

userController.createUser = async (req, res, next) => {
  console.log('createUser');
  if (Object.prototype.hasOwnProperty.call(res.locals, 'user')) return next({
    log: 'createUser: user already exists',
    status: 400,
    message: 'User already exists',
  });
  try {
    const hash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    const query = {
      text: `INSERT INTO users(username, password) VALUES($1, $2)`,
      values: [req.body.username, hash],
    };
    await db.query(query);
    next();
  } catch (error) {
    next({
      log: `createUser: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

userController.verifyUser = async (req, res, next) => {
  console.log('verifyUser');
  if (!Object.prototype.hasOwnProperty.call(res.locals, 'user')) return next({
    log: 'Error in validateBody: username or password in body is invalid',
    status: 400,
    message: 'Invalid username or password',
  });
  try {
    const match = await bcrypt.compare(req.body.password, res.locals.user.password);
    if (!match) return next({
      log: 'Error in validateBody: username or password in body is invalid',
      status: 400,
      message: 'Invalid username or password',
    });
    next();
  } catch (error) {
    next({
      log: `verifyUser: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

// userController.getAllUsers = async (req, res, next) => {
//   const query = `SELECT * FROM USERS`;
//   try {
//     const users = await db.query(query);
//     res.status(200).json(users.rows);
//   } catch (error) {
//     next({
//       log: 'getUser: error in DB connection',
//       status: 500,
//       message: 'Internal error',
//     });
//   }
// }

module.exports = userController;
