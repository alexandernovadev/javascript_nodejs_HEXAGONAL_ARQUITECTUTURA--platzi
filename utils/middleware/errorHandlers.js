const { config } = require('../../config')
const boom = require('@hapi/boom')

function withErrorStack(error, stack) {
  if (config.dev) {
    // Hay que traer todas las propiedades del error
    // then error toca hacerle un spread operator
    // return { error, stack };
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {

  console.log(process.env.NODE_ENV === 'production') //false
// console.log(process.env.NODE_ENV.trim() === 'production') //truej
  // Imprimir errores
  console.log(err);
  next(err);
}

// Imaginemos que llegan error que no maneja BOOM
//  pues vamos a envolver el error para que BOOm lo admisntre
function wrapError(err, req, res, next) {

  // SI el erro no es de BOOM
  if(!err.isBoom){
    //Wrap de error con BOOM
    next(boom.badImplementation(err))
  }

  // Si es de tipo BOOM pues
  // envie el error comun y corriente
  next(err)
}


// Capturar el error
function errorHandler(err, req, res, next) { // eslint-disable-line

  // traer los datos de BOOM
  // estos datos son que BOOM proporciona
  // payload en como la data del error
  const {output:{statusCode, payload}} = err
  // Esa data viene por defecto de error1


  // res.status(err.status || 500);
  res.status(statusCode);
  // res.json(withErrorStack(err.message, err.stack));
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapError
};