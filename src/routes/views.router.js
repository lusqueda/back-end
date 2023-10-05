import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import CartController from "../controllers/carts.controller.js";
import ViewsController from "../controllers/views.controller.js";
import passport from "passport";

const productController = new ProductController()
const cartController = new CartController()
const viewsController = new ViewsController()

const router = Router();

router.get("/realtimeproducts", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productController.getProductsController()
    res.render('realTimeProducts',{products})
})

router.get("/products", passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),  async(req,res)=>{
    let page = parseInt(req.query.page);
    let email = req.user.user.email;
    const result = await productController.paginateProductsController(page, email);
    res.render('products', result);
})

router.get(
    "/",
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    async (req, res) => {
      res.redirect("/views/products");
    }
  );

router.get("/carts/:cid", async(req,res)=>{
    const cartId = req.params.cid;
    let cart = await cartController.getCartByIdLeanController(cartId)
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

router.get('/resetPassword', viewsController.resetPassword);

router.get('/setPassword', 
    passport.authenticate('jwtResetPassword', {session: false, failureRedirect: 'resetPassword'}),
    viewsController.setPassword
);

router.get('/documents', 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.documents
);

export default router;