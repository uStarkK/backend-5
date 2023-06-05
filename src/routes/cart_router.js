import express from 'express';
import { addToCart, createCart, deleteCart, getCart, getCartByid } from '../controllers/cartController.js';



export const cartRouter = express.Router();


cartRouter.get('/', getCart);

cartRouter.get("/:cid", getCartByid)

cartRouter.post("/", createCart)

cartRouter.post("/:cid/products/:pid", addToCart)

cartRouter.delete("/:cid", deleteCart)

cartRouter.get("*", (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})