import express from 'express';
import { productController } from '../controllers/products.controller.js';

export const productsRouter = express.Router();

productsRouter.get('/', productController.getAll);

productsRouter.get('/:pid', productController.getById)

productsRouter.post('/', productController.create)

productsRouter.put('/:pid', productController.update)

productsRouter.delete('/:pid', productController.delete)