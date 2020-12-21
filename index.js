const express = require('express');
const app = express();

// Body Parser ya no hace falta ahora es
// La confugracion de JSON VAAAA antes
app.use(express.json())




// Cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
  
const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');


const { config } = require('./config/index');

// traer el file de rutas
const moviesApi = require('./routes/movies.routes')
// Llamamos la funicion
moviesApi(app)





//********************** */
// Midlewares de errores
app.use(logErrors);
// Middleware de BOOM  el que envuelve el error
app.use(wrapError);

app.use(errorHandler);
// Midlewares de errores
//********************** */

// ERROR 404
app.use(notFoundHandler);
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});



/** EXECISES */

/**
 * 
 * 
 * app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/json', function(req, res) {
  res.json({ hello: 'world' });
});

app.get('/reto/:year', function (req, res) {
  let year  = req.params.year;
  // subtring corta la cadena
  // comeinza desde las pos 1
  // hasta que llegue al final
  year=year.substring(1,year.length)
  console.log(year);
  
 if (year%4==0 && ((year%100 !==0) || (year%400==0))){
   res.send("es bisiesto")
 }else{
   res.send("no es bisiesto")
 }
});
 */