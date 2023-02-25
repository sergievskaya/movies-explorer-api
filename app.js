const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1/bitfilmsdb',
} = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
