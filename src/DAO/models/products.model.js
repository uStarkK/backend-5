//@ts-check
import { model, Schema } from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code:{
        type: String,
        required:true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})


export const ProductsModel = model("products", productsSchema)