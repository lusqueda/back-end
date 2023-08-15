import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import passport from "passport";
import { rolesMiddlewareAdmin } from "./middlewares/roles.middleware.js";

const router = Router();
const productController = new ProductController()

router.get("/", async(req,res) => {
    let limit = Number(req.query.limit)
    let page = Number(req.query.page)
    let sort = Number(req.query.sort)
    let filter = req.query.filter
    let filterValue = req.query.filterValue
    const products = await productController.getProductsController(
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
    const product = await productController.getProductByIdContoller(id)
    res.send(product)
})

router.post("/", 
    passport.authenticate('jwt',{session: false}),
    rolesMiddlewareAdmin,
    async (req,res)=>{
        const product = req.body;
        await productController.addProductContoller(product)
        res.send({ status: 'Se agrego un nuevo producto' });
    }
)

router.put("/:pid", async (req,res)=>{
    const product = req.body;
    const id = req.params.pid;
    await productController.updateProductController(product,id)
    res.send({ status: 'Se modifico el producto' });
})

router.delete("/:pid", 
    passport.authenticate('jwt',{session: false}),
    rolesMiddlewareAdmin,
    async (req,res)=>{
        const id = req.params.pid;
        await productController.deleteProductController(id)
        res.send({ status: 'Se elimino el producto' });
    }
)

export default router;