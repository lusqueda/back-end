import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.js";


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

    getCarts = async () => {
        const result = await cartModel.find();
        return result
    }

    addProductToCart = async (cid, pid) => {
        const product = await this.productManager.getProductById(pid);
        const cart = await this.getCartById(cid);
        let qty = 0;
             
        cart.products.map(element => {
            if(element.product._id == pid){
                 element.qty = element.qty + 1; 
            }else{     
                cart.products.push({ product: product, qty: 1 });
            }
        });

        await cart.save()
        return;
    }

    updateCart = async (element,pid) => {
   
    }

    deleteCart = async (idSearch) => {
      
    }

}





