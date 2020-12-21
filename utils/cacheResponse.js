const { config } = require('../config');

function cacheResponse(res, seconds) {
  if (!config.dev) {
    // Agrega cache cuando se solicita una ruta
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;