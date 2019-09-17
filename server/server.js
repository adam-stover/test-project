/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const defaultError = {
  log: 'Express error handler caught unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' }, 
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

function errorHandler(err, req, res, next) {
  const errorObj = { ...defaultError, err };
  console.error(errorObj.log);
  return express.json({
    status: errorObj.status,
    message: errorObj.message,
  });
}

app.use((err, req, res, next) => {
  return errorHandler(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;
