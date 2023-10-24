import { cartModel } from "./models/carts.model.js";
import { userModel } from "./models/users.model.js";
import { productsModel } from "./models/products.model.js";
import { ticketsModel } from "./models/tickets.model.js";

export default class CartManager {

    addCart = async () => {
        const result = await cartModel.create({ products: [] });
        return result
    }

    getCartById = async (id) => {
        const result = await cartModel.findOne({ _id: id });
        return result
    }

    getCartByIdLean = async (id) => {
        const result = await cartModel.find({ _id: id }).populate('products.product').lean();
        return result
    }

    getCarts = async () => {
        const result = await cartModel.find();
        return result
    }

    getCarts = async () => {
        const result = await cartModel.find();
        return result
    }

    deleteCartById = async (id) => {
        let result = await cartModel.deleteOne({_id: id})
        return result;
    }

    paginateCarts = async (cid, uid, qty) => {
        let result = [];
        result.docs = await cartModel.find({_id: cid}).lean();
        let user = await userModel.find({_id: uid}).lean();
        result.user = user
        result.isValid = (result.docs[0].products.length > 0);
        result.isAuth = !(result.user == null)
        result.isAdmin = !(result.user[0].role != 'admin');
        result.userId = result.user[0]._id;
        result.cartId = result.user[0].cart;
        result.qty = 0;
        result.totals = 0;

        for (let index = 0; index < result.docs[0].products.length; index++) {
            const element = result.docs[0].products[index];
            const item = await productsModel.findOne({_id: element.product})
            element['cartId'] = result.cartId;
            element['title'] = item.title;
            element['description'] = item.description;
            element['code'] = item.code;
            element['category'] = item.category;
            element['stock'] = item.stock;
            element['price'] = item.price;
            result.qty += element.qty;
            result.totals += item.price*element.qty;
        }

        return result;
    }

    addProductToCart = async (cart) => {
        await cart.save();
        return;
    }

    updateAllProductsFromCart = async (cart) => {
        await cart.save();
        return;
    }

    updateQtyProductFromCart = async (cart) => {
        await cart.save();
        return;
    }

    deleteProductFromCart = async (cart) => {
        await cart.save();
        return;
    }

    deleteAllProductsFromCart = async (cart) => {
        await cart.save();
        return;
    }

    purchaseCart = async (ticket) => {
        const result = await ticketsModel.create(ticket)
        return result
    }

}





