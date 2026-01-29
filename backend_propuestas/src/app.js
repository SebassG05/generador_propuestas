// app.js
// Punto de entrada principal de la aplicación

const express = require('express');
const loaders = require('./loaders');

const app = express();

// Cargar middlewares, rutas, etc.
loaders(app);

module.exports = app;
