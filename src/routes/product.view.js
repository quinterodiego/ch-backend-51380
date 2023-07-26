import express from 'express';
import { productController } from '../controllers/products.controller.js';

export const productsRouterView = express.Router();

productsRouterView.get('/', productController.getAllForView);