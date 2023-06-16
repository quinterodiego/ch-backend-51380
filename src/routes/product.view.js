import express from 'express';
import { getAllWithPaginate } from '../services/products.service.js';

export const productRouterView = express.Router();

productRouterView.get('/', async (req, res) => {
    const { limit, page, query, sort } = req.query
    const resp = await getAllWithPaginate(limit, page, query, sort)
    res.status(200).render('products', resp)
});
