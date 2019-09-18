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
    text: `SELECT uuid FROM sessions WHERE user = $1`,
    values: [res.locals.user.username],
  }
  try {
    const { rows } = await db.query(query);
    if (!rows.length || rows[0].uuid !== req.cookies.ssid) {
      res.locals.isLoggedIn = false;
      next();
    } else {
      res.locals.isLoggedIn = true;
      next();
    }
  } catch (error) {
    next({
      log: `checkSSID: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

module.exports = sessionController;
