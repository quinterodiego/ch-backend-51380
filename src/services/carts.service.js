import { Cart } from './../dao/factory.js'
const cart = new Cart()

class CartService {

    create = async () => {
        const resp = await cart.create()
        return resp
    }

    getById = async (id) => {
        const resp = await cart.getById(id)
        return resp
    }
    
    addProduct = async (idCart, idProduct) => {
        const resp = await cart.addProduct(idCart, idProduct)
        return resp
    }
    
    deleteProduct = async (idCart, idProduct) => {
        const resp = await cart.deleteProduct(idCart, idProduct)
        return resp
    }
    
    deleteProducts = async (idCart) => {
        const resp = await cart.deleteProducts(idCart)
        return resp
    }
    
    updateProducts = async (idCart, products) => {
        const resp = await cart.updateProducts(idCart, products)
        return resp
    }
    
    updateQuantity = async (idCart, idProduct, quantity) => {
        const resp = await cart.updateQuantity(idCart, idProduct, quantity)
        return resp
    }

}

export const cartService = new CartService()