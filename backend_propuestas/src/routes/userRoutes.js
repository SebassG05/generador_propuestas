import express from 'express';
import { register, login } from '../controller/userController.js';

const router = express.Router();


// Registro de usuario
router.post('/register', register);

// Login de usuario (por email o nombre)
router.post('/login', login);

export default router;
