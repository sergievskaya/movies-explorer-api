const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');

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

router.use(routerUsers);

router.use(routerMovies);

router.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

module.exports = router;
