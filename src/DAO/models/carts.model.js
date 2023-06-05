import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


cartSchema.pre("findOne", function (){
    this.populate("items.productId")
})

cartSchema.pre("find", function() {
    this.populate("items.productId")
})

export const CartModel = model("carts", cartSchema)