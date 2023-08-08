import { productService } from './../services/products.service.js';

class ProductController {
    
    create =  async (req, res) => {
        const product = req.body
        const resp = await productService.create(product)
        res.status(200).send({
            "status": "success",
            "payload": resp
        })
    }
    
    getAll = async (req, res) => {
        const { limit, page, sort, category, stock } = req.query
        const products = await productService.getAll(limit, page, sort, category, stock)
        return res.json({
            status: 'success',
            payload: products
        })
    }
    
    getById = async (req, res) => {
        const id = req.params.pid
        const product = await productService.getById(id)
        if(product) {
            res.status(200).send({ 
                "status": "success",
                "payload": product
            })
        } else {
            res.send({ error: 'Producto no encontrado'})
        }
    }

    getAllForView = async (req, res) => {
        const { limit, page, sort, category, stock } = req.query
        const resp = await productService.getAll(limit, page, sort, category, stock)
        resp.userData = req.user
        res.status(200).render('products', resp)
    }

    update = async (req, res) => {
        const id = req.params.pid
        const updates = req.body    
        const resp = await productService.update(id, updates)
        res.status(201).send({
            "status": "success",
            "message": resp
        })
    }

    delete = async (req, res) => {
        const id = req.params.pid
        const resp = await productService.delete(id)
        res.status(200).send({
            "status": "success",
            "message": resp
        })
    }
}

export const productController = new ProductController()
