const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', createMovie);

routerMovies.delete('/movies/:movieId', deleteMovie);

module.exports = routerMovies;
