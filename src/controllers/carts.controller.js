import CartService from "../services/carts.services.js";

export default class CartController {
    constructor(){
        this.cartService = new CartService()   
    }

    addCartContoller = async() => {
        const result = this.cartService.addCartService()
        return result;
    }

    getCartByIdController = async(id) => {
        const result = await this.cartService.getCartByIdService(id)
        return result;
    }

    getCartByIdLeanController = async(id) => {
        const result = await this.cartService.getCartByIdLeanService(id)
        return result;
    }

    getCartsController = async() => {
        const result = await this.cartService.getCartsService()
        return result;
    }

    addProductToCartController = async (cid, pid) => {
        const result = await this.cartService. addProductToCartService(cid, pid)
        return result;
    }

    updateAllProductsFromCartController = async (cid, products) => {
        const result = await this.cartService.updateAllProductsFromCartService(cid,products)
        return result;
    }

    updateQtyProductFromCartController = async (cid,pid,qty) => {
        const result = await this.cartService.updateQtyProductFromCartService(cid,pid,qty)
        return result;
    }

    deleteProductFromCartController = async (cid, pid) => {
        const result = await this.cartService.deleteProductFromCartService(cid, pid)
        return result;
    }

    deleteAllProductsFromCartController = async (cid) => {
        const result = await this.cartService.deleteAllProductsFromCartService(cid)
        return result;
    }

}