import express from 'express';
import { getAll } from '../services/products.service.js';

export const productRouterView = express.Router();

productRouterView.get('/', async (req, res) => {
    const { limit, page, sort, category, stock } = req.query
    const resp = await getAll(limit, page, sort, category, stock)
    res.status(200).render('products', resp)
});
