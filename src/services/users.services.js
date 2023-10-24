import UserManager from "../daos/mongodb/UserManager.js";
import CartManager from "../daos/mongodb/CartManager.js";
import { emailDelete } from "../utils.js";

export default class UserService {
    constructor(){
        this.userDao = new UserManager();
        this.cartDao = new CartManager();
    }

    updatePasswordService = async (email, element) => {
        const result = await this.userDao.updatePassword(email, element)
        return result;
    }

    getUserService = async (email) => {
        const result = await this.userDao.getUser(email)
        return result;
    }

    getUsersService = async () => {
        const result = await this.userDao.getUsers()
        return result;
    }

    paginateUsersService = async (page, email) => {
        const result = await this.userDao.paginateUsers(page, email)
        return result;
    }

    deleteUserService = async (id) => {
        let user = await this.userDao.getUserById(id);
        const result = await this.userDao.deleteUserById(id);
        await this.cartDao.deleteCartById(user.cart);
        return result;
    }

    deleteInactiveService = async () => {
        const result = await this.userDao.getUsers()
        result.forEach(element => {
            if(element.last_connection){
                const complete = element.last_connection.split('/');
                const dateOld = Date.parse(complete[1])
                const dateToday = Date.now();
            
                let fechaInicio = new Date(dateOld).getTime() 
                let fechaFin    = new Date(dateToday).getTime() 
    
                const diff = fechaFin - fechaInicio;
                if(this.convertMiliseconds(diff,'d') >= 2){
                    emailDelete(element.email);
                    this.userDao.deleteUserById(element._id);
                    this.cartDao.deleteCartById(element.cart);
                }
            }    
        });
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

    convertMiliseconds(miliseconds, format) {
        var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
        
        total_seconds = parseInt(Math.floor(miliseconds / 1000));
        total_minutes = parseInt(Math.floor(total_seconds / 60));
        total_hours = parseInt(Math.floor(total_minutes / 60));
        days = parseInt(Math.floor(total_hours / 24));
      
        seconds = parseInt(total_seconds % 60);
        minutes = parseInt(total_minutes % 60);
        hours = parseInt(total_hours % 24);
        
        switch(format) {
          case 's':
              return total_seconds;
          case 'm':
              return total_minutes;
          case 'h':
              return total_hours;
          case 'd':
              return days;
          default:
              return { d: days, h: hours, m: minutes, s: seconds };
        }
      };

}