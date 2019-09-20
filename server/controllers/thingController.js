const db = require('../database.js')

const thingController = {};

thingController.validateBody = (req, res, next) => {
  console.log('thingController: validateBody');
  if (
    (!Object.prototype.hasOwnProperty.call(req.body, 'name') || typeof req.body.name !== 'string')
    || (!Object.prototype.hasOwnProperty.call(req.body, 'description') || typeof req.body.description !== 'string')
  ) {
    next({
      log: 'Error in thingController validateBody: name or description in body is invalid',
      status: 400,
      message: 'Invalid input',
    });
  } else next();
}

thingController.getAllThings = async (req, res, next) => {
  console.log('getAllThings');
  const query = `SELECT * FROM things`;
  try {
    const { rows } = await db.query(query);
    res.locals.things = rows;
    next();
  } catch (error) {
    next({
      log: `getAllThings: error in DB connection: ${error}`,
      status: 500,
      message: 'Internal error',  
    });
  }
};

thingController.getThing = async (req, res, next) => {
  console.log('getThing');
  const query = {
    text: `SELECT thing, description FROM things WHERE thing = $1`,
    values: [req.body.thing],
  };
  try {
    const { rows } = await db.query(query);
    if (rows.length) res.locals.thing = rows[0];
    next();
  } catch (error) {
    next({
      log: `getThing: error in DB connection: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

thingController.createThing = async (req, res, next) => {
  console.log('createThing');
  if (Object.prototype.hasOwnProperty.call(res.locals, 'thing')) return next({
    log: 'createThing: thing already exists',
    status: 400,
    message: 'User already exists',
  });
  const query = {
    text: `INSERT INTO things(thing, description) VALUES($1, $2) RETURNING _id, thing, description`,
    values: [req.body.name, req.body.description],
  };
  try {
    const { rows } = await db.query(query);
    res.locals.thing = rows[0];
    next();
  } catch (error) {
    next({
      log: `createThing: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
};

module.exports = thingController;
