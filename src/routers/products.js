import Router from 'express'
import ProductsManager from '../ProductManager.js'

const productsRouter = Router()
const manager = new ProductsManager('./src/db/products.json')

productsRouter.get('/', async (req, res) => {
    const products = await manager.getProducts()
    const { limit } = req.query
    if(limit) {
        const productsLimit = products.splice(0, parseInt(limit))
        res.status(200).send({ 
            "status": "success",
            "payload": productsLimit 
        })
    } else {
        res.status(200).send({ 
            "status": "success",
            "payload": products 
        })
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await manager.getProductById(id)
    if(product) {
        res.status(200).send({ 
            "status": "success",
            "payload": product
        })
    } else {
        res.send({ error: 'Producto no encontrado'})
    }
})

productsRouter.post('/', async (req, res) => {
    const product = req.body
    const resp = await manager.addProduct(product)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
})

productsRouter.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const updates = req.body
    console.log(updates)
    const resp = await manager.updateProduct(id, updates)
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

productsRouter.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const resp = await manager.deleteProduct(id)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
})

export default productsRouter