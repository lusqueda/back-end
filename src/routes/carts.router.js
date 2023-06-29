import { Router } from "express";
import CartManager from "../daos/mongodb/CartManager.js";
import ProductManager from "../daos/mongodb/ProductManager.js";

const router = Router();
const cartManager = new CartManager()
const productManager = new ProductManager()


router.get("/",async (req,res)=>{ 
    const carts = await cartManager.getCarts()
    res.send(carts)
})

router.get("/:cid", async(req,res)=>{
    let id = req.params.cid;

    const cart = await cartManager.getCartById(id)
    res.send(cart)
})

router.post("/", async (req,res)=>{
    const cart = req.body;

    await cartManager.addCart(cart)
    res.send({ status: 'Se agrego un nuevo carrito' });
})

router.post("/:cid/product/:pid", cartManager.verifyCartId, cartManager.verifyProductId, async (req,res)=>{
    const cart = req.params.cid;
    const product = req.params.pid;

    await cartManager.addProductToCart(cart,product);
    res.send({ status: 'Se agrego un producto al carrito' });
})

router.put("/:cid", cartManager.verifyCartId, cartManager.verifyProductBodyId, async (req,res)=>{
    const cart = req.params.cid;
    const products = req.body;

    await cartManager.updateAllProductsFromCart(cart,products)
    res.send({ status: 'Se actualizo todo el carrito' });
})

router.put("/:cid/product/:pid", cartManager.verifyCartId, cartManager.verifyProductId, async (req,res)=>{
    const cart = req.params.cid;
    const product = req.params.pid;
    const qty = req.body.qty;

    await cartManager.updateQtyProductFromCart(cart,product,qty)
    res.send({ status: 'Se actualizo la cantidad del producto' });
})

router.delete("/:cid/product/:pid", cartManager.verifyCartId, async (req,res)=>{
    const cart = req.params.cid;
    const product = req.params.pid;

    await cartManager.deleteProductFromCart(cart,product);
    res.send({ status: 'Se elimino un producto del carrito' });

})

router.delete("/:cid", cartManager.verifyCartId, async (req,res)=>{
    const cart = req.params.cid;
    await cartManager.deleteAllProductsFromCart(cart)
    res.send({ status: 'Se eliminaron todos los productos del carrito' });
})

export default router;