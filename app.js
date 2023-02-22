const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1/bitfilmsdb',
} = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63f62d2fa04c6cd4137099dе',
  };

  next();
});

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
