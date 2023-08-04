import { cartModel } from "../dao/mongodb/carts.mongodb.js"

class CartService {

    create = async () => {
        const resp = await cartModel.create()
        return resp
    }

    getById = async (id) => {
        const resp = await cartModel.getById(id)
        return resp
    }
    
    addProduct = async (idCart, idProduct) => {
        const resp = await cartModel.addProduct(idCart, idProduct)
        return resp
    }
    
    deleteProduct = async (idCart, idProduct) => {
        const resp = await cartModel.deleteProduct(idCart, idProduct)
        return resp
    }
    
    deleteProducts = async (idCart) => {
        const resp = await cartModel.deleteProducts(idCart)
        return resp
    }
    
    updateProducts = async (idCart, products) => {
        const resp = await cartModel.updateProducts(idCart, products)
        return resp
    }
    
    updateQuantity = async (idCart, idProduct, quantity) => {
        const resp = await cartModel.updateQuantity(idCart, idProduct, quantity)
        return resp
    }

}

export const cartService = new CartService()