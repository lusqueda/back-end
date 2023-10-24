import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import CartController from "../controllers/carts.controller.js";
import ViewsController from "../controllers/views.controller.js";
import TicketController from "../controllers/tickets.controller.js";
import passport from "passport";

const productController = new ProductController()
const cartController = new CartController()
const viewsController = new ViewsController()
const ticketController = new TicketController()

const router = Router();

router.get("/realtimeproducts", async(req,res)=>{
    let limit = req.query.limit;
    const products = await productController.getProductsController()
    res.render('realTimeProducts',{products})
})

router.get("/products", 
    passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),
    async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await productController.paginateProductsController(page, email);
        result.success = req.query.success;
        result.error = req.query.e;
        res.render('products', result);
})

router.get("/product", 
    passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),
    async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await productController.paginateProductsController(page, email);
        result.success = req.query.success;
        result.error = req.query.e;
        res.render('product', result);
})

router.get("/",
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    async (req, res) => {
      res.redirect("/views/products");
    }
  );

router.get("/carts/:cid", 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    async(req,res)=>{
        let result = await cartController.paginateCartsController(req.params.cid,req.user.user._id,req.query.qty)
        result.success = req.query.success;
        res.render('carts', result );
})

router.get("/tickets", 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        let result = await ticketController.paginateTicketsController(page, email)
        result.success = req.query.success;
        res.render('tickets', result );
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login', { error: req.query.e, success: req.params.msg });
})

router.get('/profile', 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.profile
);

router.get('/resetPassword', viewsController.resetPassword);

router.get('/setPassword', 
    passport.authenticate('jwtResetPassword', {session: false, failureRedirect: 'resetPassword'}),
    viewsController.setPassword
);

router.get('/documents', 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.documents
);

router.get("/users", 
    passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),  
    viewsController.paginateUsers
)

export default router;