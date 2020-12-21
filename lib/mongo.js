const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');


// Aui haceemos la configuracion de conexion a mongo DB

/* 
El método encodeURIComponent() codifica un componente URI (Identificador 
Uniforme de Recursos) al reemplazar cada instancia de ciertos caracteres 
por una, dos, tres o cuatro secuencias de escape que representan la 
codificación UTF-8 del carácter (solo serán cuatro secuencias de
escape para caracteres compuestos por dos carácteres "sustitutos").
*/
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// Hay error con el puerto hay que quitarlo
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}
/${DB_NAME}?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}
// :${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;


// Conexion directada de MOngo ATLAS
// mongodb+srv://db_user_platzivideo:<password>@cluster0.0nyyj.mongodb.net/test
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true});
    this.dbName = DB_NAME;
  }

  connect() {
    // Hacer la conexion a la base de datos
    // Patron Singleton
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  // Metodos CRUD genericos, sirve para
  // cualquier colleccion
  // OMG que ORDEEEEENNNN

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)

        // Lo converte a un array de OBJETOS
        .toArray();
    });
  }

  get(collection, id) {
    // console.log("LIB.", id);
    
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      // Devolver el id new thar insert
      .then(result => result.insertedId)
      
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      // Devolver el id new thar insert
      // o el mismo id de update
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      // Devolver el id 
      .then(() => id);
  }
}

module.exports = MongoLib;