const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');

const auth = require('../middlewares/auth');

const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validators');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use('/users', auth, routerUsers);

router.use('/movies', auth, routerMovies);

router.use('*', auth, () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

module.exports = router;
