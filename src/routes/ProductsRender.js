import express from 'express';
import { ProductsModel } from '../DAO/models/products.model.js';

export const productsRender = express.Router();





productsRender.get("/", async (req, res, next) => {
    try{const products = await ProductsModel.find({}).lean().exec()
    return res.status(200).render("home", {products})
    }catch(err){
        console.log("error")
    }
})