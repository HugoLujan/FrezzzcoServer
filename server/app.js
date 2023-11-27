import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js';
import carruselRoutes from './routes/carrusel.routes.js';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


// Configura el almacenamiento Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

// Configura la instancia de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

// Configura bodyParser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Utiliza "express.json()" en lugar de "body-parser" para analizar JSON
app.use(express.json());
app.use(cors());



// Rutas para productos, carrusel y publicaciones
app.use(productsRoutes(upload));
app.use(carruselRoutes(upload));
app.use(userRoutes);
app.use(authRoutes);
// Configura Express para servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static('uploads'));
// app.use('/auth', auth)
// app.use('/users', user )


export { upload };

export const uploadFile = (req, res) => {
  res.send({ data: 'Enviar un archivo' });
};

export default app;
