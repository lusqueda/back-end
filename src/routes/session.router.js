import { Router } from "express";
import { userModel } from "../daos/mongodb/models/users.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;
  const exist = await userModel.findOne({ email });

  if (exist)
    return res
      .status(400)
      .send({ status: "error", message: "usuario ya registrado" });

  let result = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
    role,
  });
  res.send({ status: "success", message: "usuario  registrado" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password)
  const user = await userModel.findOne({ email: email, password: password });
  //console.log(user)
  if (user == null) return res.redirect('/api/login');
  req.session.user = {
    name: user.first_name +' '+ user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  res.send({ status: "success", message: req.session.user });
});


router.get("/logout", (req, res) => {
  req.session.destroy( err => {
      if(!err) res.redirect('/login')
      else res.send({status: 'Logout ERROR', body: err})
  })
})

export default router