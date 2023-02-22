const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.use(routerUsers);

router.use(routerMovies);

router.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

module.exports = router;
