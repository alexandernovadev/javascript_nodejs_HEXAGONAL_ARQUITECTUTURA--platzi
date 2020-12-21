const boom = require('@hapi/boom');

// No lleva la funcion next
// porque es lo ultimo que se ejecuta
function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;