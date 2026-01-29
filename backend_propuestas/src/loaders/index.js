import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import connectDB from '../../config/db.js';
import mainRoutes from '../routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  // Cargar variables de entorno
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });

  // Conectar a la base de datos
  connectDB();

  // Middlewares básicos
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Rutas
  app.use('/api', mainRoutes);
};
