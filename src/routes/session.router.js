import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate('register',{failureRedirect:'/failregister'}), async (req, res) => {
  res.send({status: "success", message: "Usuario registrado"})
});

router.get("/failregister", async (req, res) => {
  console.log("Estrategia fallida")
  res.send({error: "Fallido"})
});

router.post("/login",passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req, res) => {
  if(!req.user) return res.status(400).send({status:"error", error:"Credenciales invalidas"})
  req.session.user = {
    first_name : req.user.first_name,
    last_name : req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role
  }
  res.send({status: "success", payload:req.user})
});

router.get("/faillogin", async (req, res) => {
  res.send({error: "Login fallido"})
});

router.get("/logout", (req, res) => {
  req.session.destroy( err => {
      if(!err) res.redirect('/login')
      else res.send({status: 'Logout ERROR', body: err})
  })
})

router.get("/github", passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get('/githubcallback',passport.authenticate('github', {failureRedirect: '/login'}),async (req, res)=>{
  console.log('exito')
  req.session.user = req.user
  res.redirect('/products')
} )

export default router