const { ErrorNotFound, ErrorBadRequest } = require('../modules/errors');
const { error400Message } = require('../configs/errorMessages');

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
  if (/duplicate key error/i.test(incomingError.message)) {
    incomingError = new ErrorBadRequest(error400Message.exist);
  }
  const { statusCode = 500, message } = incomingError;
  res.status(statusCode).send({ message, statusCode });
  // Чтобы не ругался линтер
  return next();
};

module.exports = { errorHandler, notFound };
