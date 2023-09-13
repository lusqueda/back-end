import CartService from "../../services/carts.services.js";
import ProductService from "../../services/products.services.js";

const cartService = new CartService();
const productService = new ProductService();


export const CheckCartOwner = async (req, res, next) =>{
    if(req.user.user.cart === req.params.cid){
        if(req.user.user.role === "premiun"){
            let product = await productService.getProductByIdService(req.params.pid);
            if(product.owner !== req.user.user.email){
                next()
            }else{
                res.send({error: `No puede agregar productos propios.`})
            }
        }else{
            next()
        }
    }else{
        res.send({error: `Solo el propietario del carrito puede agregar productos.`});
    } 
}

export const verifyCartId = async (req, res, next) => {
    const cart = req.params.cid;
    let result = await cartService.getCartByIdService(cart);
    (result !== null) ? next() : res.send('No existe el carrito');
}
