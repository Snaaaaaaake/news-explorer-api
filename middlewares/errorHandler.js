const { ErrorNotFound } = require('../modules/errors');


const notFound = (req, res, next) => {
  next(new ErrorNotFound());
};

const errorHandler = (err, req, res, next) => {
  let incomingError = err;
  // Обработка встроенных ошибок mongoose,
  // по другому к ним не подобраться
  if (/Cast to [a-z]+ failed/i.test(incomingError.message)) {
    incomingError = new ErrorNotFound();
  }
  const { statusCode = 500, message } = incomingError;
  res.status(statusCode).send({ message, statusCode });
  // Чтобы не ругался линтер
  return next();
};

module.exports = { errorHandler, notFound };
