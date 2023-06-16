import Router from 'express'
import { create, getById, addProduct, deleteProduct, updateProducts } from './../services/carts.service.js'

const cartRouter = Router()

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
        "status": "succes",
        "payload": resp
    })
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const { quantity } = req.body
    const resp = await addProduct(idCart, idProduct, quantity)

    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
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

export default cartRouter