import { Router } from "express";
import ProductManager from "../clasess/ProductManager.js";

const productManager = new ProductManager()
const router = Router();

router.get("/realtimeproducts", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts(limit)
    res.render('realTimeProducts',{products})
})


router.get("/", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts(limit)
    res.render('products',{products})
})


export default router;