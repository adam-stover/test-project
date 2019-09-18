/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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

// app.use('/build', express.static(path.join(__dirname, '../build')));

app.post('/signup', userController.validateBody, userController.getUser, userController.createUser, (req, res) => {
  res.sendStatus(200);
});

app.post('/login', userController.validateBody, userController.getUser, userController.verifyUser, sessionController.setSSID, (req, res) => {
  res.sendStatus(200);
});

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
	"yays" integer NOT NULL,
	"nays" integer,
	CONSTRAINT "things_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users-things" (
	"_id" serial NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	"thing_id" integer NOT NULL UNIQUE,
	"vote" integer NOT NULL,
	CONSTRAINT "users-things_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"_id" serial NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	"uuid" varchar(255) NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "users-things" ADD CONSTRAINT "users-things_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");
ALTER TABLE "users-things" ADD CONSTRAINT "users-things_fk1" FOREIGN KEY ("thing_id") REFERENCES "things"("_id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("_id");


*/
