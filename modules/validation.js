const { celebrate, Joi } = require('celebrate');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const articlesValidation = celebrate({
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
});

module.exports = { signInValidation, signUpValidation, articlesValidation };
