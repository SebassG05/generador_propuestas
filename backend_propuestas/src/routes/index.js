// routes/index.js
import { Router } from 'express';
import userRoutes from './userRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = Router();


// Aquí se agregan todas las rutas principales
router.use('/users', userRoutes);
router.use('/contact', contactRoutes);

export default router;
