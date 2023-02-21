const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
