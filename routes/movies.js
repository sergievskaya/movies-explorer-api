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

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', validateCreateMovie, createMovie);

routerMovies.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = routerMovies;
