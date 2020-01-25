const jwt = require('jsonwebtoken');
const { ErrorUnauthorized } = require('../modules/errors');
const key = require('../configs/key');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (e) {
    return next(new ErrorUnauthorized());
  }
  req.user = payload;
  return next();
};
