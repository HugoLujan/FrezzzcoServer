import Products from "../models/products.js";
import { uploadImageToFirebase } from '../utils/cloud_storage.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtiene la ruta del directorio actual
const __dirname = dirname(__filename);

export const getProducts = async (req, res) => {
    const products = await Products.find();
    res.send(products)
};

export const getProductsByType = async (req, res) => {
    const { type } = req.params;
    
    try {
        const products = await Products.find({ type });
        res.send(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos por tipo.' });
    }
};



export const getProductById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await Products.findById(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.send(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles del producto.' });
    }
};




// export const createProducts = async (req, res) => {
//     const { title, description, price, type, status } = req.body;

//     if (req.file) {
//         const {filename} = req.file
//         product
//         // console.error('No se proporcionó una imagen.');
//         // return res.status(400).json({ error: 'No se proporcionó una imagen.' });
//     }

//     const imageBuffer = req.file.buffer; // Obtén el buffer de la imagen

//     const product = new Products({
//         title,
//         description,
//         price,
//         type,
//         status,
//         image: imageBuffer, // Almacena la imagen como un Buffer
//     });

//     try {
//         await product.save();
//         return res.json(product);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error al guardar el producto.' });
//     }
// };


export const createProducts = async (req, res) => {
    const { title, description, price, type, status } = req.body;

    const product = new Products({
        title,
        description,
        price,
        type,
        status,
    });

    if (req.file) {
        const { filename } = req.file;
        product.setImage(filename); // Configura la URL de la imagen
    }

    try {
        await product.save();
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar el producto.' });
    }
};


export const postProducts = async (req, res) => {
    const { title, description, price, type, status } = req.body;
    const products = new Products({ title, description, price, type, status });
    await products.save();
    return res.json(products);
};

export const putProducts = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct); // Devuelve el producto actualizado como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
};


export const updateProductImage = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id);
  
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  
    if (req.file) {
      const { filename } = req.file;
      product.setImage(filename); // Actualiza la URL de la imagen con la nueva imagen
    }
  
    try {
      await product.save();
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la imagen del producto.' });
    }
  };
  

export const deleteProducts = async (req, res) => {
    const products = await Products.findByIdAndDelete(req.params.id);
    if (!products) return res.sendStatus(404);
    return res.sendStatus(204);
};

export const deleteAllProducts = async (req, res) => {
    try {
        // Elimina todos los productos en la colección
        await Products.deleteMany({});

        // Devuelve una respuesta exitosa
        return res.sendStatus(204);
    } catch (error) {
        // Maneja los errores si ocurren
        return res.status(500).json({ error: 'Error al eliminar todos los productos.' });
    }
};


export const getProduct = (req, res) => res.send([]);
