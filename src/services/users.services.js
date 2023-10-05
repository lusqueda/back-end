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

    changeRoleService = async (id, role) => {
        const result = await this.userDao.changeRole(id, role)
        return result;
    }

    uploadFilesService = async (category, path, id) => {
        const user = await this.userDao.getUserById(id);
        let exist = 0;
        if(user != null){
            if(user.documents.length !== 0){
                user.documents.map(element => {
                    if(element.name == category){
                        element.name = category; 
                        element.reference = path; 
                        exist = 1
                    }
                });
            }

            if(exist !== 1){
                user.documents.push({ name: category, reference: path});
            }
            
            const result = await this.userDao.uploadFiles(user);
        }else{
            return false;
        }

        return true;
    }

    updateConnectionService = async (action, id) => {
        const result = await this.userDao.updateConnection(action, id)
        return result;
    }

}