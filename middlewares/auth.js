const jwt = require('jsonwebtoken');
const { ErrorUnauthorized } = require('../modules/errors');
const key = require('../modules/key');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (e) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
