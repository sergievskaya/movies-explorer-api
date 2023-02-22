const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка валидации полей'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('фильм с указанным id не найден');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new Error('forbidden');
      } else {
        movie.remove();
        res.send({ message: 'Фильм удалён' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id'));
      } else if (err.message === 'forbidden') {
        next(new ForbiddenError('Нет доступа к удалению фильма'));
      } else {
        next(err);
      }
    });
};
