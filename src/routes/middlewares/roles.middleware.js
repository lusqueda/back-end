export const rolesMiddlewareAdmin =  (req, res, next) => {
    console.log(req.user);
    if(req.user.user.role === 'admin'){
        next()
    }else{
        res.send({error: `Acceso solo para Administradores.`})
    }
};

export const rolesMiddlewareUser =  (req, res, next) => {
    console.log(req.user);
    if(req.user.user.role === 'user'){
        next()
    }else{
        res.send({error: `Acceso solo para Usuarios.`})
    }
};