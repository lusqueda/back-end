import { userModel } from "./models/users.model.js";
import { cartModel } from "./models/carts.model.js";

export default class UserManager {

    updatePassword = async (email, element) => {
        let result = await userModel.updateOne(
            { email: email },
            { password: element }
        );
        return result 
    }

    updateConnection = async (action, id) => {
        const date = Date.now();
        const datetime = new Date(date);
        let last = action + '/' + datetime.toISOString();
        let result = await userModel.updateOne(
            { _id: id },
            { last_connection: last }
        );
        return result 
    }
    
    getUser = async (email) => {
        let result = await userModel.findOne({email:email});
        return result;
    }

    getUsers = async () => {
        let result = await userModel.find({}).select('first_name last_name email role last_connection');;
        return result;
    }

    paginateUsers = async (page, email) => {
        if(!page) page=1;
        let result = await userModel.paginate({},{page,limit:5,lean:true})
        let user = await userModel.find({email: email}).lean();
        let cart = await cartModel.findOne({_id: user[0].cart}).lean();
        result.user = user
        result.prevLink = result.hasPrevPage?`/api/users/usersviews?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`/api/users/usersviews?page=${result.nextPage}`:'';
        result.isValid = !(page <= 0 || page > result.totalPages)
        result.isAuth = !(result.user == null)
        result.isAdmin = !(result.user[0].role != 'admin');
        result.userId = result.user[0]._id;
        result.cart = result.user[0].cart;
        result.qty = 0;
        cart.products.forEach(element => {
            result.qty += element.qty;
        });
        result.docs.forEach(element => {
            let isPremiun = (element.role === 'premiun');
            let isAdmin = (element.role === 'admin');
            element['admin'] = isAdmin;
            element['premiun'] = isPremiun;
        });
        return result;
    }

    deleteUserById = async (id) => {
        let result = await userModel.deleteOne({_id: id})
        return result;
    }

    getUserById = async (id) => {
        let result = await userModel.findOne({_id:id});
        return result;
    }

    getUserByIdLean = async (id) => {
        let result = await userModel.findOne({_id:id}).lean();
        return result;
    }

    changeRole = async (id, role) => {
        console.log(id+'-'+role)
        let result = await userModel.updateOne(
            {_id: id},
            {role: role}
        );
        return result;
    }

    uploadFiles = async (documents) => {
        await documents.save();
        return;
    }

}





