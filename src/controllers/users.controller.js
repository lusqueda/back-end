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

    deleteProductController = async (code) => {
        const result = this.productService.deleteProductService(code)
        return result;
    }

}    