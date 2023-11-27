import { Router } from "express";
import { 
    getProducts,
    postProducts,
    createProducts,
    putProducts,
    deleteProducts,
    deleteAllProducts,
    getProductsByType,
    getProductById,
    updateProductImage
 } from "../controllers/productos.controller.js";

const router = Router();

export default function productsRoutes(upload) {
  router.get('/products', getProducts);
  router.get('/products/type/:type', getProductsByType);
  router.get('/products/:id', getProductById);
  router.post('/products', postProducts);
  router.post('/productsWithImage', upload.single('image'), createProducts);
  router.put('/products/:id', putProducts);
  router.put('/products/:id/image', updateProductImage);
  router.delete('/products/:id', deleteProducts);
  router.delete('/products', deleteAllProducts);
  router.get('/product/:id', getProducts);

  return router;
}
