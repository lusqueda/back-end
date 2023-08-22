export const rolesMiddlewareAdmin =  (req, res, next) => {
    if(req.user.user.role === 'on'){
        next()
    }else{
        res.send({error: `Acceso solo para Administradores.`})
    }
};

export const rolesMiddlewareUser =  (req, res, next) => {
    if(req.user.user.role === 'user'){
        next()
    }else{
        res.send({error: `Acceso solo para Usuarios.`})
    }
};