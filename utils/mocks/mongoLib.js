const sinon = require('sinon');


// Sinon prueba los servicio
const { moviesMock, filteredMoviesMock, filteredMovieMock} = require('./movies');


/* Un stub es una implementación de una interfaz que puede servir data o 
  respuestas.

   Por ejemplo, en la clasa pasada hubieron estas líneas.

   const route = proxyquire('../routes/movies', {
       '../services/movies': MoviesServiceMock,
     });
   Ahí usamos un stub para reemplazar el servicio real por uno falso pero 
   que tbm genere data. */

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getOneStub = sinon.stub();
getOneStub.withArgs('movies').resolves(moviesMock);

const movieId = { movieId: "11fff70c-c312-4791-b8b4-1a0665edd79e" };
getOneStub.withArgs('movies', movieId).resolves(filteredMovieMock('11fff70c-c312-4791-b8b4-1a0665edd79e'));


const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id){
    return getOneStub(collection, id)
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  getOneStub,
  createStub,
  MongoLibMock
};