import Carrusel from "../models/carrusel.js";
import { uploadImageToFirebase } from '../utils/cloud_storage.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtiene la ruta del directorio actual
const __dirname = dirname(__filename);

export const getCarrusel = async (req, res) => {
    try {
      const carruselItems = await Carrusel.find();
      res.json(carruselItems);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los elementos del carrusel.' });
    }
};

export const getCarruselById = async (req, res) => {
    const { id } = req.params;
    try {
      const carruselItem = await Carrusel.findById(id);
      if (!carruselItem) {
        return res.status(404).json({ error: 'Elemento del carrusel no encontrado' });
      }
      res.json(carruselItem);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el elemento del carrusel.' });
    }
};

export const createCarruselItem = async (req, res) => {
    const { image1, image2, image3 } = req.files;
    
    const carruselItem = new Carrusel({
      image1: image1[0].filename,
      image2: image2[0].filename,
      image3: image3[0].filename,
    });
  
    carruselItem.setImage(image1[0].filename, image2[0].filename, image3[0].filename);
  
    try {
      await carruselItem.save();
      return res.json(carruselItem);
    } catch (error) {
      return res.status(500).json({ error: 'Error al guardar el elemento del carrusel.' });
    }
};
  
  

export const updateCarruselItem = async (req, res) => {
  const { id } = req.params;
  const { image1, image2, image3 } = req.files;

  try {
      // Encuentra el elemento existente en la base de datos
      const carruselItem = await Carrusel.findById(id);

      if (!carruselItem) {
          return res.status(404).json({ error: 'Elemento del carrusel no encontrado' });
      }

      // Actualiza los campos de imagen si se proporcionaron nuevos archivos
      if (image1) {
          carruselItem.image1 = image1[0].filename;
      }

      if (image2) {
          carruselItem.image2 = image2[0].filename;
      }

      if (image3) {
          carruselItem.image3 = image3[0].filename;
      }

      // Guarda el elemento actualizado en la base de datos
      const updatedCarruselItem = await carruselItem.save();

      res.json(updatedCarruselItem);
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el elemento del carrusel.' });
  }
};
  
  

export const deleteCarruselItem = async (req, res) => {
  const { id } = req.params;
  try {
    const carruselItem = await Carrusel.findByIdAndDelete(id);
    if (!carruselItem) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el elemento del carrusel.' });
  }
};

export const deleteAllCarruselItems = async (req, res) => {
    try {
      await Carrusel.deleteMany({});
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar todos los elementos del carrusel.' });
    }
};
  