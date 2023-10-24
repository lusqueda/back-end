import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import multer from "multer";
import nodemailer from "nodemailer";


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
} 

export const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
} 

export const generateProducts = () => {
    return{
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            price: faker.commerce.price(),
            stock: faker.number.int(1000)
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname + "/files/" + file.fieldname);
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    },
});

export const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err); 
        next();
    }
})

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "clase30coderhouse@gmail.com",
        pass: "cjhlgutomdctqdhd",
    },
});  

export const emailDelete = async (email) => {
    await transport.sendMail({
        from: "hlusqueda@gmail.com",
        to: email,
        subject: "Correo Informativo",
        html: `
        <div style='color:blue'>
            <h1>Cuenta Eliminada</h1>
            <p>Tu cuenta con el email: ${email}, registrado en nuestro e-commerce ha sido eliminada por inactividad.</p>
            <p>Saludos</p>
        </div>`,
    })

}