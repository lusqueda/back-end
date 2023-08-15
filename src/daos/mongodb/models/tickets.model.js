import mongoose from "mongoose";
import uuid from "uuid-mongodb";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'tickets'

const TicketsSchema = new mongoose.Schema({

    code: {
        type: String,
        default: uuid.v1(),
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    purchase_datetime: {
        type : Date, 
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true    
    },
    purchaser: {
        type: String,
        required: true    
    },
    status: {
        type: String,
        required: true    
    }

})

TicketsSchema.plugin(mongoosePaginate)

export const ticketsModel = mongoose.model(collection, TicketsSchema)