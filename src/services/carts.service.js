import { CartModel } from './../DAO/models/cart.js';
import { ProductModel } from './../DAO/models/product.js';

export const create = async () => {
    const products = []
    const resp = await CartModel.create({products})

    return resp
}

export const getById = async (id) => {
    const resp = await CartModel.findById(id).populate('products.product')
    const products = resp.products.map(prod => {
        const { product } = prod
        return {      
            "_id": product._id,
            "title": product.title,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "brand": product.brand,
            "category": product.category,
            "code": product.code,
            "status": product.status,
            "thumbnail": product.thumbnail[0],
            "quantity": prod.quantity
        }
    })
    return products
}

export const addProduct = async (idCart, idProduct) => {
    const cart = await CartModel.findById(idCart)
    const exist = cart.products.find(prod => prod.product.toString() === idProduct)
    let resp = ''
    if(!exist) {
        cart.products.push({ product: idProduct, quantity: 1 })
        resp = await cart.save()
        return resp
    } else {
        resp = 'El producto ya existe en el carrito'
        return resp
    }
}

export const deleteProduct = async (idCart, idProduct) => {
    const cart = await CartModel.findById(idCart)
    const exist = cart.products.find(prod => prod.product.toString() === idProduct)
    let resp = ''
    if(!exist) {
        resp = 'El producto que intenta borrar no existe en el carrito'
        return resp
    } else {
        const oldProducts = cart.products
        const newProducts = oldProducts.filter( prod => prod.product.toString() !== idProduct)
        resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })
        return resp
    }

}

export const deleteProducts = async (idCart) => {
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: []}, { new: true })

    return resp
}

export const updateProducts = async (idCart, products) => {
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: products}, { new: true })

    return resp
}

export const updateQuantity = async (idCart, idProduct, quantity) => {
    const cart = await CartModel.findOne({_id: idCart})
    const exist = cart.products.find(prod => prod.product.toString() === idProduct)
    let resp = ''
    if(!exist) {
        resp = 'El producto que intenta actualizar no existe en el carrito'
        return resp
    } else {
        const oldProducts = cart.products
        const index = oldProducts.findIndex(product => product.product.toString() === idProduct)
        oldProducts[index].quantity = quantity
        resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })
        return resp
    }
}