import { Router } from "express";
import ProductManager from "../daos/mongodb/ProductManager.js";
import CartManager from "../daos/mongodb/CartManager.js";
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
    let email = req.user.email;
    const result = await productManager.paginateProducts(page, email);
    res.render('products', result);
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
    res.render('carts', {cart});
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