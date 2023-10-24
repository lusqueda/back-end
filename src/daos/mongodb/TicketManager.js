import { ticketsModel } from "./models/tickets.model.js";
import { userModel } from "./models/users.model.js";
import { cartModel } from "./models/carts.model.js";
import { productsModel } from "./models/products.model.js";

export default class TicketManager {

    getTicketById = async (id) => {
        const result = await ticketsModel.findOne({ _id: id });
        return result
    }

    getTicketByIdLean = async (id) => {
        const result = await ticketsModel.find({ _id: id }).lean();
        return result
    }

    getTickets = async () => {
        const result = await ticketsModel.find();
        return result
    }

    paginateTickets = async (page, email) => {
        if(!page) page=1;
        let user = await userModel.find({email: email}).lean();
        let cart = await cartModel.findOne({_id: user[0].cart}).lean();
        let result = await ticketsModel.paginate({purchaser: user[0]._id},{page,limit:5,lean:true})
        result.user = user
        result.prevLink = result.hasPrevPage?`/views/tickets?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`/views/tickets?page=${result.nextPage}`:'';
        result.isValid = !(page <= 0 || page > result.totalPages)
        result.isAuth = !(result.user == null)
        result.isAdmin = !(result.user[0].role != 'admin');
        result.userId = result.user[0]._id;
        result.cartId = result.user[0].cart;
        result.qty = 0;
        cart.products.forEach(element => {
            result.qty += element.qty;
        });
        for (let index = 0; index < result.docs[0].products.length; index++) {
            const element = result.docs[0].products[index];
            const item = await productsModel.findOne({_id: element.product})
            element.title = item.title
        }

        return result;
    }

}





