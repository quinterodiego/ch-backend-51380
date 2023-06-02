import Router from 'express'
import {CartModel} from './../dao/models/mongoDB/carts.js'
import { ProductModel } from '../dao/models/mongoDB/products.js'

const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    const products = []
    const resp = await CartModel.create({products})
    res.status(201).send({
        "status": "success",
        "message": resp 
    })
})

cartsRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const resp = await CartModel.getProductsById(id)
    res.status(200).send({
        "status": "succes",
        "payload": resp
    })
})

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const { quantity } = req.body
    const cart = await CartModel.findOne({_id: idCart})
    const oldProducts = cart.products
    const productExists = oldProducts.find(product => product.idProduct === idProduct)
    if(productExists) {
        const index = oldProducts.findIndex(product => product.idProduct === idProduct)
        oldProducts[index].quantity += quantity
    } else {
        oldProducts.push({ id: idProduct, quantity })
    }
    const resp = await CartModel.updateOne({ _id: idCart}, {$set: {products: oldProducts}})
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

export default cartsRouter