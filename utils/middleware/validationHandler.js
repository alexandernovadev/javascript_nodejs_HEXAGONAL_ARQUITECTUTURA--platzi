const boom = require('@hapi/boom')
const joi = require('@hapi/joi');


// Esta funcion se encarga de validad la data
// JOI valida data
function validate(data, schema) {

  // console.log("=>",data);
  const { error } = joi.object(schema).validate(data, schema);
  return error;
}


// Aqui vamos a validar la informacion 
//
function validationHandler(schema, check = 'body') {
  return function(req, res, next) {

  
    const error = validate(req[check], schema);

    // error ? next(new Error(error)) : next();
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;