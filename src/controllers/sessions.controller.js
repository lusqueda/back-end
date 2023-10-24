import nodemailer from  "nodemailer";
import UserService from "../services/users.services.js";
import { createHash } from "../utils.js";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";

const userService = new UserService();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "clase30coderhouse@gmail.com",
        pass: "cjhlgutomdctqdhd",
    },
});  

const resetPassword = async (req, res) => {
    const {email} = req.body;
    if (!email){
        return res.status(401).send({status: "error", error: "Incomplete values"});
    }   
    try{
        const user = await userService.getUserService(email);
        if(user == null){
            return res.status(402).send({ status: "error", message: 'User not exist'})
        }
        let token = jwt.sign({email}, 'tokenReset', {expiresIn: '1h'})
        let result = await transport.sendMail({
            from: "hlusqueda@gmail.com",
            to: email,
            subject: "Correo Recuperacion",
            html: `
            <div style='color:blue'>
                <h1>Restaura tu password haciendo click en el siguiente link</h1>
                <a href='/setPassword?token=${token}&email=${email}'>Click Aqui</a>
            </div>`,
        })

        return res.send({status: "success", message: "Password updated"});
    }
    catch(error){
        return res.status(404).send({status: "error", error: error.message});
    }
}

const setPassword = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(401).send({status: "error", error: "Incomplete values"});
    }   
    try {
        const user = await userService.getUserService(email);
        if(compareSync(password, user.password)){
            return res.status(402).send({status: "error", message: "New and Old password are the same"});
        }
        const newHashedPassword = createHash(password);
        await userService.updatePasswordService(email,newHashedPassword);
        return res.send({status: "success", message: "Password updated"});
    } catch (error) {
        return res.status(404).send({status: "error", error: error.message})
    }
}    

 export default {
    resetPassword,
    setPassword
 }