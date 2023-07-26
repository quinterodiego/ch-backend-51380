import express from 'express'
import { cartController } from '../controllers/carts.controller.js'
const cartRouter = express.Router()

cartRouter.post('/', cartController.createCart)

cartRouter.get('/:cid', cartController.getById)

cartRouter.post('/:cid/products/:pid', cartController.addProduct)

cartRouter.delete('/:cid/products/:pid', cartController.deleteProduct)

cartRouter.put('/:cid', cartController.deleteProducts)

cartRouter.put('/:cid/products/:pid', cartController.updateProducts)

cartRouter.delete('/:cid', cartController.updateQuantity)

export default cartRouter