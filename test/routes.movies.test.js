const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function () {

  // Cambia el servicio de MONGO por el mock data
  // eso es lo que hace proxyquire
  const route = proxyquire('../routes/movies.routes', {
    '../services/movies.service': MoviesServiceMock
  });

  const request = testServer(route);
  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);

      // Pero entonces porque el done no esta AQUI??? ESTA ABOVE estudpido
    });

    // Este test verifica que este devolviendo los datos
    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {

        // Comparar que la data sea igual a moviesMock
        // Que el msg, sea igual a Movies Listed ::OJO Mayusuculas sensibles
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'Movies Listed'
        });
        
        // console.log("ESTE ES EL RES", res.body);

        // El done siginifica aqui termina el test
        done();
      });

      // it('should respond with the movie id', function (done) {
      //   request.get('/api/movie')
      // })
    });
  });


  describe('GET /movies/:id', () => {
    it('should respond with status 200', (done) => {
      request.get("/api/movies/5ef52e96f61e8e00fd9668ea").expect(200, done);
    });
    it('should respond a movie', (done) => {
      request.get("/api/movies/5ef52e96f61e8e00fd9668ea").end((err, res)=>{
        // console.log(moviesMock[0]);
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movie retrieved'
        })
        done()
      })

    });
  });
});