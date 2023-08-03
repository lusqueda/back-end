import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import { productsModel } from "./models/products.model.js";
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
        const result = await cartModel.findOne({ _id: id }).populate('products.product');
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


    verifyCartId = async (req, res, next) => {
        const cart = req.params.cid;
        let result = await cartModel.findOne({_id: cart});
        (result !== null) ? next() : res.send('No existe el carrito');
    }

    verifyProductId = async (req, res, next) => {
        const product = req.params.pid;
        let result = await productsModel.findOne({_id: product});
        (result !== null) ? next() : res.send('No existe el producto');
    }

    verifyProductBodyId = async (req, res, next) => {
        const product = req.body.product;
        let result = await productsModel.findOne({_id: product});
        (result !== null) ? next() : res.send('No existe el producto');
    }
}





