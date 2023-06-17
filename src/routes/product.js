import express from 'express';
import { create, deleteProduct, getAll, getById, update } from '../services/products.service.js';

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const { limit, page, sort, category, stock } = req.query
  const resp = await getAll(limit, page, sort, category, stock)
  res.status(200).send(resp)
});

productRouter.get('/:pid', async (req, res) => {
  const id = req.params.pid

  const product = await getById(id)

  if(product) {
      res.status(200).send({ 
          "status": "success",
          "payload": product
      })
  } else {
      res.send({ error: 'Producto no encontrado'})
  }
})

productRouter.post('/', async (req, res) => {
  const product = req.body
  
  const resp = await create(product)

  res.status(200).send({
      "status": "success",
      "message": resp
  })
})

productRouter.put('/:pid', async (req, res) => {
  const id = req.params.pid
  const updates = req.body
  
  const resp = await update(id, updates)

  res.status(201).send({
      "status": "success",
      "message": resp
  })
})

productRouter.delete('/:pid', async (req, res) => {
  const id = req.params.pid
  const resp = await deleteProduct(id)
  res.status(200).send({
      "status": "success",
      "message": resp
  })
})