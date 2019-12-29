const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, addArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().iso().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri().regex(/^https?:\/\/[0-9a-z-.]+\.[a-z]+/i)
      .error(new Error('Поле "Ссылка" должно содержать ссылку.')),
    image: Joi.string().required().uri().regex(/^https?:\/\/[0-9a-z-.]+\.[a-z]+\/.*\.(jpeg|jpg|png|gif)/i)
      .error(new Error('Поле "Изображение" должно содержать ссылку на изображение.')),
  }),
}), addArticle);
router.delete('/:articleId', deleteArticle);
// router.put('/:articleId/likes', likeArticle);
// router.delete('/:articleId/likes', dislikeArticle);

module.exports = router;
