import CartManager from "../daos/mongodb/CartManager.js";
import ProductService from "./products.services.js";

export default class CartService {
    constructor(){
        this.cartDao = new CartManager(),
        this.productService = new ProductService()
    }

    addCartService = async () => {
        const result = await this.cartDao.addCart()
        return result;
    }

    getCartByIdService = async (id) => {
        const result = await this.cartDao.getCartById(id)
        return result;
    }

    getCartByIdLeanService = async (id) => {
        const result = await this.cartDao.getCartByIdLean(id)
        return result;
    }

    getCartsService = async () => {
        const result = await this.cartDao.getCarts()
        return result;
    }

    addProductToCartService = async (cid, pid) => {
        const product = await this.productService.getProductByIdService(pid);
        const cart = await this.getCartByIdService(cid);
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
            
            await this.cartDao.cartSave(cart);
        }else{
            return false;
        }

        return true;
    }

    updateAllProductsFromCartService = async (cid,products) => {
        const cart = await this.getCartByIdService(cid);
        cart.products = [products];
        await this.cartDao.cartSave(cart)
        return;
    }

    updateQtyProductFromCartService = async (cid,pid,qty) => {
    const cart = await this.getCartByIdService(cid);
        let exist = 0;

        cart.products.map(element => {
            if(element.product._id == pid){
                element.qty = qty; 
                exist = 1;
            }
        });        

        if(exist === 1){
            await this.cartDao.cartSave(cart);
            return true
        }
        return false; 
    }

    deleteProductFromCartService = async (cid, pid) => {
        const cart = await this.getCartByIdService(cid);
        cart.products.pull(pid);
        await this.cartDao.cartSave(cart)
        return ;
    }

    deleteAllProductsFromCartService = async (cid) => {
        const cart = await this.getCartByIdService(cid);
        cart.products = [];
        await this.cartDao.cartSave(cart)
        return;
    }

}