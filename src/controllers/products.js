import {ProductModel} from './../dao/models/mongoDB/products.js'
import __dirname from './../utils.js'

export const getProducts =  async (req, res) => {
    // const products = await ProductModel.paginate({}, {})
    const { limit, page, sort, query } = req.query
    console.log(query)
    const resp = await ProductModel.paginate({}, { limit: 10, page: 2 })
    const products = resp.docs.map(item => {
        return item
    })
    const { docs, ...rest } = query
    return res.status(200).render('products', products)
    // if(limit) {
    //     const productsLimit = products.splice(0, parseInt(limit))
    //     res.status(200).send({ 
    //         "status": "success",
    //         "payload": productsLimit 
    //     })
    // } else {
    //     res.status(200).send({ 
    //         "status": "success",
    //         "payload": products
    //     })
    // }
}

export const getProductById = async (req, res) => {
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
}

export const createProduct = async (req, res) => {
    const product = req.body
    const resp = await ProductModel.create(product)
    res.status(200).send({
        "status": "success",
        "message": resp
    })
}

export const updateProductById = async (req, res) => {
    const id = req.params.pid
    const updates = req.body
    const resp = await ProductModel.updateOne({ _id: id }, {$set: updates});
    res.status(201).send({
        "status": "success",
        "message": resp
    })
}

export const deleteProductById = async (req, res) => {
    const id = req.params.pid
    const resp = await ProductModel.deleteOne({ _id: id})
    res.status(200).send({
        "status": "success",
        "message": resp
    })
}
