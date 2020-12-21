const express = require('express')
const MoviesService = require('../services/movies.service');
// Aca no va logica vamos a chupar servicios

// Schemas
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/shemas/movies');


// ValidationHanlder
const validationHandler = require('../utils/middleware/validationHandler');


// Cache que agregamos
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function moviesApi(app) {

  const router = express.Router()
  app.use("/api/movies", router)

  const moviesService = new MoviesService();

  // Get Peliculas
  router.get("/", async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    // Obtener Modificadores query para la rutas
    // como id, nombre de alguna busqueda etc
    const { tags } = req.query;
    try {
      // const movies = await Promise.resolve(moviesMock)
      // const movies = await Promise.resolve(moviesMock)
      const movies = await moviesService.getMovies({ tags });

      // throw new Error("Error gettin movies")
      // console.log("Entra al try");

      res.status(200).json({
        data: movies,
        message: 'Movies Listed'
      })
    } catch (err) {
      next(err)
    }
  })
  // Get Movie By ID
  router.get('/:movieId',
  validationHandler({ movieId: movieIdSchema }, 'params'),
  async function(req, res, next) {
    
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

    const { movieId } = req.params;
    // console.log("id busqueda", movieId);
    try {
      const movies = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  // Crear Pelicula
  router.post('/',
  validationHandler(createMovieSchema),
  async function(req, res, next) {

    // body le PUSO UN ALIASSSSSSS
    // LO COLOCO movie 
    // No me la sabia
    // console.log("Data de req.bodu", req.body);
    
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (err) {
      next(err);
    }
  });

  // Updated By ID
  router.put('/:movieId',
  validationHandler({ movieId: movieIdSchema }, 'params'),
  validationHandler(updateMovieSchema),
  async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });


      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      });
    } catch (err) {
      next(err);
    }
  });

  // Delete Movie
  router.delete('/:movieId', 
  validationHandler({ movieId: movieIdSchema }, 'params'),
  async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi