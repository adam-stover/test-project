const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const thingController = require('./controllers/thingController');
const userController = require('./controllers/userController');
const voteController = require('./controllers/voteController');
const sessionController = require('./controllers/sessionController');

const app = express();
const PORT = 3000;
const defaultError = {
  log: 'Express error handler caught unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' }, 
};

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.post('/api/signup', userController.validateBody, userController.getUser, userController.createUser, sessionController.setSSID, (req, res) => {
  if (res.locals.user) res.locals.user.password = null;
  res.status(200).json(res.locals);
});

app.get('/api/check', sessionController.checkSSID, (req, res) => {
  if (res.locals.user) res.locals.user.password = null;
  res.status(200).json(res.locals);
});

app.post('/api/login', userController.validateBody, userController.getUser, userController.verifyUser, sessionController.setSSID, (req, res) => {
  if (res.locals.user) res.locals.user.password = null;
  res.status(200).json(res.locals);
});

app.delete('/api/logout', sessionController.deleteSSID, (req, res) => {
  res.sendStatus(200);
})

app.post('/api/things', thingController.validateBody, thingController.getThing, thingController.createThing, (req, res) => {
  res.status(200).json(res.locals.thing);
});

app.get('/api/things', thingController.getAllThings, (req, res) => {
  res.status(200).json(res.locals.things);
});

app.post('/api/votes', voteController.validateBody, voteController.getVote, voteController.createVote, (req, res) => {
  res.status(200).json(res.locals.vote);
})

app.get('/api/votes', voteController.getAllVotes, (req, res) => {
  res.status(200).json(res.locals.votes);
})

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

function errorHandler(err, req, res, next) {
  const errorObj = { ...defaultError, ...err };
  console.error(errorObj.log);
  res.json({
    status: errorObj.status,
    message: errorObj.message,
  });
}

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;

/*
CREATE TABLE "users" (
	"_id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "things" (
	"_id" serial NOT NULL,
	"thing" varchar(255) NOT NULL UNIQUE,
	"description" varchar(255),
	CONSTRAINT "things_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "votes" (
	"_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"thing_id" integer NOT NULL,
	"vote" integer NOT NULL,
	CONSTRAINT "votes_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"uuid" varchar(255) NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "votes" ADD CONSTRAINT "votes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "votes" ADD CONSTRAINT "votes_fk1" FOREIGN KEY ("thing_id") REFERENCES "things"("_id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");

*/
