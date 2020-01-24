const Article = require('../models/article');
const nullCheck = require('../modules/nullCheck');
const { ErrorBadRequest, ErrorForbidden } = require('../modules/errors');
const { error400Message } = require('../configs/errorMessages');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(nullCheck)
    .then((articles) => res.send(articles))
    .catch((err) => next(err));
};
const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, description, date, source, url, image,
  } = req.body;
  Article.create({
    keyword, title, description, date, source, url, image, owner,
  })
    .then(nullCheck)
    .then(() => res.status(201).send({ message: 'Создано', statusCode: 201 }))
    .catch((e) => {
      let err;
      if (/validation failed/.test(e.message)) {
        err = new ErrorBadRequest(e.message);
      } else if (/duplicate key error/i.test(e.message)) {
        err = new ErrorBadRequest(error400Message.exist);
      } else {
        err = e;
      }
      return next(err);
    });
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('owner')
    .then(nullCheck)
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        return Article.findByIdAndRemove(req.params.articleId)
          .then(() => res.send({ message: 'Удалено', statusCode: 200 }))
          .catch((err) => next(err));
      }
      throw new ErrorForbidden();
    })
    .catch((err) => next(err));
};

module.exports = {
  getArticles, addArticle, deleteArticle,
};
