const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub, getOneStub, createStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function () {
  const MoviesServices = proxyquire('../services/movies.service', {
    '../lib/mongo': MongoLibMock
  });

  // Aqui se esta lllamando el servicio de MOVIEs de mongo
  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function () {
    it('should call the getall MongoLib method', async function () {
      await moviesService.getMovies({});

      // con asset espera qie el primer parametro sea como el segundo
      // en este casi que cuando se llamen getallstub sea true
      assert.strictEqual(getAllStub.called, true);
      // console.log("que es-> ", createStub.value);
    });

    it('should return an array of movies', async function () {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });

  describe('when getMovie method is called', () => {
    it('should call the getall MongoLib method', async function () {
      // Que el metro sea llamado
      await moviesService.getMovie({});
      assert.strictEqual(getOneStub.called, true);
    });

    it('should return an array with a movie', async function () {
      const result = await moviesService.getMovie({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  })

  describe('when create method is called', () => {
    it('should call the create MongoLib method', async function () {
      await moviesService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });
    it('should return a id of movie', async function () {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      assert.deepEqual(result, expected);
    });
  })
  
});