const routerMovies = require('express').Router();

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validators');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

routerMovies.get('/', getMovies);

routerMovies.post('/', validateCreateMovie, createMovie);

routerMovies.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = routerMovies;
