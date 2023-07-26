import express from 'express';
import { cartController } from '../controllers/carts.controller.js';

export const cartRouterView = express.Router();

cartRouterView.get('/:cid', cartController.getByIdForView);
