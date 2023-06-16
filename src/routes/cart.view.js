import express from 'express';
import { getById } from '../services/carts.service.js';

export const cartRouterView = express.Router();

cartRouterView.get('/:cid', async (req, res) => {
    const payload = await getById(req.params.cid)
    res.status(200).render('cart', payload)
});
