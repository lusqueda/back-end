import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/users.controller.js";

const router = Router();
const userController = new UserController()


router.put("/premiun/:uid",
    passport.authenticate('jwt',{session: false}),
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
   
export default router;