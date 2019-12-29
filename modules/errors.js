/* eslint-disable max-classes-per-file */
class ErrorNotFound extends Error {
  constructor(message = 'Документ не найден') {
    super(message);
    this.statusCode = 404;
  }
}

class ErrorUnauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}
class ErrorBadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}
class ErrorForbidden extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  ErrorNotFound, ErrorUnauthorized, ErrorBadRequest, ErrorForbidden,
};
