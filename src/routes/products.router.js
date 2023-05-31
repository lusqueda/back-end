import { Router } from "express";
import ProductManager from "../clasess/ProductManager.js";

const router = Router();
const productManager = new ProductManager()

router.get("/", async(req,res)=>{
    let limit = req.query.limit;

    const products = await productManager.getProducts(limit)
    res.send(products)
    //res.render('products',{products})
})


router.get("/:pid",productManager.verifyProductId, async(req,res)=>{
    let id = req.params.pid;
    
    const product = await productManager.getProductById(id)
    res.send(product)
})

router.post("/", async (req,res)=>{
    const product = req.body;

    const products = await productManager.addProduct(product)
    res.send({ status: 'Se agrego un nuevo producto' });
})

router.put("/:pid",productManager.verifyProductId, async (req,res)=>{
    const product = req.body;
    const id = req.params.pid;

    const products = await productManager.updateProduct(product,id)
    res.send({ status: 'Se modifico el producto' });
})

router.delete("/:pid",productManager.verifyProductId, async (req,res)=>{
    const id = req.params.pid;

    const products = await productManager.deleteProduct(id)
    res.send({ status: 'Se elimino el producto' });
})

export default router;