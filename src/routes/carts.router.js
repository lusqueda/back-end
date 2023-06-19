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

    const carts = await cartManager.addCart(cart)
    res.send({ status: 'Se agrego un nuevo carrito' });
})

router.post("/:cid/product/:pid", async (req,res)=>{
    const cart = req.params.cid;
    const product = req.params.pid;

    const carts = await cartManager.addProductToCart(cart,product)
    res.send({ status: 'Se agrego un producto al carrito' });
})

export default router;