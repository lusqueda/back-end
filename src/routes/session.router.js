import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { CurrentUserDTO } from "../controllers/dto/user.dto.js";
import envConfig from "../config/env.config.js";
import sessionsController from "../controllers/sessions.controller.js";
import UserController from "../controllers/users.controller.js";

const userController = new UserController()

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    session: false,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" });
  }
);

router.get("/failregister", async (req, res) => {
  console.log("Estrategia fallida");
  res.send({ error: "Fallido" });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/session/faillogin",
    session: false,
  }),
  async (req, res) => {
    let user = req.user;
    let token = jwt.sign({ user }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });
    await userController.updateConnectionController('login', user._id);
    res
      .cookie(process.env.COOKIE_KEY, token, { httpOnly: true })
      .send({ status: "success" });
  }
);

router.get(
  '/current',
  passport.authenticate("jwt", {session: false}),
  (req,res) => {
    res.send(new CurrentUserDTO(req.user));
  }
);

router.get("/faillogin", async (req, res) => {
  res.redirect('/views/login?e=error');
});

router.get("/deleteCookie", async (req, res) => {
  try{
    res.clearCookie(process.env.COOKIE_KEY)
    await userController.updateConnectionController('logout', req.query.id);
    res.redirect("/views/login");
  }catch(e){
    res.send({ status: "Logout ERROR", error: e });
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/views/login" }),
  async (req, res) => {
    console.log("exito");
    req.session.user = req.user;
    res.redirect("/views/products");
  }
);

router.post("/resetPassword", sessionsController.resetPassword);

router.post("/setPassword", sessionsController.setPassword);


export default router;
