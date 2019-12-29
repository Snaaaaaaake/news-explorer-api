const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUser,
} = require('../controllers/users');

// router.get('/', getUsers);
/* router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUser); */
router.get('/me', getUser);

module.exports = router;
