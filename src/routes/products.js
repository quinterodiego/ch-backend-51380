import express from 'express';
import { productController } from '../controllers/products.controller.js';

export const productsRouter = express.Router();

productsRouter.get('/', productController.getAll);

productsRouter.get('/:pid', productController.getById)

productsRouter.post('/', productController.create)

productsRouter.put('/:pid', async (req, res) => {
  const id = req.params.pid
  const updates = req.body
  
  const resp = await update(id, updates)

  res.status(201).send({
      "status": "success",
      "message": resp
  })
})

productsRouter.delete('/:pid', async (req, res) => {
  const id = req.params.pid
  const resp = await deleteProduct(id)
  res.status(200).send({
      "status": "success",
      "message": resp
  })
})