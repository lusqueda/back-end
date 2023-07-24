import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

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
    let token = jwt.sign({ email: req.body.email }, "coderSecret", {
      expiresIn: "24h",
    });
    res
      .cookie("coderCookie", token, { httpOnly: true })
      .send({ status: "success" });
  }
);

router.get(
  '/current',
  passport.authenticate("jwt", {session: false}),
  (req,res) => {
    res.send(req.user);
  }
);

router.get("/faillogin", async (req, res) => {
  res.redirect('/login?e=error');
});

router.get("/deleteCookie", (req, res) => {
  try{
    res.clearCookie('coderCookie')
    res.redirect("/login");
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
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("exito");
    req.session.user = req.user;
    res.redirect("/products");
  }
);

export default router;
