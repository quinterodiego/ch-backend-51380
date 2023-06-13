import Router from 'express'
import { createCart, getCartById, addProductByIdInCart } from './../controllers/carts.js'

const cartsRouter = Router()

cartsRouter.post('/', createCart)

cartsRouter.get('/:cid', getCartById)

cartsRouter.put('/:cid/product/:pid', addProductByIdInCart)

export default cartsRouter