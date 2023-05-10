import Router from 'express'
import CartsManager from './../CartManager.js';
import ProductsManager from '../ProductManager.js';

const cartsRouter = Router()
const manager = new CartsManager('./src/db/carts.json')
const managerProducts = new ProductsManager('./src/db/products.json')

cartsRouter.post('/', async (req, res) => {
    const resp = await manager.createCart()
    res.send({
        "status": "success",
        "message": resp 
    })
})

cartsRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const resp = await manager.getProductsById(id)
    const allProducts = await managerProducts.getProducts()
    const products =  resp.map(prod => {
        return allProducts.filter(prd => prd.id == prod.id)
    })
    console.log(products)
    res.send({
        "status": "succes",
        "payload": products
    })
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const idCart = parseInt(req.params.cid)
    const idProduct = parseInt(req.params.pid)
    const { quantity } = req.query
    const resp = await manager.addProductToCart(idCart, idProduct, quantity)
    res.send({
        "status": "success",
        "message": resp
    })
})

export default cartsRouter