import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/users.controller.js";
import { uploader } from "../utils.js";
import { usersDocuments } from "./middlewares/users.middleware.js";

const router = Router();
const userController = new UserController()


router.get("/",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        const users = await userController.getUsersController();
        res.send({status: 'Lista de Usuarios', users: users})
})

router.delete("/",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        const users = await userController.deleteInactiveController();
        res.send({status: 'Usuarios inactivos eliminados'})
})

router.get("/:email",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        const user = await userController.getUserController(req.params.email);
        res.send({status: 'Usuario encontrado', user: user})
})

router.post("/premiun/:uid",
    passport.authenticate('jwt',{session: false}),
    usersDocuments,
    async(req, res) => {
        await userController.changeRoleController(req.params.uid,'premiun');
        let success = 'El usuario ahora es Premiun'
        res.redirect(`/views/users?msg=${success}`);
})

router.post("/user/:uid",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        await userController.changeRoleController(req.params.uid,'user');
        let success = 'El usuario ahora es User'
        res.redirect(`/views/users?msg=${success}`);
})

router.post("/:uid/documents",
    passport.authenticate('jwt',{session: false}),
    uploader.single('documents'),
    async(req, res) => {
        let page = parseInt(req.query.page);
        await userController.uploadFilesController(req.body.category,req.file.path,req.body.id);
        const result = await userController.paginateUsersController(page, req.user.user.email);
        result.success = 'Se subio el archivo correctamente';
        res.render('uploadFiles', result)
})   

router.post("/products",
    passport.authenticate('jwt',{session: false}),
    uploader.single('products'),
    async(req, res) => {
        let page = parseInt(req.query.page);
        await userController.uploadFilesController(req.body.category,req.file.path,req.body.id);
        const result = await userController.paginateUsersController(page, req.user.user.email);
        result.success = 'Se subio el archivo correctamente';
        res.render('uploadFiles', result)
})   

router.post("/:uid/profiles",
    passport.authenticate('jwt',{session: false}),
    uploader.single('profiles'),
    async(req, res) => {
        let page = parseInt(req.query.page);
        await userController.uploadFilesController(req.body.category,req.file.path,req.body.id);
        const result = await userController.paginateUsersController(page, req.user.user.email);
        result.success = 'Se subio el archivo correctamente';
        res.render('uploadFiles', result)
})   

router.post("/delete/:uid", 
    passport.authenticate('jwt',{session: false}),
    async (req,res)=>{
        const id = req.params.uid;
        if(id !== req.user.user._id){
            await userController.deleteUserController(id)
            const success = `Se elimino el usuario.`;
            res.redirect(`/views/users?msg=${success}`);
        }else{
            const error = `No se puede eliminar el usuario actual.`;
            res.redirect(`/views/users?e=${error}`);
        }    
})

export default router;