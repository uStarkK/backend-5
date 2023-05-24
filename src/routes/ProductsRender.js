import express from 'express';
import { ProductManager } from '../class.js';

const data = new ProductManager("./products.json")
export const productsRender = express.Router();





productsRender.get("/", async (req, res, next) => {
    const products = await data.getAll()
    return res.status(200).render("home", {products})
})