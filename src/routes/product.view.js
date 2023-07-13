import express from 'express';
import { getAll } from '../services/products.service.js';
// import { isUser } from '../middlewares/index.js';

export const productRouterView = express.Router();

// productRouterView.get('/', isUser, async (req, res) => {
productRouterView.get('/', async (req, res) => {
    const { limit, page, sort, category, stock } = req.query
    const resp = await getAll(limit, page, sort, category, stock)
    // const userData = {
    //     firstname: req.session.user.firstname,
    //     lastname: req.session.user.lastname ,
    //     email: req.session.user.email,
    //     rol: req.session.user.isAdmin ? 'Admin' : 'Usuario'
    // }
    // resp.userData = userData
    // res.status(200).render('products', resp)
    res.status(200).render('products', resp)
});
