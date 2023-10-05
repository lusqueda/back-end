import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/users.controller.js";
import { uploader } from "../utils.js";
import { usersDocuments } from "./middlewares/users.middleware.js";

const router = Router();
const userController = new UserController()

router.get("/:email",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        const user = await userController.getUserController(req.params.email);
        res.send({status: 'Usuario encontrado', user: user})
})

router.put("/premiun/:uid",
    passport.authenticate('jwt',{session: false}),
    usersDocuments,
    async(req, res) => {
        await userController.changeRoleController(req.uid,'premiun');
        res.send({status: 'El usuario ahora es Premiun'})
})

router.put("/user/:uid",
    passport.authenticate('jwt',{session: false}),
    async(req, res) => {
        await userController.changeRoleController(req.uid,'user');
        res.send({status: 'El usuario ahora es User'})
})

router.post("/:uid/documents",
    passport.authenticate('jwt',{session: false}),
    uploader.single('documents'),
    async(req, res) => {
        await userController.uploadFilesController(req.body.category,req.file.path,req.body.id);
        res.render('uploadFiles',{id: req.user.user._id, success: 'Se subio el archivo correctamente'})
})   

router.post("/products",
    passport.authenticate('jwt',{session: false}),
    uploader.single('products'),
    async(req, res) => {
        res.render('uploadFiles',{id: req.user.user._id, success: 'Se subio el archivo correctamente'})
})   

router.post("/:uid/profiles",
    passport.authenticate('jwt',{session: false}),
    uploader.single('profiles'),
    async(req, res) => {
        await userController.uploadFilesController(req.body.category,req.file.path,req.body.id);
        res.render('uploadFiles',{id: req.user.user._id, success: 'Se subio el archivo correctamente'})
})   


export default router;