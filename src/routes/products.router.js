import { Router } from "express";
import ProductManager from "../daos/mongodb/ProductManager.js";

const router = Router();
const productManager = new ProductManager()

router.get("/", async(req,res) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    let sort = Number(req.query.sort)
    let filter = req.query.filter
    let filterValue = req.query.filterValue

    const products = await productManager.getProducts(
        limit, 
        page, 
        sort, 
        filter, 
        filterValue
    )

    res.send(products)
})

router.get("/:pid", async(req,res)=>{
    let id = req.params.pid;
    
    const product = await productManager.getProductById(id)
    res.send(product)
})

router.post("/", async (req,res)=>{
    const product = req.body;
    console.log(product);

    await productManager.addProduct(product)
    res.send({ status: 'Se agrego un nuevo producto' });
})

router.put("/:pid", async (req,res)=>{
    const product = req.body;
    const id = req.params.pid;

    const products = await productManager.updateProduct(product,id)
    res.send({ status: 'Se modifico el producto' });
})

router.delete("/:pid", async (req,res)=>{
    const id = req.params.pid;

    const products = await productManager.deleteProduct(id)
    res.send({ status: 'Se elimino el producto' });
})

export default router;