import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/",
    passport.authenticate("jwt", { failureRedirect: "/views/login", session:false }),
    async (req,res)=>{ 
        res.redirect('/views/products')
})

export default router;