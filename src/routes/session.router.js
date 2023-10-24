import { Router } from "express";
import passport from "passport";
import envConfig from "../config/env.config.js";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    session: false,
  }),
  sessionsController.register
);

router.get("/failregister", 
  sessionsController.failregister
);

router.post("/login",
  passport.authenticate("login", {
    failureRedirect: "/api/session/faillogin",
    session: false,
  }),
  sessionsController.login
);

router.get('/current',
  passport.authenticate("jwt", {session: false}),
  sessionsController.current
);

router.get("/faillogin", 
  sessionsController.faillogin
);

router.get("/deleteCookie", 
  sessionsController.deleteCookie
);

router.get("/github",
  passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get("/githubcallback",
  passport.authenticate("github", { failureRedirect: "/views/login" }),
  sessionsController.githubcallback
);

router.post("/resetPassword", 
  sessionsController.resetPassword
);

router.post("/setPassword", 
  sessionsController.setPassword
);


export default router;
