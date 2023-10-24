import UserService from "../services/users.services.js";

export default class UserController {
    constructor(){
        this.userService = new UserService()   
    }

    updatePasswordController = async (email, element) => {
        const result = this.userService.updatePasswordService(email, element)
        return result;
    }

    getUserController = async (email) => {
        const result = this.userService.getUserService(email)
        return result;
    } 

    deleteInactiveController = async () => {
        const result = this.userService.deleteInactiveService()
        return result;
    } 

    deleteUserController = async (id) => {
        const result = this.userService.deleteUserService(id)
        return result;
    } 

    paginateUsersController = async (page, email) => {
        const result = this.userService.paginateUsersService(page, email)
        return result;
    } 

    getUsersController = async () => {
        const result = this.userService.getUsersService()
        return result;
    } 

    changeRoleController = async (id, role) => {
        const result = this.userService.changeRoleService(id, role)
        return result;
    }

    uploadFilesController = async (category, path, id) => {
        const result = this.userService.uploadFilesService(category, path, id)
        return result;
    }

    updateConnectionController = async (action, id) => {
        const result = this.userService.updateConnectionService(action, id)
        return result;
    }

}    