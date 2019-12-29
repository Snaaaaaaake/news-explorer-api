module.exports = function (data) {
  if (data) {
    return Promise.resolve(data);
  }
  const err = new Error('Документ не найден');
  err.statusCode = 404;
  throw err;
};
