import UserManager from "../daos/mongodb/UserManager.js";

export default class UserService {
    constructor(){
        this.userDao = new UserManager();
    }

    updatePasswordService = async (email, element) => {
        const result = await this.userDao.updatePassword(email, element)
        return result;
    }

    getUserService = async (email) => {
        const result = await this.userDao.getUser(email)
        return result;
    }
}