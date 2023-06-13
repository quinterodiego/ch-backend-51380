import Router from 'express'
import { ProductModel } from '../dao/models/mongoDB/products.js'

const productsRouter = Router()

productsRouter.get('/:limit?/:page?/:sort?/:query?', async (req, res) => {
    const { limit, page, sort, query } = req.params
    console.log(req.params)
    const resp = await ProductModel.paginate({}, { limit: limit || 10, page: page || 1 })
    const products = resp.docs.map(item => {
        return item
    })
    console.log(products)
    const { docs, ...rest } = resp
    return res.status(200).render('products', {products})
})

productsRouter.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const product = await ProductModel.findOne({_id: id})
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
    const resp = await ProductModel.create(product)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
})

productsRouter.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const updates = req.body
    const resp = await ProductModel.updateOne({ _id: id }, {$set: updates});
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

productsRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    const resp = await ProductModel.deleteOne({ _id: id})
    res.status(200).send({
        "status": "success",
        "message": resp
    })
})

export default productsRouter