import express from 'express';
import { getAll } from '../services/products.service.js';
import { isUser } from '../middlewares/index.js';

export const productRouterView = express.Router();

productRouterView.get('/', isUser, async (req, res) => {
    const { limit, page, sort, category, stock } = req.query
    const resp = await getAll(limit, page, sort, category, stock)
    const userData = {
        firstname: req.session.firstname,
        lastname: req.session.lastname ,
        email: req.session.email,
        rol: req.session.isAdmin ? 'Admin' : 'Usuario'
    }
    resp.userData = userData
    res.status(200).render('products', resp)
});
