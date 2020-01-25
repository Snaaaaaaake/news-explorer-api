const { ErrorNotFound } = require('../modules/errors');

module.exports = function (data) {
  if (data) {
    return Promise.resolve(data);
  }
  const err = new ErrorNotFound();
  throw err;
};
