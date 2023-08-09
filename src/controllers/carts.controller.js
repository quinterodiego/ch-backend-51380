import { cartService } from "../services/carts.service.js";
import { cartService } from './../services/carts.service';

class CartController {

    create = async (req, res) => {
        const resp = await cartService.create()
        res.status(201).send({
            "status": "success",
            "message": resp 
        })
    }

    getById = async (req, res) => {
        const id = req.params.cid
        const resp = await cartService.getById(id)
        res.status(200).send({
            "status": "success",
            "payload": resp
        })
    }

    getByIdForView = async (req, res) => {
        const resp = await cartService.getById(req.params.cid)
        const resp2 = {
            payload: resp
        }
        res.status(200).render('cart', resp2)
    }

    addProduct = async (req, res) => {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const resp = await cartService.addProduct(idCart, idProduct)
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    deleteProduct = async (req, res) => {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const resp = await cartService.deleteProduct(idCart, idProduct)
        
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    deleteProducts = async (req, res) => {
        const idCart = req.params.cid
        const products = req.body.products
        const resp = await cartService.deleteProducts(idCart, products)
        
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    updateQuantity = async (req, res) => {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        const quantity = req.body.quantity
        const resp = await cartService.updateQuantity(idCart, idProduct, quantity)
        
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    updateProducts = async (req, res) => {
        const idCart = req.params.cid
        const resp = await cartService.updateProducts(idCart)
        
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    purchase = async (req, res) => {
        const idCart = req.params.cid
        const resp = await cartService.purchase(idCart)
    }
}

export const cartController = new CartController()