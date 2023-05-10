import Router from 'express'
import CartsManager from './../CartManager.js';

const cartsRouter = Router()
const manager = new CartsManager('./src/db/carts.json')

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
    res.send({
        "status": "succes",
        "payload": resp
    })
})

export default cartsRouter