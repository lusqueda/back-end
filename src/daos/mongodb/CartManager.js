import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.js";
import { productsModel } from "./models/products.model.js";


export default class CartManager {

    connection = mongoose.connect(
        'mongodb+srv://CoderUser:CoderPassword@codercluster.z7uinu4.mongodb.net/?retryWrites=true&w=majority'
    );

    productManager = new ProductManager();

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

    addProductToCart = async (cid, pid) => {
        const product = await this.productManager.getProductById(pid);
        const cart = await this.getCartById(cid);
        let exist = 0;

        if(product != null && cart != null){
            if(cart.products.length !== 0){
                cart.products.map(element => {
                    if(element.product._id == pid){
                        element.qty = element.qty + 1; 
                        exist = 1
                    }
                });
            }

            if(exist !== 1){
                cart.products.push({ product: product, qty: 1 });
            }
            
            await cart.save()
        }else{
            return false;
        }
        return true;
    }

    updateAllProductsFromCart = async (cid,products) => {
        const cart = await this.getCartById(cid);
        cart.products = [products];
        await cart.save();
        return;
    }

    updateQtyProductFromCart = async (cid,pid,qty) => {
        const cart = await this.getCartById(cid);
        let exist = 0;

        cart.products.map(element => {
            if(element.product._id == pid){
                element.qty = qty; 
                exist = 1;
            }
        });        

        if(exist === 1){
            await cart.save();
            return true
        }
        return false; 
    }

    deleteProductFromCart = async (cid, pid) => {
        const cart = await this.getCartById(cid);
        cart.products.pull(pid);
        await cart.save();
        return;
    }

    deleteAllProductsFromCart = async (cid) => {
        const cart = await this.getCartById(cid);
        cart.products = [];
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





