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

    role: {
        type: String,
        default: "off"
    }
})

export const userModel = mongoose.model(collection, UsersSchema)
