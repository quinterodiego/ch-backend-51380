import Router from 'express'
import { create, getById, addPruduct } from './../services/carts.service.js'

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    const resp = await create({})
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

cartRouter.put('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const { quantity } = req.body
    
    const resp = await addPruduct(idCart, idProduct, quantity)

    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

export default cartRouter