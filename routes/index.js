const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('../routes/getUsers');
const articleRouter = require('../routes/getArticles');
const { loginUser, createUser, logoutUser } = require('../controllers/users');
const { signInValidation, signUpValidation } = require('../modules/validation');

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articleRouter);
router.post('/signin', signInValidation, loginUser);
router.post('/signup', signUpValidation, createUser);
router.get('/logout', auth, logoutUser);

module.exports = router;
