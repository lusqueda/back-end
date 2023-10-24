import UserController from "./users.controller.js";

const userController = new UserController()

export default class ViewsController 
{
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