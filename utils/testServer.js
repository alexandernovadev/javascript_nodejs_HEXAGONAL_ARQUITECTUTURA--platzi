const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  const app = express();
  // Probar solo la ruta
  route(app);

  // Hacer peticiones solo de TEST
  return supertest(app);
}

module.exports = testServer;