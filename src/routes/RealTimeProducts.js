import express from 'express';
import { ProductManager } from '../class.js';

const data = new ProductManager("./products.json")
export const realTimeProducts = express.Router();





realTimeProducts.get('/', async (req, res) => {
    const products = await data.getAll()
    res.render('realTimeProducts', {products})
})