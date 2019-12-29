const { ErrorNotFound } = require('../modules/errors');

const errorHandler = (err, req, res, next) => {
  // Обработка встроенной ошибки mongoose при запросе несуществующего документа,
  // по другому к ней не подобраться
  if (/Cast to [a-z]+ failed/i.test(err.message)) {
    return res.status(404).send({ message: 'Документ не найден' });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message });
  // Чтобы не ругался линтер
  return next();
};

const notFound = (req, res, next) => {
  next(new ErrorNotFound('Запрашиваемый ресурс не найден'));
};

module.exports = { errorHandler, notFound };
