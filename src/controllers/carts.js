import {CartModel} from './../dao/models/mongoDB/carts.js'

export const createCart = async (req, res) => {
    const products = []
    const resp = await CartModel.create({products})
    res.status(201).send({
        "status": "success",
        "message": resp 
    })
}

export const getCartById = async (req, res) => {
    const id = req.params.cid
    const resp = await CartModel.findOne({ _id: id })
    res.status(200).send({
        "status": "succes",
        "payload": resp
    })
}

export const addProductByIdInCart = async (req, res) => {
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
}