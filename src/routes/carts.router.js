import { Router } from "express";
import CartManager from "../daos/mongodb/CartManager.js";
import CartController from "../controllers/carts.controller.js";
import { CheckCartOwner, verifyCartId } from "./middlewares/carts.middleware.js";
import passport from "passport";
import { verifyProductBodyId, verifyProductId } from "./middlewares/products.middleware.js";

const router = Router();
const cartManager = new CartManager()
const cartController = new CartController()

router.get("/",async (req,res)=>{ 
    const carts = await cartController.getCartsController()
    res.send(carts)
})

router.get("/:cid", 
    verifyCartId,
    async(req,res)=>{
        const id = req.params.cid;
        const cart = await cartController.getCartByIdController(id)
        res.send({ status: 'Carrito encontrado', cart: cart });
})

router.post("/", async (req,res)=>{
    const result = await cartController.addCartContoller()
    res.send({ status: 'Se agrego un nuevo carrito', cart: result });
})

router.post("/:cid/product/:pid",
    passport.authenticate('jwt', {session:false}), 
    verifyProductId, 
    verifyCartId, 
    CheckCartOwner, 
    async (req,res)=>{
        const cart = req.params.cid;
        const product = req.params.pid;
        await cartController.addProductToCartController(cart,product);
        const msg = 'Se agrego un producto al carrito.'
        res.redirect(`/views/products?success=${msg}`);
})

router.put("/:cid", 
    passport.authenticate('jwt', {session:false}), 
    verifyProductBodyId, 
    verifyCartId, 
    async (req,res)=>{
        const cart = req.params.cid;
        const products = req.body;
        await cartController.updateAllProductsFromCartController(cart,products)
        res.send({ status: 'Se actualizo todo el carrito' });
})

router.put("/:cid/product/:pid", 
    passport.authenticate('jwt', {session:false}), 
    verifyCartId, 
    verifyProductId, 
    async (req,res)=>{
        const cart = req.params.cid;
        const product = req.params.pid;
        const qty = req.body.qty;
        await cartController.updateQtyProductFromCartController(cart,product,qty)
        res.send({ status: 'Se actualizo la cantidad del producto' });
})

router.get("/:cid/product/:pid", 
    passport.authenticate('jwt', {session:false}), 
    verifyCartId, 
    async (req,res)=>{
        const cart = req.params.cid;
        const product = req.params.pid;
        await cartController.deleteProductFromCartController(cart,product);
        const msg = 'Se elimino un producto del carrito.'
        res.redirect(`/views/carts/${cart}?success=${msg}`);
})

router.delete("/:cid",
    passport.authenticate('jwt', {session:false}), 
    verifyCartId, 
    async (req,res)=>{
        const cart = req.params.cid;
        await cartController.deleteAllProductsFromCartController(cart)
        res.send({ status: 'Se eliminaron todos los productos del carrito' });
})

router.post("/:cid/purchase", 
    passport.authenticate("jwt", {session:false}),
    verifyCartId, 
    async (req,res)=>{
        const cart = req.params.cid;
        await cartController.purchaseCartController(cart,req.user)
        const msg = 'Se realizo la compra con exito.';
        res.redirect(`/views/carts/${cart}?success=${msg}`);
    }
)

export default router;