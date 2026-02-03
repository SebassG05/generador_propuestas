import express from 'express';
import { sendContact } from '../controller/contactController.js';

const router = express.Router();

// Ruta para recibir mensajes de contacto
router.post('/', sendContact);

export default router;
