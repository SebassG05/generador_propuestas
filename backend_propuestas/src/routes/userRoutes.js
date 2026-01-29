import express from 'express';
import { register, login, logout } from '../controller/userController.js';

const router = express.Router();


// Registro de usuario
router.post('/register', register);

// Login de usuario (por email o nombre)
router.post('/login', login);

// Logout de usuario (stateless)
router.post('/logout', logout);

export default router;
