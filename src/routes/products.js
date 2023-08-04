import express from 'express'
import { productController } from '../controllers/products.controller.js'

export const productsRouter = express.Router();

productsRouter.post('/', productController.create)

productsRouter.get('/', productController.getAll)

productsRouter.get('/:pid', productController.getById)

productsRouter.put('/:pid', productController.update)

productsRouter.delete('/:pid', productController.delete)