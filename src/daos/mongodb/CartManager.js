import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import { ticketsModel } from "./models/tickets.model.js";

import envConfig from "../../config/env.config.js";


export default class CartManager {

    connection = mongoose.connect(
        envConfig.mongoUrl
    );

    addCart = async () => {
        const result = await cartModel.create({ products: [] });
        return result
    }

    getCartById = async (id) => {
        const result = await cartModel.findOne({ _id: id });
        return result
    }

    getCartByIdLean = async (id) => {
        const result = await cartModel.find({ _id: id }).populate('products.product').lean();
        return result
    }

    getCarts = async () => {
        const result = await cartModel.find();
        return result
    }

    getCarts = async () => {
        const result = await cartModel.find();
        return result
    }

    addProductToCart = async (cart) => {
        await cart.save();
        return;
    }

    updateAllProductsFromCart = async (cart) => {
        await cart.save();
        return;
    }

    updateQtyProductFromCart = async (cart) => {
        await cart.save();
        return;
    }

    deleteProductFromCart = async (cart) => {
        await cart.save();
        return;
    }

    deleteAllProductsFromCart = async (cart) => {
        await cart.save();
        return;
    }

    purchaseCart = async (ticket) => {
        const result = await ticketsModel.create(ticket)
        return result
    }

}





