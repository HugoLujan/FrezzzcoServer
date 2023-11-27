import { Router } from "express";
import {
  getCarrusel,
  getCarruselById,
  createCarruselItem,
  updateCarruselItem,
  deleteCarruselItem,
  deleteAllCarruselItems,
} from "../controllers/carrusel.controller.js";

const router = Router();

export default function carruselRoutes(upload) {
  router.get('/carrusel', getCarrusel);
  router.get('/carrusel/:id', getCarruselById);
  router.post('/carrusel', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]), createCarruselItem);  
  router.put('/carrusel/:id', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]), updateCarruselItem);
  router.delete('/carrusel/:id', deleteCarruselItem);
  router.delete('/carrusel', deleteAllCarruselItems);

  return router;
}
