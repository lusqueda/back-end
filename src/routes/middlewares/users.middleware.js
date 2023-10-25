import ProductService from "../../services/products.services.js";
import UserService from "../../services/users.services.js";

const productService = new ProductService();
const userService = new UserService();

export const usersMiddlewareAuth = async (req, res, next) => {
    if(req.user.user.role === "admin"){
        next()
    }else{
        if(req.user.user.role === "premiun"){
            let product = await productService.getProductByIdService(req.params.pid);
            if(product.owner === req.user.user.email){
                next()
            }else{
                const error = `Solo puede realizar esta accion en productos propios.`;
                res.status(402).redirect(`/views/products?e=${error}`);
            }
        }else{
            res.status(403).send({error: `Esta accion es solo para Administradores y usuarios Premiun.`})
        }        
    }
};

export const usersDocuments = async (req, res, next) => {
    let cuenta = 0;
    let domicilio = 0;
    let identificacion = 0;
    let avatar = 0;

    const user = await userService.getUserByIdService(req.params.uid);
    user.documents.forEach(element => {
        if(element.name !== "identificacion"){
            if(element.name !== "domicilio"){
                if(element.name !== "cuenta"){
                    avatar = 1;
                }else{
                    cuenta = 1;
                }
            }else{
                domicilio = 1;
            }
        }else{
            identificacion = 1;
        }

    });

    let msg = '';
    if(cuenta != 1){
        msg = msg + ' Comprobante de estado de cuenta';
    }

    if(domicilio != 1){
        msg = msg + ' Comprobante de domicilio';
    }

    if(identificacion == 0){
        msg = msg + ' Identificacion';
    }
    if(msg == ''){
        next()
    }else{
        const error = `Falta subir la siguiente ducumentacion: ${msg}`;
        res.status(402).redirect(`/views/users?e=${error}`);
    }
};
