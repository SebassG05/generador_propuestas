import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env ANTES de cualquier otra importación
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

// Usar import dinámico para cargar app DESPUÉS de dotenv
const startServer = async () => {
  const { default: app } = await import('./app.js');
  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
};

startServer();
