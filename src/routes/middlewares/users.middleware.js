import ProductService from "../../services/products.services.js";

const productService = new ProductService();

export const usersMiddlewareAuth = async (req, res, next) => {
    if(req.user.user.role === "admin"){
        next()
    }else{
        if(req.user.user.role === "premiun"){
            let product = await productService.getProductByIdService(req.params.pid);
            if(product.owner === req.user.user.email){
                next()
            }else{
                res.status(402).send({error: `Solo puede realizar esta accion en productos propios.`})
            }
        }else{
            res.status(401).send({error: `Esta accion es solo para Administradores y usuarios Premiun.`})
        }        
    }
};

