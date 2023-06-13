import { CartModel } from './../../../src/dao/models/mongoDB/carts.js';

export const create = async () => {
    const resp = await CartModel.create()

    return resp
}

export const getById = async (id) => {
    const resp = await CartModel.findOne({ _id: id })

    return resp
}

export const addPruduct = async (idCart, idProduct, quantity) => {
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

    return resp
}
