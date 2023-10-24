import UserController from "./users.controller.js";
import TicketController from "./tickets.controller.js";
import CartController from "./carts.controller.js"
import ProductController from "./products.controller.js";

const userController = new UserController()
const ticketController = new TicketController()
const productController = new ProductController()
const cartController = new CartController()

export default class ViewsController 
{
    realtime =  async(req,res)=>{
        let limit = req.query.limit;
        const products = await productController.getProductsController()
        res.render('realTimeProducts',{products})
    }
    
    products = async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await productController.paginateProductsController(page, email);
        result.success = req.query.success;
        result.error = req.query.e;
        res.render('products', result);
    }

    product = async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await productController.paginateProductsController(page, email);
        result.success = req.query.success;
        result.error = req.query.e;
        res.render('product', result);
    }

    index = async (req, res) => {
        res.redirect("/views/products");
    }

    carts = async(req,res)=>{
        let result = await cartController.paginateCartsController(req.params.cid,req.user.user._id,req.query.qty)
        result.success = req.query.success;
        res.render('carts', result );
    }

    tickets = async(req,res)=>{
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        let result = await ticketController.paginateTicketsController(page, email)
        result.success = req.query.success;
        res.render('tickets', result );
    }

    register = (req, res) => {
        res.render('register');
    }

    login = (req, res) => {
        res.render('login', { error: req.query.e, success: req.params.msg });
    }

    resetPassword = async (req, res) => {
        res.render('resetPassword');   
    }

    setPassword = async (req, res) => {
        res.render('setPassword', { email: req.query.email });   
    }

    documents = async (req, res) => {
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await userController.paginateUsersController(page, email);
        res.render('uploadFiles', result);   
    }

    paginateUsers = async (req,res) => {
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await userController.paginateUsersController(page, email);
        result['error'] = req.query.e;
        result['success'] = req.query.msg;
        res.render('users', result);   
    }

    profile = async (req,res) => {
        let page = parseInt(req.query.page);
        let email = req.user.user.email;
        const result = await userController.paginateUsersController(page, email);
        res.render('profile', result);
    }
}