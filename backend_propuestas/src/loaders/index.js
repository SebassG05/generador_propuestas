// loaders/index.js
// Inicializa middlewares, rutas, y otros módulos

const dotenv = require('dotenv');
const connectDB = require('../../config/db');

module.exports = (app) => {
  // Cargar variables de entorno
  dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

  // Conectar a la base de datos
  connectDB();

  // Aquí se cargarán middlewares, rutas, etc.
};
