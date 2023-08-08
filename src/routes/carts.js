import express from 'express'
import { cartController } from '../controllers/carts.controller.js'
const cartRouter = express.Router()

cartRouter.post('/', cartController.create)

cartRouter.get('/:cid', cartController.getById)

cartRouter.post('/:cid/products/:pid', cartController.addProduct)

cartRouter.delete('/:cid/products/:pid', cartController.deleteProduct)

cartRouter.delete('/:cid', cartController.deleteProducts)

cartRouter.put('/:cid', cartController.updateProducts)

cartRouter.put('/:cid/products/:pid', cartController.updateQuantity)

export default cartRouter