// const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');
const { query } = require('express');

class MoviesService {

  constructor() {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies({ tags }) {
    // Los tagas viene de la ruta
    // console.info("***Tags: de m.s", tags);

    // Esto es una consulta de MONGODB Ver documentacin
    const query = tags && { tags: { $in: tags } }

    // const movies = await Promise.resolve(moviesMock);
    //el query sirve para filtrar peliculas por TAGS
    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || [];
  }

  async getMovie( {movieId} ) {
    // Aqui no llegan los test porque esto es de mongo
    // then se simula el comportamiento de esto es otro lado
    // console.log("Id: de m.s", movieId);
    
    const movies = await this.mongoDB.get(this.collection, movieId);
    return movies || [];
  }

  async createMovie({ movie }) {
    const movies = await this.mongoDB.create(this.collection, movie);
    return movies || [];
  }

  async updateMovie({ movieId, movie } = {}) {
    const movies = await this.mongoDB.update(this.collection, movieId, movie);
    return movies || [];
  }

  async deleteMovie({ movieId }) {
    const movies = await this.mongoDB.delete(this.collection, movieId);
    return movies || [];
  }
}

module.exports = MoviesService;