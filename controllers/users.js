const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nullCheck = require('../modules/nullCheck');
const key = require('../configs/key');
const { ErrorBadRequest } = require('../modules/errors');
const { error400Message } = require('../configs/errorMessages');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(nullCheck)
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => next(err));
};
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    if (password && password.length >= 8) {
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, email, password: hash,
        }))
        .then(nullCheck)
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
        }))
        .catch((e) => {
          let err;
          if (/validation failed/.test(e.message)) {
            err = new ErrorBadRequest(e.message);
          } else if (/duplicate key/.test(e.message)) {
            err = new ErrorBadRequest(error400Message.email);
          } else {
            err = e;
          }
          return next(err);
        });
    }
    throw new ErrorBadRequest(error400Message.password);
  } catch (e) {
    return next(e);
  }
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({
          name: user.name,
          email: user.email,
        });
    })
    .catch((e) => next(e));
};
const logoutUser = (req, res) => {
  res.clearCookie('jwt').send({ status: true });
};

module.exports = {
  getUser, createUser, loginUser, logoutUser,
};
