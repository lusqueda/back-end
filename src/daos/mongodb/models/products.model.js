import mongoose from "mongoose";
import uuid from "uuid-mongodb";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'products'

const ProductsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        default: uuid.v1(),
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true    
    },
    stock: {
        type: Number,
        required: true    
    },
    owner: {
        type: String,
        default: 'admin'    
    }

})

ProductsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(collection, ProductsSchema)