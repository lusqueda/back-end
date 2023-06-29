import { Router } from "express";
import ProductManager from "../daos/mongodb/ProductManager.js";
import CartManager from "../daos/mongodb/CartManager.js";
import { productsModel } from "../daos/mongodb/models/products.model.js";


const productManager = new ProductManager()
const cartManager = new CartManager()

const router = Router();

router.get("/realtimeproducts", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts()

    console.log(products)
    res.render('realTimeProducts',{products})
})

router.get("/products", async(req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    let result = await productsModel.paginate({},{page,limit:5,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result)
})

router.get("/carts/:cid", async(req,res)=>{
    const cartId = req.params.cid;
    let cart = await cartManager.getCartByIdLean(cartId)
    res.render('carts', {cart})

})


export default router;