import express from 'express';
import loaders from './loaders/index.js';

const app = express();

// Cargar middlewares, rutas, etc.
loaders(app);

export default app;
