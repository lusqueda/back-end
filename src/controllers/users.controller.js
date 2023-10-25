import UserService from "../services/users.services.js";

export default class UserController {
    constructor(){
        this.userService = new UserService()   
    }

    updatePasswordController = async (email, element) => {
        const result = this.userService.updatePasswordService(email, element)
        return result;
    }

    getUsersController =  async (req, res) => {
        const users = await this.userService.getUsersService();
        res.send({status: 'Lista de Usuarios', users: users})
    }

    deleteInactiveController = async (req, res) => {
        const users = await this.userService.deleteInactiveService();
        res.send({status: 'Usuarios inactivos eliminados'})
    }
    
    deleteUserController = async (req,res) => {
        const id = req.params.uid;
        if(id !== req.user.user._id){
            await this.userService.deleteUserService(id)
            const success = `Se elimino el usuario.`;
            res.redirect(`/views/users?msg=${success}`);
        }else{
            const error = `No se puede eliminar el usuario actual.`;
            res.redirect(`/views/users?e=${error}`);
        }    
    }
    
    paginateUsersController = async (page, email) => {
        const result = this.userService.paginateUsersService(page, email)
        return result;
    } 

    getUserController = async (req, res) => {
        const user = await this.userService.getUserService(req.user.user.email);
        res.send({status: 'Usuario encontrado', user: user})
    }

    changeRoleController = async(req, res) => {
        let roles = '';
        let user = await this.userService.getUserByIdLeanService(req.params.uid);
        (user.role == 'user') ? roles = 'premiun' : roles = 'user';
        await this.userService.changeRoleService(req.params.uid, roles);
        let success = `El usuario ahora es ${roles}`
        res.redirect(`/views/users?msg=${success}`);
    }
    
    uploadFilesController =  async (req, res) => {
        let page = parseInt(req.query.page);
        await this.userService.uploadFilesService(req.body.category,req.file.path,req.body.id);
        const result = await this.userService.paginateUsersService(page, req.user.user.email);
        result.success = 'Se subio el archivo correctamente';
        res.render('uploadFiles', result)
    }

    updateConnectionController = async (action, id) => {
        const result = this.userService.updateConnectionService(action, id)
        return result;
    }

}    