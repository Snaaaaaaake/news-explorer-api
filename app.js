const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
// const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const celebrateErrorHandler = require('celebrate').errors;
const usersRouter = require('./routes/getUsers');
const articleRouter = require('./routes/getArticles');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { loginUser, createUser, logoutUser } = require('./controllers/users');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/newsuserapi', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

/*
app.use(cors({
  origin: ['https://mesto-praktikum.site', 'https://www.mesto-praktikum.site', 'http://mesto-praktikum.site', 'http://www.mesto-praktikum.site'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
}));
*/

app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);
app.use(requestLogger);
app.use('/users', auth, usersRouter);
app.use('/articles', auth, articleRouter);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.get('/logout', auth, logoutUser);
app.use(errorLogger);
app.use(celebrateErrorHandler());
app.use('*', notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
