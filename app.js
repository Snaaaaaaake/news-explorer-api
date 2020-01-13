const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const celebrateErrorHandler = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const limiter = require('./configs/limiter');
const cors = require('./configs/cors');
const mainRoute = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/newsuserapi', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);
app.use(requestLogger);
app.use(mainRoute);
app.use(errorLogger);
app.use(celebrateErrorHandler());
app.use('*', notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
