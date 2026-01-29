// routes/index.js
import { Router } from 'express';
import userRoutes from './userRoutes.js';

const router = Router();

// Aquí se agregan todas las rutas principales
router.use('/users', userRoutes);

export default router;
