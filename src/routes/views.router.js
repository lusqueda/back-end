import { Router } from "express";
import { userModel } from "../daos/mongodb/models/users.model.js";
import ProductManager from "../daos/mongodb/ProductManager.js";
import CartManager from "../daos/mongodb/CartManager.js";
import { productsModel } from "../daos/mongodb/models/products.model.js";
import passport from "passport";


const productManager = new ProductManager()
const cartManager = new CartManager()

const router = Router();

router.get("/realtimeproducts", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productManager.getProducts()

    res.render('realTimeProducts',{products})
})

router.get("/products", passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),  async(req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    let result = await productsModel.paginate({},{page,limit:5,lean:true})
    let user = await userModel.find({email: req.user.email}).lean();
    result.user = user
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid = !(page <= 0 || page > result.totalPages)
    result.isAuth = !(result.user == null)
    result.isAdmin = !(user[0].role != 'on')
    res.render('products', result)

})

router.get(
    "/",
    passport.authenticate("jwt", { failureRedirect: "/login", session:false }),
    async (req, res) => {
      res.redirect("/products");
    }
  );

router.get("/carts/:cid", async(req,res)=>{
    const cartId = req.params.cid;
    let cart = await cartManager.getCartByIdLean(cartId)
    res.render('carts', {cart})

})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login', { error: req.query.e });
})

router.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
})


export default router;