const uuid = require('uuidv4').default;
const db = require('../database.js')

const sessionController = {};

sessionController.setSSID = async (req, res, next) => {
  console.log('setSSID');
  const ssid = uuid();
  const query = {
    text: `INSERT INTO sessions(user_id, uuid) VALUES($1, $2)`,
    values: [res.locals.user._id, ssid],
  };
  try {
    await db.query(query);
    res.cookie('ssid', ssid, { httpOnly: true });
    res.locals.isLoggedIn = true;
    next();
  } catch (error) {
    next({
      log: `setSSID: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

sessionController.checkSSID = async (req, res, next) => {
  console.log('checkSSID');
  if (!Object.prototype.hasOwnProperty.call(req.cookies, 'ssid') || !uuid.is(req.cookies.ssid)) {
    res.locals.isLoggedIn = false;
    return next();
  }
  const query = {
    text: `SELECT user_id FROM sessions WHERE uuid = $1`,
    values: [req.cookies.ssid],
  }
  try {
    const { rows } = await db.query(query);
    if (!rows.length) {
      res.locals.isLoggedIn = false;
      return next();
    }
    query.text = `SELECT _id, username FROM users WHERE _id = $1`;
    query.values = [rows[0].user_id];
    const result = await db.query(query);
    res.locals.user = result.rows[0];
    res.locals.isLoggedIn = true;
    next();
  } catch (error) {
    next({
      log: `checkSSID: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

sessionController.deleteSSID = async (req, res, next) => {
  console.log('deleteSSID');
  if (!Object.prototype.hasOwnProperty.call(req.cookies, 'ssid') || !uuid.is(req.cookies.ssid)) {
    return next({
      log: 'deleteSSID: name or description in body is invalid',
      status: 400,
      message: 'Invalid input',
    });
  }
  const query = {
    text: `DELETE FROM sessions WHERE uuid = $1`,
    values: [req.cookies.ssid],
  };
  try {
    await db.query(query);
    res.clearCookie('ssid');
    next();
  } catch (error) {
    next({
      log: `deleteSSID: ${error}`,
      status: 500,
      message: 'Internal error',
    })
  }
}

module.exports = sessionController;
