import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'carts'

const cartSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                qty: {
                    type: Number,
                    required: true
                }
            }
        ]
    }

})

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(collection, cartSchema)