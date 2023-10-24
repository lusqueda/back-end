import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/users.controller.js";
import { uploader } from "../utils.js";
import { usersDocuments } from "./middlewares/users.middleware.js";

const router = Router();
const userController = new UserController()

router.get("/",
    passport.authenticate('jwt',{session: false}),
    userController.getUsersController
);

router.delete("/",
    passport.authenticate('jwt',{session: false}),
    userController.deleteInactiveController
);

router.get("/:email",
    passport.authenticate('jwt',{session: false}),
    userController.getUserController
);

router.post("/premiun/:uid",
    passport.authenticate('jwt',{session: false}),
    usersDocuments,
    userController.changeRoleController
);

router.post("/user/:uid",
    passport.authenticate('jwt',{session: false}),
    userController.changeRoleController
);


router.post("/:uid/documents",
    passport.authenticate('jwt',{session: false}),
    uploader.single('documents'),
    userController.uploadFilesController
);   

router.post("/products",
    passport.authenticate('jwt',{session: false}),
    uploader.single('products'),
    userController.uploadFilesController
);   

router.post("/:uid/profiles",
    passport.authenticate('jwt',{session: false}),
    uploader.single('profiles'),
    userController.uploadFilesController
);   

router.post("/delete/:uid", 
    passport.authenticate('jwt',{session: false}),
    userController.deleteUserController    
);

export default router;