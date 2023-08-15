import CartManager from "../daos/mongodb/CartManager.js";
import ProductManager from "../daos/mongodb/ProductManager.js";

export default class CartService {
    constructor(){
        this.productDao = new ProductManager(),
        this.cartDao = new CartManager()
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
        const product = await this.productDao.getProductById(pid);
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
            
            await this.cartDao.addProductToCart(cart);
        }else{
            return false;
        }

        return true;
    }

    updateAllProductsFromCartService = async (cid,products) => {
        const cart = await this.getCartByIdService(cid);
        cart.products = [products];
        await this.cartDao.updateAllProductsFromCart(cart)
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
            await this.cartDao.updateQtyProductFromCart(cart);
            return true
        }
        return false; 
    }

    deleteProductFromCartService = async (cid, pid) => {
        const cart = await this.getCartByIdService(cid);
        cart.products.pull(pid);
        await this.cartDao.deleteProductFromCart(cart)
        return ;
    }

    deleteAllProductsFromCartService = async (cid) => {
        const cart = await this.getCartByIdService(cid);
        cart.products = [];
        await this.cartDao.deleteProductFromCart(cart)
        return;
    }

    purchaseCartService = async (cid, user) => {
        let ticket = {}
        let items = []
        let productss = []
        let amount = 0;
        let i = 0;

        const cart = await this.getCartByIdService(cid);
        const products =  await this.productDao.getAllProducts();

        cart.products.map(element => {
             items.push({ product: element.product, qty: element.qty })
        }); 

        items.forEach(element => {
            i++
            products.map(elements => {
                if(element.product.id == elements.id){
                    if(elements.stock >= element.qty){
                        amount = parseInt(elements.price) + amount;
                        productss.push({ product: elements.id, qty: element.qty, price: elements.price })
                    }
                }     
            });
        });

        if(cart.products.length == i){
            ticket.amount = amount;
            ticket.products = productss;
            ticket.purchaser = user.user.email
            ticket.status = 'compra finalizada'
            await this.cartDao.purchaseCart(ticket)
        }

    }

}