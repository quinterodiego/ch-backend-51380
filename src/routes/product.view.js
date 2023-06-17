import express from 'express';
import { getAll } from '../services/products.service.js';

export const productRouterView = express.Router();

productRouterView.get('/', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const resp = await getAll(limit, page, query, sort)
    res.status(200).render('products', resp)
});
