import { CartModel } from './../DAO/models/cart.js';

export const create = async () => {
    const products = []
    const resp = await CartModel.create({products})

    return resp
}

export const getById = async (id) => {
    const resp = await CartModel.findOne({ _id: id })

    return resp
}

export const addProduct = async (idCart, idProduct, quantity) => {
    const cart = await CartModel.findOne({_id: idCart})
    const oldProducts = cart.products
    const productExists = oldProducts.find(product => product.id === idProduct)
    if(productExists) {
        const index = oldProducts.findIndex(product => product.id === idProduct)
        oldProducts[index].quantity += quantity
    } else {
        oldProducts.push({ id: idProduct, quantity })
    }
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })

    return resp
}

export const deleteProduct = async (idCart, idProduct) => {
    const cart = await CartModel.findOne({ _id: idCart })
    const oldProducts = cart.products
    const newProducts = oldProducts.filter( prod => prod.id !== idProduct)
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })

    return resp
}

export const deleteProducts = async (idCart) => {
    const cart = await CartModel.findOne({ _id: idCart })
    const oldProducts = cart.products
    const newProducts = oldProducts.filter( prod => prod.id !== idProduct)
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })

    return resp
}