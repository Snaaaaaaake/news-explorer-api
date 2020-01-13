const Article = require('../models/article');
const nullCheck = require('../modules/nullCheck');
const { ErrorBadRequest, ErrorForbidden } = require('../modules/errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(nullCheck)
    .then((articles) => res.send(articles))
    .catch((err) => next(err));
};
const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then(nullCheck)
    .then((article) => res.status(201).send(article))
    .catch((e) => {
      let err;
      if (/validation failed/.test(e.message)) {
        err = new ErrorBadRequest(e.message);
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
          .then((trueArticle) => res.send(trueArticle))
          .catch((err) => next(err));
      }
      throw new ErrorForbidden('У вас недостаточно прав для данного действия');
    })
    .catch((err) => next(err));
};

module.exports = {
  getArticles, addArticle, deleteArticle,
};
