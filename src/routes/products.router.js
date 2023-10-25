import { Router } from "express";
import passport from "passport";
import ProductController from "../controllers/products.controller.js";
import UserService from "../services/users.services.js";
import { rolesMiddlewarePremiun } from "./middlewares/roles.middleware.js";
import { usersMiddlewareAuth } from "./middlewares/users.middleware.js";
import { verifyProductId } from "./middlewares/products.middleware.js";
import { emailDeleteProduct } from "../utils.js";
import CustomError from "../services/error/custom.class.js";
import { ErrorEnum } from "../services/error/enum.dictionary.js";
import { generateErrorInfo } from "../services/error/info.messages.js";

const router = Router();
const productController = new ProductController()
const userService = new UserService()

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

router.get("/:pid", 
    passport.authenticate('jwt',{session: false}),
    verifyProductId,
    async(req,res)=>{
        let id = req.params.pid;
        const product = await productController.getProductByIdContoller(id)
        res.send(product)
})

router.post("/", 
    passport.authenticate('jwt',{session: false}),
    rolesMiddlewarePremiun,
    async (req,res)=>{
        const product = req.body;
        product.owner = req.user.user.email;
        if(!product.title || !product.description || !product.category || !product.price || !product.stock){
             res.status(403).send({ status: 'Ingresar todos los campos obligatorios' });    
        }else{
            await productController.addProductContoller(product)
            res.send({ status: 'Se agrego un nuevo producto' });
        }
    }
)

router.put("/:pid", 
    passport.authenticate('jwt',{session: false}),
    verifyProductId,
    usersMiddlewareAuth,
    async (req,res)=>{
        const product = req.body;
        const id = req.params.pid;
        await productController.updateProductController(id,product)
        res.send({ status: 'Se modifico el producto' });
})

router.get("/delete/:pid", 
    passport.authenticate('jwt',{session: false}),
    verifyProductId,
    usersMiddlewareAuth,
    async (req,res)=>{
        const id = req.params.pid;
        const product = await productController.getProductByIdContoller(id)
        const user = await userService.getUserService(product.owner)
        user.role === 'premiun' ? emailDeleteProduct(product.owner, product.title) : null;
        await productController.deleteProductController(id);
        const error = `Se elimino el producto.`;
        res.redirect(`/views/products?e=${error}`);
    }
)

router.get("/mocking", (req, res) =>{
    res.send({error: 'Hola'})
})

export default router;