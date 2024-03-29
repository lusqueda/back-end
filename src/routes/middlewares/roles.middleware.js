export const rolesMiddlewareAdmin =  (req, res, next) => {
    if(req.user.user.role === 'admin'){
        next()
    }else{
        res.status(407).send({error: `Acceso solo para Administradores.`})
    }
};

export const rolesMiddlewarePremiun =  (req, res, next) => {
    if(req.user.user.role === 'premiun' || req.user.user.role === 'admin'){
        next()
    }else{
        res.status(407).send({error: `Acceso solo para Usuarios Premiun.`})
    }
};

export const rolesMiddlewareUser =  (req, res, next) => {
    if(req.user.user.role === 'user'){
        next()
    }else{
        res.status(407).send({error: `Acceso solo para Usuarios.`})
    }
};

