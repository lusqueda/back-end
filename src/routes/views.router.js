import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";
import passport from "passport";

const viewsController = new ViewsController()
const router = Router();

router.get("/realtimeproducts",
    viewsController.realtime
);

router.get("/products", 
    passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),
    viewsController.products
);

router.get("/product", 
    passport.authenticate("jwt", {failureRedirect: "/api/session/faillogin", session:false }),
    viewsController.product
);

router.get("/",
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.index
  );

router.get("/carts/:cid", 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.carts
);

router.get("/tickets", 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.tickets
);

router.get('/register', 
    viewsController.register
);

router.get('/login', 
    viewsController.login
);

router.get('/profile', 
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    viewsController.profile
);

router.get('/resetPassword', 
viewsController.resetPassword
);

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