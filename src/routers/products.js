import Router from 'express'
import { getProducts, getProductById, createProduct, updateProductById, deleteProductById } from './../controllers/products.js'

const productsRouter = Router()

productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProductById)

productsRouter.post('/', createProduct)

productsRouter.put('/:pid', updateProductById)

productsRouter.delete('/:pid', deleteProductById)

export default productsRouter