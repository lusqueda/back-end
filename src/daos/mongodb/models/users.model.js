import mongoose from 'mongoose'

const collection = 'users'

const UsersSchema = new mongoose.Schema({

    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    documents: {
        type: [
            {
                name:{
                    type: String
                },
                reference: {
                    type: String
                }
            }
        ]
    },
    last_connection: {
        type: Date
    }

})

export const userModel = mongoose.model(collection, UsersSchema)
