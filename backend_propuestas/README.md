# Backend Propuestas

Estructura base para un backend de generador de propuestas siguiendo buenas prácticas.

## Estructura de carpetas

- `config/`: Configuración (scheduler, cloudinary, puppeteer, etc.)
- `http/`: Archivos de pruebas HTTP (colecciones para testear endpoints)
- `jobs/`: Tareas programadas (cron jobs, scrapers, notificaciones)
- `logs/`: Logs del sistema
- `models/`: Modelos de datos (ORM/Mongoose)
- `public/`: Archivos públicos (imágenes, etc.)
- `scripts/`: Scripts utilitarios o de mantenimiento
- `service/`: Lógica de negocio y servicios
- `src/`: Código fuente principal
  - `controller/`: Controladores
  - `loaders/`: Inicialización de módulos
  - `middleware/`: Middlewares
  - `routes/`: Rutas de la API
  - `scrapers/`: Scrapers
  - `utils/`: Utilidades
- `package.json`: Dependencias y scripts
- `README.md`: Documentación

