import { CartModel } from './../DAO/models/cart.js';
import { ProductModel } from './../DAO/models/product.js';

export const create = async () => {
    const products = []
    const resp = await CartModel.create({products})

    return resp
}

export const getById = async (id) => {
    const resp = await CartModel.findById({_id: id}).populate('products.product')
    const payload = resp.products.map(p => {
        return {
            title: p.product.title,
            description: p.product.description,
            thumbnail: p.product.thumbnail[0],
            price: p.product.price,
            id: p.product.id,
            quantity: p.quantity
        }
    })

    return payload
}

export const addProduct = async (idCart, idProduct) => {
    try {
        const cart = await CartModel.findById(idCart);
        const product = await ProductModel.findById(idProduct);
        cart.products.push({ product: product._id, quantity: 1 });
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

export const deleteProduct = async (idCart, idProduct) => {
    const cart = await CartModel.findById(idCart)
    const oldProducts = cart.products
    const newProducts = oldProducts.filter( prod => prod.product.toString() !== idProduct)
    const resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })

    return resp
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
    const oldProducts = cart.products
    const index = oldProducts.findIndex(product => product.product.toString() === idProduct)
    oldProducts[index].quantity = quantity

    const resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })

    return resp
}