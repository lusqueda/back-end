import UserService from "../../services/users.services.js";

const userService = new UserService();

export const usersMiddlewareAuth = async (req, res, next) => {
    let user = await userService.getUserService(req.user.user.email)
    if(user){
        next()
    }else{
        res.send({error: `El usuario no existe.`})
    }
};

