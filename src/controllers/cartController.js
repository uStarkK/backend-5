import { CartModel } from "../DAO/models/carts.model.js";
import { ProductsModel } from "../DAO/models/products.model.js";
// GET Cart FROM DB
export const getCart = async (req, res) => {
    res.status(200).json(await CartModel.find({}))
}


// GET Cart FROM DB BY ID

export const getCartByid = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartFound = await CartModel.findOne({ _id: cartId })
        if (!cartFound) {
            return res.status(404).json({
                status: "Error",
                msg: "The cart you are looking for does not exist"
            })
        }
        cartFound.items.length < 1 ? res.status(200).json({
            status: "Success",
            msg: "Your cart is empty, let's start shopping!",
            cart: cartFound.items
        }) : res.status(200).json({
            cart: cartFound._id,
            Items: cartFound.items,
            createdAt: cartFound.createdAt
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// CREATE NEW Cart IN DB

export const createCart = async (req, res) => {
    try {
        const newCart = new CartModel({});

        const savedCart = await newCart.save();

        res.status(201).json(savedCart);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


// ADD PRODUCT TO CART 
export const addToCart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cartFound = await CartModel.findOne({ _id: cartId })
    if (!cartFound) {
        return res.status(404).json({
            status: "Error",
            msg: "The cart you are looking for does not exist"
        })
    }
    const productFound = await ProductsModel.findOne({ _id: productId })
    if (!productFound) {
        return res.status(404).json({
            status: "Error",
            msg: "Product does not exist"
        })
    }
    const result = await CartModel.findOneAndUpdate(
        {
            _id: cartId,
            items: {
                $elemMatch: { _id: productId }
            }
        },
        {
            $inc: { 'items.$.quantity': 1 }
        },
        {
            new: true
        }
    );
    console.log(result)

    if (result) {
        // Item already exists in the cart, quantity increased by 1
        res.status(200).json({
            status: "success",
            msg: "Quantity increased by 1",
            data: result
        })
    } else {
        // Item not found, add the product to the cart
        const cart = await CartModel.findOneAndUpdate(
            { _id: cartId },
            { $push: { items: { _id: productId, quantity: 1 } } },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            msg: "Product added to cart",
            data: cart
        })
    }
}


// DELETE Cart FROM DB 

export const deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        await CartModel.deleteOne({ _id: cid })
        return res.header('X-Message', 'Product successfully deleted').status(204).json()
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: 'Invalid input' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}