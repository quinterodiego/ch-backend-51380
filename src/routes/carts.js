import express from 'express'
import { create, getById, addProduct, deleteProduct, updateProducts, updateQuantity, deleteProducts } from './../services/carts.service.js'

const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
    const resp = await create()
    res.status(201).send({
        "status": "success",
        "message": resp 
    })
})

cartRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid
    const resp = await getById(id)
    res.status(200).send({
        "status": "success",
        "payload": resp
    })
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const resp = await addProduct(idCart, idProduct)
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const resp = await deleteProduct(idCart, idProduct)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

cartRouter.put('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const products = req.body.products
    const resp = await updateProducts(idCart, products)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.body.quantity
    const resp = await updateQuantity(idCart, idProduct, quantity)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

cartRouter.delete('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const resp = await deleteProducts(idCart)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

export default cartRouter