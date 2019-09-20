const db = require('../database.js')

const voteController = {};

voteController.validateBody = (req, res, next) => {
  console.log('voteController: validateBody');
  if (
    (!Object.prototype.hasOwnProperty.call(req.body, 'user_id') || typeof req.body.user_id !== 'number')
    || (!Object.prototype.hasOwnProperty.call(req.body, 'thing_id') || typeof req.body.thing_id !== 'number')
  ) {
    next({
      log: 'Error in voteController validateBody: body is invalid',
      status: 400,
      message: 'Invalid input',
    });
  } else next();
}

voteController.getAllVotes = async (req, res, next) => {
  console.log('getAllVotes');
  const query = `SELECT user_id, thing_id, vote FROM votes`;
  try {
    const { rows } = await db.query(query);
    res.locals.votes = rows;
    next();
  } catch (error) {
    next({
      log: `getAllVotes: error in DB connection: ${error}`,
      status: 500,
      message: 'Internal error',  
    });
  }
}

voteController.getVote = async (req, res, next) => {
  console.log('getVote');
  const query = {
    text: `SELECT * FROM votes WHERE user_id = $1 AND thing_id = $2`,
    values: [req.body.user_id, req.body.thing_id],
  };
  try {
    const { rows } = await db.query(query);
    if (rows.length) res.locals.vote = rows[0];
    next();
  } catch (error) {
    next({
      log: `getVote: error in DB connection: ${error}`,
      status: 500,
      message: 'Internal error',  
    });
  }
}

voteController.createVote = async (req, res, next) => {
  console.log('createVote');
  if (Object.prototype.hasOwnProperty.call(res.locals, 'vote')) return next({
    log: 'createVote: vote already exists',
    status: 400,
    message: 'Vote already exists',
  });
  const query = {
    text: `INSERT INTO votes(user_id, thing_id, vote) VALUES($1, $2, $3) RETURNING _id, user_id, thing_id, vote`,
    values: [req.body.user_id, req.body.thing_id, req.body.vote],
  };
  try {
    const { rows }= await db.query(query);
    res.locals.vote = rows[0];
    next();
  } catch (error) {
    next({
      log: `createThing: ${error}`,
      status: 500,
      message: 'Internal error',
    });
  }
}

module.exports = voteController;
