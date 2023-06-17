import express from 'express';
import { getById } from '../services/carts.service.js';

export const cartRouterView = express.Router();

cartRouterView.get('/:cid', async (req, res) => {
    const resp = await getById(req.params.cid)
    const resp2 = {
        payload: resp
    }
    res.status(200).render('cart', resp2)
});
